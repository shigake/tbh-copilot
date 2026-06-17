

;(function (g) {
 'use strict';
 const DB = (typeof g.TBH_DB !== 'undefined') ? g.TBH_DB
 : (typeof require !== 'undefined') ? require('./gamedata.js') : null;
 if (!DB) throw new Error('TBH_DB not loaded (include engine/gamedata.js before engine.js)');

 const PARAMS = {
 // From the decompiled binary via wiki/mechanics (HIGH confidence):
 MITIG_CAP: 0.75, ARMOR_PIERCE: 0.4,
 CRITDMG_DIVISOR: 1000,
 PERCENT_DIVISOR: 1000,
 BASIC_ATTACK_MULT: 1.9,
 OFFLINE_CAP_SECONDS: 28800,
 // Clear-time priors, empirically tuned against measured stage clears (2026-06; the
 // docs' first estimate was 1.2/2.0). Only the *ranking* depends weakly on them — live
 // calibration (clearSamples/clearSec) replaces them whenever the player has data.
 T_WAVE: 5.1, T_FIXED: 1.0,
 CLEAR_DUTY: 0.65, // fraction of wall-clock actually spent clearing; matches sustained rates
 CLEAR_CAP: 90, // soft kill-speed cap (s) so one-shot stages don't divide by ~0
 ALMOST_FREE_FRACTION: 0.1, // a rune is "almost free" if it costs <=10% of the gold balance
 SKIP_COST: 1e6, // mega-priced rune nodes are "skip" — but only while the player can't afford them
 SAFE_DANGER: 0.6, DANGER_TOL: 1.15, // survival-margin bands (comfortable / tight)
 SKILL_SCALE: 1.0, // labeled estimate: active-skill damage assumed proportional to AD
 SLOT_TYPES: [null, null, 'HELMET', 'ARMOR', 'GLOVES', 'BOOTS', 'AMULET', 'EARING', 'RING', 'BRACER'],
 };
 const GOLD_KEY = 100001;
 // Rune keys that grant OfflineReward{Gold,Exp}Percent / unlock offline rewards, from
 // data/wiki/runes.json. test.cjs asserts they exist in the DB and grant exactly these
 // stats, so a game update that renumbers runes fails loudly instead of summing zeros.
 const OFFLINE_GOLD_RUNES = [110011, 15002, 180201, 180401];
 const OFFLINE_EXP_RUNES = [110012, 150021, 180301, 180501];
 const OFFLINE_UNLOCK_RUNE = 11001;
 const BASE_STATS = ['AttackDamage','AttackSpeed','CastSpeed','CriticalChance','CriticalDamage','MaxHp','Armor','MovementSpeed','CooldownReduction'];
 const RUNE_MAP = {
 AllHeroAttackDamage: ['AttackDamage','FLAT'], AllHeroAttackDamagePercent: ['AttackDamage','ADDITIVE'],
 AllHeroAttackSpeed: ['AttackSpeed','ADDITIVE'], AllHeroArmor: ['Armor','FLAT'],
 AllHeroArmorPercent: ['Armor','ADDITIVE'], AllHeroMoveSpeed: ['MovementSpeed','ADDITIVE'],
 };

 function parseSave(raw) {
 const fixed = String(raw).replace(/([:\[,])(\s*)(\d{16,})(?=\s*[,\]}])/g, (m, p, sp, num) => p + sp + '"' + num + '"');
 return JSON.parse(fixed);
 }

 const gold = psd => { const c = (psd.currenySaveDatas||[]).find(x => x.Key === GOLD_KEY); return c ? c.Quantity : 0; };
 const party = psd => ((psd.commonSaveData||{}).arrangedHeroKey || []).filter(k => k != null && Number(k) > 0);
 const heroSaveMap = psd => Object.fromEntries((psd.heroSaveDatas||[]).map(h => [h.heroKey, h]));
 const itemSaveMap = psd => Object.fromEntries((psd.itemSaveDatas||[]).map(it => [it.UniqueId, it]));
 const maxPartyLevel = psd => { const m = heroSaveMap(psd); return Math.max(1, ...party(psd).map(k => (m[k]||{}).HeroLevel||1)); };

 function runeContrib(psd) {
 const out = {};
 for (const rs of psd.RuneSaveData || []) {
 if (!rs.Level || rs.Level <= 0) continue;
 const rd = DB.runes[rs.RuneKey]; if (!rd) continue;
 const rl = DB.runeLevels[rd.ldk]; if (!rl) continue;
 for (let L = 1; L <= rs.Level; L++) { const row = rl[L]; if (row) out[row.st] = (out[row.st]||0) + (row.v||0); }
 }
 return out;
 }

 function gearStatLines(gearKey) {
 const gr = DB.gear[gearKey]; if (!gr) return [];
 const idb = DB.items[gearKey];
 const gt = idb ? DB.gearTypes[idb.gt] : null;
 const out = [];
 if (gt && gt.b1s && gr.b1 != null) out.push([gt.b1s, gt.b1m, gr.b1]);
 if (gt && gt.b2s && gr.b2 != null) out.push([gt.b2s, gt.b2m, gr.b2]);
 for (const [st, mt, v] of gr.inh || []) out.push([st, mt, v]);
 return out;
 }

 function collect(heroSave, psd, runeStats) {
 const c = {};
 const add = (st, mt, v) => { (c[st] = c[st] || {})[mt] = (c[st][mt] || []); c[st][mt].push(v); };
 const hero = DB.heroes[heroSave.heroKey] || {};
 for (const st of BASE_STATS) add(st, 'FLAT', hero[st] || 0);
 const ism = itemSaveMap(psd);
 for (const uid of heroSave.equippedItemIds || []) {
 if (!uid) continue;
 const si = ism[uid]; if (!si) continue;
 for (const [st, mt, v] of gearStatLines(si.ItemKey)) add(st, mt, v);

 for (const e of si.EnchantData || []) {
 if (e && e.StatModKey) { const sm = DB.statMods[`${e.StatModKey}:${e.Tier}`]; if (sm) add(sm.st, sm.mt, e.Value || 0); }
 }
 }
 for (const a of psd.attributeSaveDatas || []) {
 if (!a.Level || a.Level <= 0) continue;
 const node = DB.attributes[a.Key];
 if (!node || node.hero !== heroSave.heroKey || node.atype !== 'PASSIVESKILL') continue;
 const p = DB.passives[node.val]; if (p) add(p.st, p.mt, p.v * a.Level);
 }
 for (const [rst, val] of Object.entries(runeStats || {})) {
 if (RUNE_MAP[rst] && val) add(RUNE_MAP[rst][0], RUNE_MAP[rst][1], val);
 }
 return c;
 }

 function aggregate(c) {
 const out = {};
 for (const [st, mods] of Object.entries(c)) {
 const flat = (mods.FLAT || []).reduce((a, b) => a + b, 0);
 const add = (mods.ADDITIVE || []).reduce((a, b) => a + b, 0);
 let mult = 1; for (const v of mods.MULTIPLICATIVE || []) mult *= (1 + v / 100);
 out[st] = flat * (1 + add / PARAMS.PERCENT_DIVISOR) * mult;
 }
 return out;
 }

 const atkPerSec = s => (s.AttackSpeed || 0) / 100;
 const critChance = s => Math.min((s.CriticalChance || 0) / PARAMS.PERCENT_DIVISOR, 1);
 const critMult = s => (s.CriticalDamage || 0) / PARAMS.CRITDMG_DIVISOR;
 const avgHit = s => (s.AttackDamage || 0) * (1 - critChance(s) + critChance(s) * critMult(s));

 const DELIVERY = { Knight: 'Melee', Slayer: 'Melee', Ranger: 'Projectile', Hunter: 'Projectile', Sorcerer: 'AOE', Priest: 'AOE' };
 const INC_KEY = { Melee: 'IncreaseMeleeDamage', Projectile: 'IncreaseProjectileDamage', AOE: 'IncreaseAreaOfEffectDamage', Summon: 'IncreaseSummonDamage' };
 const ELEM_KEY = { Physical: 'PhysicalDamagePercent', Fire: 'FireDamagePercent', Cold: 'ColdDamagePercent', Lightning: 'LightningDamagePercent', Chaos: 'ChaosDamagePercent' };
 const deliveryOf = heroKey => DELIVERY[(DB.heroes[String(heroKey)] || {}).cls] || 'Melee';

 const autoElementOf = heroKey => { const bk = (DB.heroes[String(heroKey)] || {}).skillKey; const bs = bk && DB.skills[String(bk)]; return (bs && (bs.dmgType || bs.DamageType)) || 'Physical'; };

 function dmgMult(s, delivery, element) {
 const elemPct = s[ELEM_KEY[element] || 'PhysicalDamagePercent'] || 0;
 return (1 + (s.Multistrike || 0) / 100) * (1 + (s[INC_KEY[delivery]] || 0) / 100) * (1 + elemPct / 100);
 }
 const dps = s => avgHit(s) * atkPerSec(s) * PARAMS.BASIC_ATTACK_MULT;
 const dpsOf = (s, delivery, element) => dps(s) * dmgMult(s, delivery, element);
 const refStageLevel = psd => (DB.stages[String((psd.commonSaveData||{}).currentStageKey)] || {}).lvl || 1;
 const refDamage = psd => ((DB.stageThreat||{})[String((psd.commonSaveData||{}).currentStageKey)] || {}).hit || 0;
 function mitigation(armor, stageLevel, damage) {
 stageLevel = stageLevel || 1; damage = damage || 0;
 const a = armor || 0, T = 14 * stageLevel + 12;
 const denom = a * a + T * (a + PARAMS.ARMOR_PIERCE * damage);
 const red = denom > 0 ? (a * a) / denom : 0;
 return Math.min(red, PARAMS.MITIG_CAP);
 }
 function mitigMult(s, sl, dmg) {
 const dodge = Math.min(s.DodgeChance || 0, s.MaxDodgeChance || 75) / 100;
 const block = Math.min(s.BlockChance || 0, s.MaxBlockChance || 75) / 100;
 const armorRed = mitigation(s.Armor || 0, sl, dmg);
 const dr = Math.min(s.DamageReduction || 0, 90) / 100;
 return Math.max(0.01, (1 - dodge) * (1 - block * 0.5) * (1 - armorRed) * (1 - dr));
 }
 const ehp = (s, sl, dmg) => (s.MaxHp || 0) / mitigMult(s, sl, dmg);
 const power = (s, sl, dmg, delivery) => Math.sqrt(Math.max(0, dpsOf(s, delivery)) * Math.max(0, ehp(s, sl, dmg)));

 const DELIVERY_STR = { Melee: 'Melee', Projectile: 'Projectile', AOE: 'AOE', Summon: 'Summon' };
 function skillLevelOf(heroSave, psd, skillKey) {
 let lvl = 1; const alloc = {}; for (const a of psd.attributeSaveDatas || []) alloc[a.Key] = a.Level;
 for (const [ak, node] of Object.entries(DB.attributes)) if (node.hero === heroSave.heroKey && node.atype === 'ACTIVESKILL' && node.val === skillKey) lvl += alloc[ak] || 0;
 return lvl;
 }
 function skillDpsEst(heroSave, psd, stats) {
 const AD = stats.AttackDamage || 0, defD = deliveryOf(heroSave.heroKey);
 const cc = critChance(stats), critF = 1 - cc + cc * critMult(stats), cdr = (stats.CooldownReduction || 0) / PARAMS.PERCENT_DIVISOR;
 let total = 0;
 for (const sk of heroSave.equippedSKillKey || []) {
 if (sk <= 0) continue; const s = DB.skills[String(sk)];
 if (!s || s.slot !== 'SKILL' || s.act !== 'COOLDOWN' || !(s.cd > 0)) continue;
 const lvls = DB.skillLevels[String(s.lvlKey)]; if (!lvls) continue;
 const lvl = skillLevelOf(heroSave, psd, sk);
 const val = lvls[String(lvl)] || lvls[String(Object.keys(lvls).length)] || 0;
 const del = (s.delivery && DELIVERY_STR[String(s.delivery).split(',')[0].trim()]) || defD;
 total += ((val / 1000) * AD * critF * dmgMult(stats, del, s.dmgType || s.DamageType)) / (s.cd / Math.max(0.1, 1 - cdr));
 }
 return total;
 }

 function effDpsOf(heroSave, psd, s, delivery) { return dpsOf(s, delivery, autoElementOf(heroSave.heroKey)) + skillDpsEst(heroSave, psd, s) * (PARAMS.SKILL_SCALE || 1); }
 function effPower(heroSave, psd, s, sl, dmg, delivery) { return Math.sqrt(Math.max(0, effDpsOf(heroSave, psd, s, delivery)) * Math.max(0, ehp(s, sl, dmg))); }

 function heroStats(heroSave, psd, runeStats, stageLevel) {
 stageLevel = stageLevel || refStageLevel(psd);
 const dmg = refDamage(psd), delivery = deliveryOf(heroSave.heroKey);
 const c = collect(heroSave, psd, runeStats || runeContrib(psd));
 const s = aggregate(c);

 const autoDps = dpsOf(s, delivery, autoElementOf(heroSave.heroKey));
 const skillDps = skillDpsEst(heroSave, psd, s) * (PARAMS.SKILL_SCALE || 1);
 const effDps = autoDps + skillDps;
 const eHp = ehp(s, stageLevel, dmg);
 return { heroKey: heroSave.heroKey, cls: (DB.heroes[heroSave.heroKey]||{}).cls, level: heroSave.HeroLevel,
 stats: s, dps: effDps, autoDps, skillDpsEst: skillDps,
 ehp: eHp, power: Math.sqrt(Math.max(0, effDps) * Math.max(0, eHp)),
 delivery, contrib: c, stageLevel };
 }

 function powerDelta(heroSave, psd, slot, newGearKey, runeStats, stageLevel) {
 stageLevel = stageLevel || refStageLevel(psd);
 const dmg = refDamage(psd), delivery = deliveryOf(heroSave.heroKey);
 runeStats = runeStats || runeContrib(psd);
 const base = heroStats(heroSave, psd, runeStats, stageLevel);
 const ism = itemSaveMap(psd);
 const oldUid = (heroSave.equippedItemIds || [])[slot];
 const oldKey = oldUid ? (ism[oldUid] || {}).ItemKey : null;

 const c = {}; for (const [st, mods] of Object.entries(base.contrib)) { c[st] = {}; for (const [mt, arr] of Object.entries(mods)) c[st][mt] = arr.slice(); }
 const rm = (st, mt, v) => { if (c[st] && c[st][mt]) { const i = c[st][mt].indexOf(v); if (i >= 0) c[st][mt].splice(i, 1); } };
 if (oldKey) for (const [st, mt, v] of gearStatLines(oldKey)) rm(st, mt, v);
 if (newGearKey) for (const [st, mt, v] of gearStatLines(newGearKey)) { (c[st] = c[st]||{})[mt] = (c[st][mt]||[]); c[st][mt].push(v); }
 const s2 = aggregate(c);
 const next = { dps: effDpsOf(heroSave, psd, s2, delivery), ehp: ehp(s2, stageLevel, dmg), power: effPower(heroSave, psd, s2, stageLevel, dmg, delivery) };
 return { base: { dps: base.dps, ehp: base.ehp, power: base.power },
 next, dPower: next.power - base.power, dDps: next.dps - base.dps, dEhp: next.ehp - base.ehp };
 }

 const cumXP = (() => { const cum = [0]; for (let i = 0; i < DB.levels.length; i++) cum.push(cum[i] + (DB.levels[i]||0)); return cum; })();
 function expToNext(level, heroExp) { const inc = DB.levels[level-1] || 0; return Math.max(0, inc - (heroExp||0)); }
 function partyExp(psd) { const hsm = heroSaveMap(psd); let t = 0; for (const k of party(psd)) { const h = hsm[k]; if (h) t += (cumXP[(h.HeroLevel||1)-1]||0) + (h.HeroExp||0); } return t; }
 function aggVal(psd, type, sub) { const a = (psd.aggregateSaveDatas||[]).find(x => x.Type === type && x.SubKey === sub); return a ? a.Value : null; }
 function totalClears(psd) { return aggVal(psd, 15, 0); }
 function levelInfo(heroSave, eps) {
 const L = heroSave.HeroLevel || 1, cap = 100, maxed = L >= cap;
 const need = maxed ? 0 : expToNext(L, heroSave.HeroExp || 0);
 const incr = DB.levels[L-1] || 0;
 return { heroKey: heroSave.heroKey, level: L, cap, heroExp: heroSave.HeroExp || 0,
 expToNext: Math.round(need), pct: maxed ? 1 : (incr ? Math.min(1, (heroSave.HeroExp||0) / incr) : 1),
 ap: heroSave.AbilityPoint || 0, etaSec: (maxed || !(eps > 0)) ? null : need / eps };
 }

 const stageLevelOf = key => (DB.stages[key] || {}).lvl;
 function stageUnlocked(key, maxCompleted) {
 const ord = DB.stageOrder, iMax = ord.indexOf(Number(maxCompleted));
 const iS = ord.indexOf(Number(key));
 if (iS < 0) return false;
 return iMax < 0 ? true : iS <= iMax + 1;
 }
 function clearTime(s, D) { return (s.totalHP / Math.max(1, D)) + PARAMS.T_WAVE * s.waves + PARAMS.T_FIXED; }
 // EXP falloff when over-leveled for a stage: logistic curve centered 8 levels above the
 // stage, slope 2/3 per level. Both values were hand-fit to observed sustained EXP rates
 // (see the 2026-06 EXP-rate validation); clamped to [0.01, 1].
 function fitFactor(partyLevel, stageLvl) {
 return Math.min(1, Math.max(0.01, 1 / (1 + Math.exp((partyLevel - stageLvl - 8) * (2 / 3)))));
 }
 function projectLevel(startLevel, startExp, expPerSec, stageLvl, hours) {
 if (!(expPerSec > 0)) return startLevel;
 const f0 = fitFactor(startLevel, stageLvl) || 1e-6;
 let L = startLevel, eil = startExp || 0, t = 0; const cap = hours * 3600;
 while (t < cap) {
 const rate = expPerSec * fitFactor(L, stageLvl) / f0;
 if (!(rate > 0)) break;
 const inc = DB.levels[L - 1]; if (!inc) break;
 const tl = (inc - eil) / rate;
 if (t + tl <= cap) { t += tl; L++; eil = 0; if (L > 200) break; }
 else { eil += rate * (cap - t); t = cap; }
 }
 return L + (DB.levels[L - 1] ? eil / DB.levels[L - 1] : 0);
 }
 function farmBonuses(psd) {
 const rc = runeContrib(psd);
 return { goldMult: 1 + (rc.IncreaseGoldAmount || 0) / PARAMS.PERCENT_DIVISOR,
 expMult: 1 + (rc.IncreaseExpAmount || 0) / PARAMS.PERCENT_DIVISOR };
 }
 function fitClearModel(samples) {
 const pts = (samples || []).filter(s => s && s.clearSec > 0 && s.hp > 0 && s.waves > 0);
 if (pts.length < 2) return null;
 let Sww = 0, Swh = 0, Shh = 0, Swy = 0, Shy = 0;
 for (const s of pts) { const w = s.waves, h = s.hp, y = s.clearSec - PARAMS.T_FIXED; Sww += w*w; Swh += w*h; Shh += h*h; Swy += w*y; Shy += h*y; }
 const det = Sww * Shh - Swh * Swh;
 if (Math.abs(det) > 1e-9) {
 const tWave = (Swy * Shh - Shy * Swh) / det, invD = (Sww * Shy - Swh * Swy) / det;
 if (invD > 1e-12 && tWave >= 0) return { tWave, D: 1 / invD, n: pts.length };
 }
 if (Shh > 1e-9) { const invD0 = Shy / Shh; if (invD0 > 1e-12) return { tWave: 0, D: 1 / invD0, n: pts.length }; }
 return null;
 }
 function stageRates(s, t, goldMult, expMult, fit) {
 fit = fit == null ? 1 : fit;
 return { clearTime: t, fit, goldPerSec: s.gold * (goldMult || 1) / t, expPerSec: s.exp * fit * (expMult || 1) / t };
 }

 function bestFarm(psd, D, opts) {
 opts = opts || {};
 const stat = farmBonuses(psd);
 const partyLevel = maxPartyLevel(psd);
 const partySize = Math.max(1, party(psd).length);
 const maxC = psd.commonSaveData.maxCompletedStage, curKey = String(psd.commonSaveData.currentStageKey);
 const ord = DB.stageOrder;
 const idxOf = k => ord.indexOf(Number(k));
 let idxMax = idxOf(maxC) - 1;
 if (idxMax < 0) idxMax = idxOf(curKey);
 const curStage = DB.stages[curKey];

 let Dcal = Math.max(1, D), tWave = PARAMS.T_WAVE, calibrated = false, calSource = 'model';
 let goldMult = stat.goldMult, expMult = stat.expMult;
 const mgps = opts.measuredGoldPerSec, meps = opts.measuredExpPerSec, mcs = opts.measuredClearSec;
 const fitM = fitClearModel(opts.clearSamples);
 const ovh = w => tWave * w + PARAMS.T_FIXED;
 if (fitM) {
 tWave = fitM.tWave; Dcal = fitM.D; calibrated = true; calSource = 'fit';
 } else if (mcs && curStage && curStage.totalHP > 0 && mcs > ovh(curStage.waves)) {
 Dcal = curStage.totalHP / Math.max(0.5, mcs - ovh(curStage.waves)); calibrated = true; calSource = 'clears';
 } else if (mgps && mgps > 0 && curStage && curStage.gold > 0) {
 const mct = (curStage.gold * goldMult) / mgps;
 Dcal = curStage.totalHP / Math.max(0.1, mct - ovh(curStage.waves)); calibrated = true; calSource = 'rate';
 }
 const dutyMul = (calSource === 'fit' || calSource === 'clears') ? 1 / PARAMS.CLEAR_DUTY : 1;
 const ct = s => (PARAMS.T_FIXED + tWave * s.waves + s.totalHP / Dcal) * dutyMul;
 if (calibrated && curStage) {
 const cc = ct(curStage);
 if (mgps > 0 && curStage.gold > 0) goldMult = (mgps * cc) / curStage.gold;
 if (meps > 0 && curStage.exp > 0) { const cf = Math.max(0.01, fitFactor(partyLevel, curStage.lvl)); expMult = (meps / partySize * cc) / (curStage.exp * cf); }
 }
 const rows = [];
 for (const [key, s] of Object.entries(DB.stages)) {
 const iS = idxOf(key);
 const unlocked = iS >= 0 && (idxMax < 0 || iS <= idxMax + 1);
 if (!unlocked) continue;
 const fit = fitFactor(partyLevel, s.lvl);
 const r = stageRates(s, ct(s), goldMult, expMult, fit);
 rows.push({ key, label: s.label, lvl: s.lvl, diff: s.diff, idx: iS, gold: s.gold, exp: s.exp,
 goldPerSec: r.goldPerSec, expPerSec: r.expPerSec, clearTime: r.clearTime, fit: r.fit,
 goldPerHour: r.goldPerSec * 3600, expPerHour: r.expPerSec * 3600,
 expDensity: s.totalHP ? s.exp / s.totalHP : 0, goldDensity: s.totalHP ? s.gold / s.totalHP : 0,
 totalHP: s.totalHP, waves: s.waves,
 cleared: idxMax < 0 || iS <= idxMax });
 }
 rows.sort((a, b) => a.idx - b.idx);
 const current = rows.find(r => r.key === curKey) || null;
 const frontier = rows.length ? rows[rows.length - 1] : null;
 const push = (frontier && (idxMax < 0 || frontier.idx > idxMax)) ? frontier : null;

 const minLvl = current ? current.lvl : 0;
 const farmable = rows.filter(r => (r.cleared && r.lvl >= minLvl) || (current && r.key === current.key));
 const pool = farmable.length ? farmable : rows;
 const bestGold = pool.slice().sort((a, b) => b.goldPerSec - a.goldPerSec)[0] || null;
 const bestExp = pool.slice().sort((a, b) => b.expPerSec - a.expPerSec)[0] || null;
 const recommend = bestGold;
 const onBest = !!(current && recommend && recommend.key === current.key);
 const stagesMeasured = fitM ? fitM.n : (calSource === 'clears' ? 1 : 0);
 return { current, recommend, frontier, push, onBest, calibrated, calSource, Dcal, tWave, partyLevel, stagesMeasured,
 goldBonusPct: Math.round((goldMult - 1) * 100), expBonusPct: Math.round((expMult - 1) * 100),
 goldOptimal: bestGold, expOptimal: bestExp, bestGold, bestExp, all: rows };
 }

 function offlineBonuses(psd) {
 let g_ = 0, e_ = 0;
 const rs = Object.fromEntries((psd.RuneSaveData||[]).map(r => [r.RuneKey, r.Level]));
 const sum = (keys, st) => { let v = 0; for (const k of keys) { const lv = rs[k]||0; const rd = DB.runes[k]; if (!lv||!rd) continue; const rl = DB.runeLevels[rd.ldk]; for (let L=1;L<=lv;L++){ const row=rl&&rl[L]; if(row&&row.st===st) v+=row.v||0; } } return v; };
 g_ = sum(OFFLINE_GOLD_RUNES, 'OfflineRewardGoldPercent');
 e_ = sum(OFFLINE_EXP_RUNES, 'OfflineRewardExpPercent');
 return { goldBonus: g_/100, expBonus: e_/100 };
 }
 const offlineUnlocked = psd => ((psd.RuneSaveData||[]).find(r => r.RuneKey === OFFLINE_UNLOCK_RUNE)||{}).Level > 0;
 function idleInfo(psd, elapsedSec) {
 const sl = stageLevelOf(String(psd.commonSaveData.currentStageKey));
 const row = DB.offlineRewards[sl];
 const cap = PARAMS.OFFLINE_CAP_SECONDS;
 if (!row || !offlineUnlocked(psd)) return { unlocked: offlineUnlocked(psd), stageLevel: sl, cap, fullGold: 0, fullExp: 0 };
 const { goldBonus, expBonus } = offlineBonuses(psd);
 const fullGold = Math.round(row.gold * row.kills * (1 + goldBonus));
 const fullExp = Math.round(row.exp * row.kills * (1 + expBonus));
 const frac = elapsedSec != null ? Math.min(1, Math.max(0, elapsedSec) / cap) : null;
 return {
 unlocked: true, stageLevel: sl, cap, capHours: cap/3600, goldBonus, expBonus,
 fullGold, fullExp, goldPerSec: fullGold / cap, expPerSec: fullExp / cap,
 accruedGold: frac != null ? Math.round(fullGold * frac) : null,
 accruedExp: frac != null ? Math.round(fullExp * frac) : null,
 frac, secsToCap: frac != null ? Math.max(0, cap - Math.min(cap, elapsedSec)) : null,
 };
 }
 function bestParkStage(psd, D) {
 const f = bestFarm(psd, D);
 let best = null;
 for (const r of (f.all || [])) { const row = DB.offlineRewards[r.lvl]; if (!row) continue; const fg = row.gold*row.kills; if (!best || fg > best.fullGold) best = { key: r.key, label: r.label, lvl: r.lvl, fullGold: fg, fullExp: row.exp*row.kills }; }
 return best;
 }

 const runeParent = (() => { const p = {}; for (const [from, to] of DB.runeTree.edges) p[to] = from; return p; })();
 const runeReq = key => { const r = DB.runes[key]; return (r && r.prevReq != null) ? r.prevReq : 1; };
 function ownedRuneLevels(psd) { const m = {}; for (const r of psd.RuneSaveData||[]) m[r.RuneKey] = r.Level||0; return m; }
 function runeUnlocked(key, owned) {
 if ((DB.runeTree.starts||[]).includes(Number(key)) || runeParent[key] == null) return true;
 const par = runeParent[key];
 return (owned[par]||0) >= runeReq(key);
 }

 function runePartyPowerDelta(psd, statType, value, stageLevel) {
 if (!RUNE_MAP[statType] || !value) return 0;
 stageLevel = stageLevel || refStageLevel(psd);
 const [stat, mt] = RUNE_MAP[statType];
 const rstats = runeContrib(psd), hsm = heroSaveMap(psd);
 let d = 0;
 for (const hk of party(psd)) {
 const hs = hsm[hk]; if (!hs) continue;
 const base = heroStats(hs, psd, rstats, stageLevel);
 const c = {}; for (const [st, mods] of Object.entries(base.contrib)) { c[st] = {}; for (const [m, arr] of Object.entries(mods)) c[st][m] = arr.slice(); }
 (c[stat] = c[stat]||{})[mt] = (c[stat][mt]||[]); c[stat][mt].push(value);
 d += effPower(hs, psd, aggregate(c), stageLevel, refDamage(psd), deliveryOf(hk)) - base.power;
 }
 return d;
 }
 function runePlan(psd, goldPerSec, stageLevel) {
 stageLevel = stageLevel || refStageLevel(psd);
 const owned = ownedRuneLevels(psd), have = gold(psd);
 const afThreshold = have * PARAMS.ALMOST_FREE_FRACTION;
 const cands = [];
 for (const [key, rd] of Object.entries(DB.runes)) {
 const lv = owned[key] || 0;
 if (lv >= rd.max) continue;
 const isNew = lv === 0;
 if (isNew && !runeUnlocked(key, owned)) continue;
 const rl = DB.runeLevels[rd.ldk]; const row = rl && rl[lv + 1]; if (!row) continue;
 const isCombat = !!RUNE_MAP[row.st];
 const dPower = isCombat ? runePartyPowerDelta(psd, row.st, row.v, stageLevel) : 0;
 cands.push({ key: Number(key), name: rd.name, level: lv, nextLevel: lv + 1, max: rd.max,
 cost: row.cost, st: row.st, value: row.v, isNew, isCombat, dPower,
 affordable: row.cost <= have, almostFree: row.cost <= afThreshold,
 farmSeconds: (goldPerSec && goldPerSec > 0) ? row.cost / goldPerSec : null,
 valuePerGold: isCombat && dPower > 0 ? dPower / row.cost : null });
 }
 const almostFree = cands.filter(c => c.almostFree).sort((a, b) => a.cost - b.cost);
 const combat = cands.filter(c => c.isCombat).sort((a, b) => (b.valuePerGold||0) - (a.valuePerGold||0) || a.cost - b.cost);
 const pathTo = (target) => {
 const steps = []; let cur = Number(target); const chain = [];
 while (cur != null) { chain.unshift(cur); cur = runeParent[cur]; }
 let total = 0;
 for (let i = 0; i < chain.length; i++) {
 const k = chain[i], rd = DB.runes[k], rl = DB.runeLevels[rd.ldk];
 const haveLv = owned[k] || 0;
 const needLv = (i === chain.length - 1) ? Math.max(haveLv, 1) : Math.max(haveLv, runeReq(chain[i+1]));
 for (let L = haveLv + 1; L <= needLv; L++) { const row = rl[L]; if (row) { total += row.cost; steps.push({ key: k, level: L, cost: row.cost, st: row.st, value: row.v, name: rd.name }); } }
 }
 return { target: Number(target), totalCost: total, steps };
 };

 let firstDpsPath = null;
 for (const [key, rd] of Object.entries(DB.runes)) {
 const rl = DB.runeLevels[rd.ldk]; const row1 = rl && rl['1'];
 if (!row1 || row1.st !== 'AllHeroAttackDamagePercent') continue;
 if ((owned[key] || 0) >= 1) continue;
 const p = pathTo(Number(key));
 if (p.totalCost > 0 && (!firstDpsPath || p.totalCost < firstDpsPath.totalCost)) firstDpsPath = p;
 }
 return { almostFree, combat, all: cands, afThreshold, gold: have, goldPerSec: goldPerSec || null,
 firstDpsPath, pathTo };
 }

 function runeTreeStatus(psd, goldPerSec, stageLevel) {
 stageLevel = stageLevel || refStageLevel(psd);
 const owned = ownedRuneLevels(psd), have = gold(psd);
 const af = have * PARAMS.ALMOST_FREE_FRACTION;
 const plan = runePlan(psd, goldPerSec, stageLevel);
 const dpsPath = new Set(plan.firstDpsPath ? plan.firstDpsPath.steps.map(s => s.key) : []);
 const nodes = {};
 for (const [key, pos] of Object.entries(DB.runeNodes)) {
 const rd = DB.runes[key];
 const base = { x: pos.x, y: pos.y, cat: pos.cat, level: owned[key] || 0 };
 if (!rd) { nodes[key] = Object.assign(base, { status: 'available', max: 1 }); continue; }
 const lv = owned[key] || 0, maxL = rd.max, rl = DB.runeLevels[rd.ldk];
 const nextRow = (lv < maxL && rl) ? rl[lv + 1] : null;
 const unlockable = lv > 0 || runeUnlocked(key, owned);
 const isCombat = nextRow && !!RUNE_MAP[nextRow.st];
 const dPower = isCombat ? runePartyPowerDelta(psd, nextRow.st, nextRow.v, stageLevel) : 0;
 let status;
 if (maxL > 0 && lv >= maxL) status = 'maxed';
 else if (lv > 0) status = 'owned';
 else if (!unlockable) status = 'locked';
 else if (nextRow && nextRow.cost >= PARAMS.SKIP_COST && nextRow.cost > have) status = 'skip';
 else if (dpsPath.has(Number(key)) || (isCombat && dPower > 0)) status = 'recommended';
 else if (nextRow && nextRow.cost <= af) status = 'almostfree';
 else status = 'available';
 nodes[key] = Object.assign(base, {
 status, max: maxL, name: rd.name,
 cost: nextRow ? nextRow.cost : null, st: nextRow ? nextRow.st : (rl && rl['1'] ? rl['1'].st : null),
 value: nextRow ? nextRow.v : null, dPower, affordable: nextRow ? nextRow.cost <= have : false,
 onDpsPath: dpsPath.has(Number(key)),
 important: !!(isCombat && /AttackDamage|AttackSpeed/.test(nextRow.st || '')),
 farmSeconds: nextRow && goldPerSec > 0 ? nextRow.cost / goldPerSec : null,
 });
 }
 return { nodes, bounds: DB.runeBounds, edges: DB.runeTree.edges, firstDpsPath: plan.firstDpsPath };
 }

 function decodeItem(itemKey) {
 const idb = DB.items[itemKey] || {};
 return { itemKey, gearType: idb.gt, grade: idb.grade, level: idb.lvl, lines: gearStatLines(itemKey) };
 }
 function slotGearType(heroKey, slot) {
 const h = DB.heroes[heroKey] || {};
 if (slot === 0) return h.mainW; if (slot === 1) return h.subW;
 return PARAMS.SLOT_TYPES[slot];
 }
 function gearAdvisor(psd, stageLevel) {
 stageLevel = stageLevel || refStageLevel(psd);
 const hsm = heroSaveMap(psd), ism = itemSaveMap(psd), rstats = runeContrib(psd);

 const equippedUids = new Set();
 for (const hk of party(psd)) for (const u of (hsm[hk]||{}).equippedItemIds||[]) if (u) equippedUids.add(u);
 const result = [];
 for (const hk of party(psd)) {
 const hs = hsm[hk]; if (!hs) continue;
 for (let slot = 0; slot < 10; slot++) {
 const gt = slotGearType(hk, slot); if (!gt) continue;
 const curUid = (hs.equippedItemIds||[])[slot] || 0;
 const curKey = curUid ? (ism[curUid]||{}).ItemKey : null;

 const cands = [];
 for (const it of psd.itemSaveDatas||[]) {
 const idb = DB.items[it.ItemKey]; if (!idb || idb.gt !== gt) continue;
 if (it.UniqueId !== curUid && equippedUids.has(it.UniqueId)) continue;
 cands.push(it.ItemKey);
 }

 let best = { key: curKey, dPower: 0 };
 for (const ck of cands) {
 if (ck === curKey) continue;
 const d = powerDelta(hs, psd, slot, ck, rstats, stageLevel);
 if (d.dPower > best.dPower + 1e-6) best = { key: ck, dPower: d.dPower, detail: d };
 }
 result.push({
 heroKey: hk, slot, gearType: gt,
 current: curKey ? decodeItem(curKey) : null,
 best: best.key && best.key !== curKey ? Object.assign(decodeItem(best.key), { dPower: best.dPower }) : null,
 empty: !curKey,
 worth: !!(best.key && best.key !== curKey && best.dPower > 0),
 });
 }
 }

 const emptyJewelry = result.filter(r => r.empty && ['AMULET','EARING','RING','BRACER'].includes(r.gearType));
 const swaps = result.filter(r => r.worth);
 return { slots: result, swaps, emptyJewelry };
 }

 function apAdvisor(psd, stageLevel) {
 stageLevel = stageLevel || refStageLevel(psd);
 const hsm = heroSaveMap(psd), rstats = runeContrib(psd);
 const out = [];
 for (const hk of Object.keys(DB.heroes).map(Number)) {
 const hs = hsm[hk]; if (!hs || !(hs.AbilityPoint > 0)) continue;
 const allocated = hs.AllocatedHeroAbilityPoint || 0;
 const attrLevels = {}; for (const a of psd.attributeSaveDatas || []) attrLevels[a.Key] = a.Level;
 const base = heroStats(hs, psd, rstats, stageLevel);
 let best = null;
 for (const [ak, node] of Object.entries(DB.attributes)) {
 if (node.hero !== hk || node.atype !== 'PASSIVESKILL') continue;
 if ((attrLevels[ak] || 0) >= node.max) continue;
 if (allocated < (DB.attributeGroups[node.grp] || 0)) continue;
 const p = DB.passives[node.val]; if (!p) continue;
 const c = {}; for (const [st, mods] of Object.entries(base.contrib)) { c[st] = {}; for (const [m, arr] of Object.entries(mods)) c[st][m] = arr.slice(); }
 (c[p.st] = c[p.st] || {})[p.mt] = (c[p.st][p.mt] || []); c[p.st][p.mt].push(p.v);
 const dP = effPower(hs, psd, aggregate(c), stageLevel, refDamage(psd), deliveryOf(hk)) - base.power;
 if (!best || dP > best.dPower) best = { attrKey: Number(ak), stat: p.st, mod: p.mt, value: p.v, dPower: dP };
 }
 out.push({ heroKey: hk, ap: hs.AbilityPoint, best });
 }
 return out;
 }

 function enchantAdvisor(psd, stageLevel, affixFactor) {
 stageLevel = stageLevel || refStageLevel(psd);
 affixFactor = affixFactor || 0.25;
 const hsm = heroSaveMap(psd), ism = itemSaveMap(psd), rstats = runeContrib(psd), comp = partyComp(psd);
 const roleStat = role => (role === 'tank' || role === 'bruiser' || role === 'support') ? 'MaxHp' : 'AttackDamage';
 const perHero = []; let totalOpen = 0;
 for (const hk of party(psd)) {
 const hs = hsm[hk]; if (!hs) continue;
 let open = 0;
 for (const uid of hs.equippedItemIds || []) {
 if (!uid) continue; const it = ism[uid]; if (!it) continue;
 const idb = DB.items[it.ItemKey], gs = idb && DB.gradeSlots[idb.grade];
 const used = (it.EnchantData || []).filter(e => e && e.StatModKey).length;
 if (gs) open += Math.max(0, gs.extra - used);
 }
 totalOpen += open;
 const role = (comp.roles.find(r => r.heroKey === hk) || {}).role || 'dps';
 const stat = roleStat(role), aff = DB.affixRep[stat] || { value: 0, mod: 'FLAT' };
 const perSlot = Math.round(aff.value * affixFactor);
 const base = heroStats(hs, psd, rstats, stageLevel);
 const c = {}; for (const [st, mods] of Object.entries(base.contrib)) { c[st] = {}; for (const [m, arr] of Object.entries(mods)) c[st][m] = arr.slice(); }
 (c[stat] = c[stat] || {})[aff.mod] = (c[stat][aff.mod] || []); for (let i = 0; i < open; i++) c[stat][aff.mod].push(perSlot);
 const estPower = effPower(hs, psd, aggregate(c), stageLevel, refDamage(psd), deliveryOf(hk));
 perHero.push({ heroKey: hk, open, stat, mod: aff.mod, perSlot, basePower: base.power, estPower, dPower: estPower - base.power });
 }
 return { perHero, totalOpen, affixFactor };
 }

 function stageDanger(psd, heroes, D, stageKey) {
 const s = DB.stages[String(stageKey)], threat = (DB.stageThreat || {})[String(stageKey)];
 if (!s || !threat) return null;
 const partyEHP = heroes.reduce((a, h) => a + ehp(h.stats, s.lvl, threat.hit), 0);
 const incomingDps = threat.dps * Math.min(threat.perWave || 1, 4);
 const ct = clearTime(s, D);
 return { stageKey: String(stageKey), lvl: s.lvl, partyEHP, incomingDps, clearTime: ct,
 danger: (incomingDps * ct) / Math.max(1, partyEHP), elem: threat.elem };
 }

 function survival(psd, heroes, D, pushKey, refKey) {
 const push = stageDanger(psd, heroes, D, pushKey); if (!push) return null;
 const ref = refKey ? stageDanger(psd, heroes, D, refKey) : null;
 const readiness = (ref && ref.danger > 0) ? ref.danger / push.danger : (push.danger <= 1 ? 2 : 0.5);
 return Object.assign(push, {
 readiness, margin: readiness, refStage: ref ? ref.stageKey : null,
 rating: readiness >= 1 ? 'comfortable' : readiness >= 0.6 ? 'tight' : 'risky',
 survivable: readiness >= 0.8,
 });
 }

 const ROLE = { Knight: 'tank', Slayer: 'bruiser', Priest: 'support', Ranger: 'dps', Hunter: 'dps', Sorcerer: 'caster' };
 const tankiness = hk => { const h = DB.heroes[String(hk)] || {}; return (h.MaxHp || 0) + (h.Armor || 0) * 10; };
 function partyComp(psd) {
 const fielded = party(psd), solo = fielded.length <= 1;
 const inParty = new Set(fielded), hsm = heroSaveMap(psd);
 const roles = Object.keys(DB.heroes).map(k => Number(k)).map(hk => ({
 heroKey: hk, cls: DB.heroes[String(hk)].cls, role: ROLE[DB.heroes[String(hk)].cls] || 'dps',
 fielded: inParty.has(hk), tank: tankiness(hk), level: (hsm[hk] || {}).HeroLevel || 0,
 }));
 const hasFront = roles.some(r => r.fielded && (r.role === 'tank' || r.role === 'bruiser' || r.role === 'support'));
 const bench = roles.filter(r => !r.fielded && (r.role === 'tank' || r.role === 'bruiser')).sort((a, b) => b.tank - a.tank);
 return { roles, hasFront, solo, recommendTank: (!solo && !hasFront && bench[0]) ? bench[0].heroKey : null };
 }

 function xpForecast(psd, eps) {
 const hsm = heroSaveMap(psd);
 const xpTo = (L, prog, target) => { if (target <= L) return 0; let xp = (DB.levels[L-1] || 0) - prog; for (let l = L + 1; l < target; l++) xp += DB.levels[l-1] || 0; return Math.max(0, xp); };
 return party(psd).map(hk => { const hs = hsm[hk] || {}, L = hs.HeroLevel || 1, prog = hs.HeroExp || 0;
 return { heroKey: hk, level: L, targets: [20, 30, 50, 100].filter(t => t > L).map(t => { const xp = xpTo(L, prog, t); return { level: t, xp, etaSec: eps > 0 ? xp / eps : null }; }) }; });
 }

 function petAdvisor(psd) {
 const BAT_KEY = 1001;
 const unlockedSet = new Set((psd.PetSaveData || []).filter(p => p.IsUnlock).map(p => p.PetKey));
 const unlocked = [...unlockedSet];
 const arranged = (psd.commonSaveData || {}).ArrangedPetKey;
 const locked = Object.keys(DB.pets).map(Number).filter(k => !unlockedSet.has(k));
 const score = (pk, stType) => { const pet = DB.pets[String(pk)]; if (!pet) return 0; const s = (DB.petStats[String(pet.statKey)] || []).find(x => x.st === stType); return s ? s.v : 0; };
 const rank = stType => unlocked.map(pk => ({ petKey: pk, name: DB.pets[String(pk)] && DB.pets[String(pk)].name, value: score(pk, stType) })).filter(x => x.value > 0).sort((a, b) => b.value - a.value);
 const batUnlocked = unlockedSet.has(BAT_KEY);
 return { arranged, unlocked, locked, passive: true, batUnlocked,
 unlockNext: !batUnlocked ? BAT_KEY : (locked[0] || null), // Bat first, then the rest naturally
 bestGold: rank('IncreaseGoldAmount')[0] || null, bestExp: rank('IncreaseExpAmount')[0] || null, bestDrop: rank('DropChanceNormalChestPercent')[0] || null };
 }

 function alchemyValue(psd) {
 const equipped = new Set(); for (const h of psd.heroSaveDatas || []) for (const u of h.equippedItemIds || []) if (u) equipped.add(u);
 let sellGold = 0, cubeExp = 0, count = 0;
 for (const it of psd.itemSaveDatas || []) { if (equipped.has(it.UniqueId)) continue; const g = DB.itemSell[String(it.ItemKey)]; if (g != null) { sellGold += g; count++; } cubeExp += DB.itemCubeExp[String(it.ItemKey)] || 0; }
 return { looseItems: count, sellGold, cubeExp };
 }

 function gearProgression(psd, frontierLvl) {
 const ism = itemSaveMap(psd), hsm = heroSaveMap(psd), levels = [];
 for (const hk of party(psd)) for (const u of (hsm[hk] && hsm[hk].equippedItemIds) || []) { if (!u) continue; const it = ism[u]; const idb = it && DB.items[it.ItemKey]; if (idb && idb.lvl != null) levels.push(idb.lvl); }
 const avg = levels.length ? levels.reduce((a, b) => a + b, 0) / levels.length : 0;
 return { avgItemLevel: Math.round(avg), frontierLevel: frontierLvl || 0, gap: Math.max(0, (frontierLvl || 0) - Math.round(avg)), advice: (frontierLvl > avg + 3) ? 'push_for_drops' : 'on_par' };
 }

 // ── drop finder ────────────────────────────────────────────────────────────
 // Stages drop the monster box of their 5-level band; DB.boxDrops holds each band's
 // weighted item-group table and DB.dropGroups the gear items per group. An item's
 // chance = its groups' weight share of the box, split across each group's items.
 // Hero-conditioned (DLC) rows are counted for everyone — the skew is tiny and only
 // relative ranking matters here.
 const dropBandKeys = () => Object.keys(DB.boxDrops || {}).map(Number).sort((a, b) => a - b);
 function bandOfLevel(lvl) { let b = null; for (const x of dropBandKeys()) if (x <= lvl) b = x; return b; }
 function dropBands(itemKey) {
 const k = Number(itemKey), out = [];
 for (const band in DB.boxDrops || {}) {
 let total = 0, mine = 0;
 for (const [g, w] of DB.boxDrops[band]) { total += w; const its = DB.dropGroups[g] || []; if (its.indexOf(k) >= 0) mine += w / its.length; }
 if (mine > 0 && total > 0) out.push({ band: +band, chance: mine / total });
 }
 return out.sort((a, b) => a.band - b.band);
 }
 function dropStages(itemKey, psd) {
 const bands = {}; for (const b of dropBands(itemKey)) bands[b.band] = b.chance;
 const maxC = psd ? psd.commonSaveData.maxCompletedStage : null;
 const out = [];
 for (const [key, s] of Object.entries(DB.stages)) {
 const b = bandOfLevel(s.lvl);
 if (b != null && bands[b] != null) out.push({ key: Number(key), lvl: s.lvl, label: s.label, diff: s.diff, chance: bands[b], unlocked: psd ? stageUnlocked(key, maxC) : true });
 }
 return out.sort((a, b) => a.lvl - b.lvl);
 }
 // rank the player's reachable stages by how much of the wishlist drops there
 function favFarm(psd, favKeys) {
 const infos = (favKeys || []).map(k => { const m = {}; for (const b of dropBands(k)) m[b.band] = b.chance; return { key: Number(k), bands: m }; });
 const maxC = psd.commonSaveData.maxCompletedStage, rows = [];
 for (const [key, s] of Object.entries(DB.stages)) {
 if (!stageUnlocked(key, maxC)) continue;
 const b = bandOfLevel(s.lvl); if (b == null) continue;
 const favs = infos.filter(f => f.bands[b]).map(f => ({ key: f.key, chance: f.bands[b] }));
 if (favs.length) rows.push({ key: Number(key), lvl: s.lvl, favs, score: favs.reduce((a, f) => a + f.chance, 0) });
 }
 rows.sort((a, b) => b.score - a.score || b.lvl - a.lvl);
 return rows;
 }

 // ── chest auto-open timers ───────────────────────────────────────────────
 // The game auto-opens one chest of each type every N seconds. The Unlock rune's
 // value IS that base cooldown (Normal 300s, Stage-boss 600s, Act-boss 60s) and is 0
 // when the player hasn't unlocked auto-open; the Reduce runes shave seconds off it.
 // Capacity = how many chests the player can stockpile before the backpack overflows
 // and new drops stop. All of it comes straight from the save's rune contributions.
 const CHEST_BASE = { normal: 300, boss: 600, act: 60 };
 function chestInfo(psd) {
 const rc = runeContrib(psd);
 const one = (kind, unlockKey, reduceKey, capKey) => {
 const unlockVal = rc[unlockKey] || 0, unlocked = unlockVal > 0;
 const base = unlockVal || CHEST_BASE[kind], reduce = rc[reduceKey] || 0;
 return { kind, unlocked, base, reduce, cooldown: Math.max(1, base - reduce), capacity: rc[capKey] || 0 };
 };
 return {
 normal: one('normal', 'UnlockAutoOpenNormalChest', 'ReduceAutoOpenNormalChestTime', 'MaxAmountNormalChest'),
 boss: one('boss', 'UnlockAutoOpenStageBossChest', 'ReduceAutoOpenStageBossChestTime', 'MaxAmountStageBossChest'),
 act: one('act', 'UnlockAutoOpenActBossChest', 'ReduceAutoOpenActBossChestTime', 'MaxAmountActBossChest'),
 };
 }

 // ── inventory / stash browser ────────────────────────────────────────────
 // Join every item instance (itemSaveDatas) with its slot (equipped on a hero, stash,
 // backpack, or the trading stash) and its template (DB.items → name/grade/level/type),
 // so the UI can reproduce the stash and filter it — something the game itself can't do.
 const GRADE_ORDER = { COMMON: 0, UNCOMMON: 1, RARE: 2, LEGENDARY: 3, IMMORTAL: 4, ARCANA: 5, BEYOND: 6, CELESTIAL: 7, DIVINE: 8, COSMIC: 9 };
 function inventory(psd) {
 const loc = {}, slotOf = {}, heroOf = {};
 for (const h of psd.heroSaveDatas || []) {
 const eq = h.equippedItemIds || [];
 for (let s = 0; s < eq.length; s++) { const u = eq[s]; if (u && u !== '0') { loc[String(u)] = 'equipped'; slotOf[String(u)] = s; heroOf[String(u)] = h.heroKey; } }
 }
 const mark = (rows, name) => { for (const r of rows || []) { const u = r.ItemUniqueId; if (u && u !== '0' && u !== 0 && !loc[String(u)]) { loc[String(u)] = name; slotOf[String(u)] = r.Index; } } };
 mark(psd.stashSaveDatas, 'stash'); mark(psd.inventorySaveDatas, 'inventory'); mark(psd.tradingStashSaveDatas, 'trading');
 const items = [];
 for (const it of psd.itemSaveDatas || []) {
 const idb = DB.items[String(it.ItemKey)] || {};
 const u = String(it.UniqueId);
 const enchants = Array.isArray(it.EnchantCount) ? it.EnchantCount.reduce((a, b) => a + (b || 0), 0) : 0;
 items.push({
 uid: u, key: it.ItemKey, name: idb.name || null, grade: idb.grade || null,
 gradeRank: GRADE_ORDER[idb.grade] != null ? GRADE_ORDER[idb.grade] : -1,
 level: idb.lvl != null ? idb.lvl : null, type: idb.type || null, gt: idb.gt || null,
 icon: idb.icon || null, loc: loc[u] || 'loose', slot: slotOf[u] != null ? slotOf[u] : null,
 hero: heroOf[u] != null ? heroOf[u] : null, enchants, blocked: !!it.IsBlocked, chaotic: !!it.IsChaotic,
 });
 }
 return items;
 }

 // the raw slot grid of a storage container (stash / backpack / trading), in Index order,
 // so the UI can reproduce the in-game layout: each slot is empty, locked, or holds an item.
 // (The grid's column count is NOT in the game data — only the slot Index is, which is exact.)
 const STORAGE_KEY = { stash: 'stashSaveDatas', inventory: 'inventorySaveDatas', trading: 'tradingStashSaveDatas' };
 function storageGrid(psd, which) {
 const rows = psd[STORAGE_KEY[which]] || [];
 return rows.slice().sort((a, b) => a.Index - b.Index).map(s => {
 const u = s.ItemUniqueId, has = u && u !== '0' && u !== 0;
 return { slot: s.Index, locked: !(s.IsUnLock || s.IsUnlock), uid: has ? String(u) : null };
 });
 }

 function runeROI(psd, goldPerSec, stageLevel) {
 const plan = runePlan(psd, goldPerSec, stageLevel);
 return plan.combat.filter(c => c.dPower > 0).map(c => ({ key: c.key, name: c.name, st: c.st, value: c.value, cost: c.cost, dPower: c.dPower, perGold: c.dPower / c.cost, affordable: c.affordable })).sort((a, b) => b.perGold - a.perGold);
 }

 function goldPlan(psd, goldPerSec, stageLevel) {
 const have = gold(psd), roi = runeROI(psd, goldPerSec, stageLevel);
 const cart = []; let spent = 0;
 for (const r of roi) { if (spent + r.cost <= have) { cart.push(r); spent += r.cost; } }
 return { gold: have, cart, totalCost: spent, totalPower: cart.reduce((a, c) => a + c.dPower, 0) };
 }

 function lastClearedKey(psd) {
 const cs = psd.commonSaveData || {}, ord = DB.stageOrder;
 const i = ord.indexOf(Number(cs.maxCompletedStage));
 if (i > 0) return String(ord[i - 1]);
 const ic = ord.indexOf(Number(cs.currentStageKey));
 return ic >= 0 ? String(ord[ic]) : null;
 }

 function goalPlan(psd, heroes, D, targetKey) {
 const s = DB.stages[String(targetKey)]; if (!s) return null;
 const refKey = lastClearedKey(psd);
 const sv = survival(psd, heroes, D, targetKey, DB.stages[refKey] ? refKey : targetKey);
 return { stage: String(targetKey), label: s.label, level: s.lvl, levelGap: Math.max(0, s.lvl - maxPartyLevel(psd)),
 readiness: sv ? sv.readiness : null, rating: sv ? sv.rating : null, needsMorePower: sv ? sv.readiness < 0.8 : false };
 }

 function synthesisPlan(psd) {
 const equipped = new Set(); for (const h of psd.heroSaveDatas || []) for (const u of h.equippedItemIds || []) if (u) equipped.add(u);
 const byGrade = {};
 for (const it of psd.itemSaveDatas || []) { if (equipped.has(it.UniqueId)) continue; const idb = DB.items[it.ItemKey]; if (!idb || !idb.gt) continue; byGrade[idb.grade] = (byGrade[idb.grade] || 0) + 1; }
 const out = [];
 for (const [grade, n] of Object.entries(byGrade)) { const r = DB.synthesis[grade]; if (r && n >= r.amount) out.push({ grade, have: n, need: r.amount, fuses: Math.floor(n / r.amount), nextGrade: DB.grades[DB.grades.indexOf(grade) + 1] }); }
 return out;
 }

 function forecast(psd, level, idle, goldPerSec) {
 return { nextLevel: level.map(l => ({ heroKey: l.heroKey, etaSec: l.etaSec })).filter(x => x.etaSec),
 idleCapSec: idle && idle.unlocked ? idle.cap : null, goldPerSec: goldPerSec || null,
 gold100kSec: goldPerSec > 0 ? Math.max(0, 100000 - gold(psd)) / goldPerSec : null };
 }

 function recommend(psd, opts) {
 opts = opts || {};
 const rstats = runeContrib(psd), hsm = heroSaveMap(psd);
 const refSL = refStageLevel(psd);
 const heroes = party(psd).map(hk => hsm[hk] ? heroStats(hsm[hk], psd, rstats, refSL) : null).filter(Boolean);
 const D = heroes.reduce((a, h) => a + h.dps, 0);
 const partySkillDps = heroes.reduce((a, h) => a + (h.skillDpsEst || 0), 0);
 const partyEHP = heroes.length ? Math.min(...heroes.map(h => h.ehp)) : 0;
 const farm = bestFarm(psd, D, { heroes, measuredGoldPerSec: opts.goldPerSec, measuredExpPerSec: opts.expPerSec, measuredClearSec: opts.clearSec, clearSamples: opts.clearSamples });
 const epsCur = farm.current ? farm.current.expPerSec : (farm.bestExp ? farm.bestExp.expPerSec : 0);
 const gpsCur = farm.current ? farm.current.goldPerSec : (farm.bestGold ? farm.bestGold.goldPerSec : 0);
 const level = party(psd).map(hk => levelInfo(hsm[hk], epsCur));
 const elapsed = opts.elapsedSec != null ? opts.elapsedSec
 : (psd.commonSaveData.lastSavedTime ? (Date.now()/1000 - ticksToUnix(psd.commonSaveData.lastSavedTime)) : null);
 const idle = idleInfo(psd, elapsed);
 idle.bestPark = bestParkStage(psd, D);

 const runes = runePlan(psd, opts.goldPerSec, refSL);
 const runeTree = runeTreeStatus(psd, opts.goldPerSec, refSL);
 const gear = gearAdvisor(psd, refSL);
 const pushKey = farm.push ? farm.push.key : (farm.frontier && farm.frontier.key);
 const refKey = lastClearedKey(psd);
 const surv = pushKey ? survival(psd, heroes, D, pushKey, DB.stages[refKey] ? refKey : null) : null;
 const comp = partyComp(psd);
 const enchant = enchantAdvisor(psd, refSL);
 const ap = apAdvisor(psd, refSL);
 const pets = petAdvisor(psd);
 const alchemy = alchemyValue(psd);
 const gearProg = gearProgression(psd, farm.frontier ? farm.frontier.lvl : refSL);
 const roi = runeROI(psd, opts.goldPerSec, refSL);
 const goldShop = goldPlan(psd, opts.goldPerSec, refSL);
 const goal = farm.push ? goalPlan(psd, heroes, D, farm.push.key) : null;
 const synth = synthesisPlan(psd);
 const xp = xpForecast(psd, epsCur);
 const fc = forecast(psd, level, idle, gpsCur);
 const carry = heroes.slice().sort((a, b) => b.dps - a.dps)[0] || null;
 const actions = buildActions({ farm, runes, gear, idle, heroes, carry, comp, enchant, pets, synth });
 return {
 meta: { party: party(psd), gold: gold(psd), maxPartyLevel: maxPartyLevel(psd),
 currentStage: String(psd.commonSaveData.currentStageKey),
 partyDPS: D, partySkillDps, partyEHP, carryHero: carry ? carry.heroKey : null,
 carryShare: carry && D ? carry.dps / D : null },
 heroes, farm, level, idle, runes, runeTree, gear, survival: surv, partyComp: comp, enchant, ap,
 pets, alchemy, gearProgression: gearProg, runeROI: roi, goldPlan: goldShop, goal, synthesis: synth, xpForecast: xp, forecast: fc,
 actions, coach: actions[0] || null,
 params: PARAMS,
 };
 }

 function buildActions(x) {
 const a = [];
 if (x.runes.almostFree.length) a.push({ k: 'rune_almostfree', n: x.runes.almostFree.length,
 items: x.runes.almostFree.slice(0, 4).map(r => r.key) });
 if (x.farm.recommend && x.farm.current && x.farm.recommend.key !== x.farm.current.key)
 a.push({ k: 'farm_switch', from: x.farm.current.key, to: x.farm.recommend.key });
 else if (x.farm.push) a.push({ k: 'farm_push', to: x.farm.push.key, lvl: x.farm.push.lvl });
 // Beginner hint for the fire wall: stages 3-6..3-9 (lvl 28-31) deal fire damage. Only
 // warn while the frontier is approaching or inside that band — a player who already
 // cleared past it obviously survived and the hint would just be noise.
 { const fr = x.farm || {}, reach = Math.max((fr.current && fr.current.lvl) || 0, (fr.frontier && fr.frontier.lvl) || 0);
 if (reach >= 26 && reach <= 31 && (x.heroes || []).length) { let front = null; for (const h of x.heroes) if (!front || (h.ehp || 0) > (front.ehp || 0)) front = h;
 const st = (front && front.stats) || {}, res = (st.FireResistance || 0) + (st.AllElementalResistance || 0);
 if (res < 30) a.push({ k: 'fire_protection', lvl: reach, res: Math.round(res), hero: front && front.heroKey }); } }
 if (x.runes.firstDpsPath) a.push({ k: 'rune_dps_path', target: x.runes.firstDpsPath.target, cost: x.runes.firstDpsPath.totalCost });
 if (x.comp && x.comp.recommendTank) a.push({ k: 'party_tank', hero: x.comp.recommendTank });
 if (x.enchant && x.enchant.totalOpen > 0) a.push({ k: 'gear_enchant', n: x.enchant.totalOpen });
 if (x.gear.swaps.length) a.push({ k: 'gear_swap', n: x.gear.swaps.length });
 if (x.gear.emptyJewelry.length) a.push({ k: 'gear_jewelry', n: x.gear.emptyJewelry.length });
 if (x.synth && x.synth.length) a.push({ k: 'synthesis', grade: x.synth[0].grade, n: x.synth[0].fuses });
 if (x.pets && x.pets.bestGold && x.pets.arranged !== x.pets.bestGold.petKey) a.push({ k: 'pet_swap', pet: x.pets.bestGold.petKey });
 return a;
 }

 function ticksToUnix(ticks) { return Number(ticks) / 1e7 - 62135596800; }

 const API = { DB, PARAMS, parseSave, recommend, heroStats, powerDelta, runePlan, runeTreeStatus, gearAdvisor,
 bestFarm, idleInfo, levelInfo, survival, stageDanger, partyComp, enchantAdvisor, apAdvisor,
 xpForecast, petAdvisor, alchemyValue, gearProgression, runeROI, goldPlan, goalPlan, synthesisPlan, forecast,
 collect, aggregate, dps, ehp, power, mitigation,
 runeContrib, gold, party, heroSaveMap, gearStatLines, expToNext, partyExp, totalClears, cumXP, ticksToUnix, stageUnlocked,
 bestParkStage, refStageLevel, refDamage, projectLevel, fitFactor,
 bandOfLevel, dropBands, dropStages, favFarm, chestInfo, inventory, storageGrid,
 OFFLINE_RUNES: { gold: OFFLINE_GOLD_RUNES, exp: OFFLINE_EXP_RUNES, unlock: OFFLINE_UNLOCK_RUNE } };
 g.TBHEngine = API;
 if (typeof module !== 'undefined' && module.exports) module.exports = API;
})(typeof globalThis !== 'undefined' ? globalThis : this);
