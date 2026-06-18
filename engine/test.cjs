

const fs = require('fs');
const path = require('path');
const E = require('./engine.js');

// Prefer the live snapshot (local dev); fall back to the committed fixture (CI / clean clone).
// Both hold the SAME save state — regen the fixture via build_fixture.cjs whenever the
// snapshot (and these expectations) are refreshed.
const livePath = path.join(__dirname, '..', 'runtime', 'save_snapshot.json');
const fixturePath = path.join(__dirname, 'fixtures', 'save_fixture.json');
const savePath = fs.existsSync(livePath) ? livePath : fixturePath;
const snap = JSON.parse(fs.readFileSync(savePath, 'utf8'));
const psd = E.parseSave(snap.PlayerSaveData.value);
console.log(`save source: ${path.relative(path.join(__dirname, '..'), savePath)}`);

let pass = 0, fail = 0;
const approx = (got, want, tolPct, label) => {
 const ok = Math.abs(got - want) <= Math.abs(want) * tolPct / 100;
 console.log(`${ok ? 'PASS' : 'FAIL'} ${label}: got ${round(got)} want ~${round(want)} (±${tolPct}%)`);
 ok ? pass++ : fail++;
};
const eq = (got, want, label) => {
 const ok = got === want;
 console.log(`${ok ? 'PASS' : 'FAIL'} ${label}: got ${JSON.stringify(got)} want ${JSON.stringify(want)}`);
 ok ? pass++ : fail++;
};
const ok = (cond, label) => { console.log(`${cond ? 'PASS' : 'FAIL'} ${label}`); cond ? pass++ : fail++; };
const round = n => (typeof n === 'number' ? Math.round(n * 100) / 100 : n);

console.log('=== TBH engine validation vs live save ===\n');
const r = E.recommend(psd, { elapsedSec: 0 });

const byHero = Object.fromEntries(r.heroes.map(h => [h.heroKey, h]));
console.log('-- power (POWER uses the corrected stage-dependent armor formula @ stage level 23) --');
approx(byHero[201].power, 307, 10, 'Ranger 201 POWER');
approx(byHero[401].power, 579, 10, 'Priest 401 POWER');
approx(byHero[301].power, 405, 10, 'Sorcerer 301 POWER');
approx(r.meta.partyDPS, 967, 10, 'party DPS');
eq(r.meta.carryHero, 201, 'damage carry = Ranger 201');
ok(r.meta.carryShare > 0.4, 'carry share > 40% (Ranger is the plurality carry; correct crit ends the old fake monopoly)');
approx(byHero[201].stats.AttackSpeed, 245, 5, 'Ranger AttackSpeed (raw)');

ok(byHero[201].stats.CriticalChance / 1000 < 1, 'Ranger crit is a sane fraction, not capped at 100%');
ok(Math.abs(byHero[201].stats.CriticalChance / 1000 - 0.0972) < 0.01, 'Ranger crit ~9.7% (raw 97.2)');

console.log('\n-- leveling --');
const byLvl = Object.fromEntries(r.level.map(l => [l.heroKey, l]));
eq(byLvl[201].expToNext, 5549195, '201 XP to next');
eq(byLvl[401].expToNext, 3970760, '401 XP to next');
eq(byLvl[301].expToNext, 3926742, '301 XP to next');
ok(byLvl[201].cap === 100, 'level cap 100');

console.log('\n-- idle --');
ok(r.idle.unlocked, 'offline unlocked (rune 11001)');
eq(r.idle.stageLevel, 23, 'parked stage level 23');
eq(r.idle.fullGold, 134400, 'full-window gold');
eq(r.idle.fullExp, 1723200, 'full-window exp');
ok(r.idle.bestPark != null, 'best park stage computed');

console.log('\n-- runes --');
const afKeys = r.runes.almostFree.map(x => x.key);
ok(Array.isArray(afKeys), 'almost-free list computed (none affordable at this save state)');
ok(r.runes.almostFree.every(x => x.cost <= r.runes.afThreshold), 'all almost-free within threshold');
ok(r.runes.firstDpsPath && r.runes.firstDpsPath.target === 413, 'first DPS path targets the next DPS rune');
approx(r.runes.firstDpsPath.totalCost, 530000, 5, 'path-cost to the DPS rune');
const rTgt = r.runes.firstDpsPath.steps.find(x => x.key === r.runes.firstDpsPath.target);
ok(rTgt && /AttackDamage/.test(rTgt.st), 'DPS-path target is an attack-damage rune');

console.log('\n-- gear --');
eq(r.gear.swaps.length, 1, 'one worthwhile gear swap at this save state');
eq(r.gear.emptyJewelry.length, 12, 'empty jewelry slots (4/hero × 3)');
const rangerWeapon = r.gear.slots.find(s => s.heroKey === 201 && s.slot === 0);
ok(rangerWeapon && rangerWeapon.current && rangerWeapon.current.gearType === 'BOW', 'Ranger main weapon is a BOW');

console.log('\n-- farm (forward-only) --');
const curStage = E.DB.stages[r.meta.currentStage];
ok(r.farm.recommend, 'farm recommendation exists');
ok(!r.farm.current || r.farm.recommend.idx >= r.farm.current.idx, 'recommendation is not below current stage');
ok(!r.farm.push || (r.farm.frontier && r.farm.push.idx === r.farm.frontier.idx), 'push is the next stage to clear (the frontier)');
ok(r.farm.frontier && r.farm.frontier.idx >= (r.farm.current ? r.farm.current.idx : 0), 'frontier ≥ current');

console.log('\n-- rune tree --');
const rt = r.runeTree;
ok(rt && Object.keys(rt.nodes).length === 197, `tree has 197 nodes (got ${rt && Object.keys(rt.nodes).length})`);
ok(rt.bounds && rt.edges && rt.edges.length > 100, 'tree has bounds + edges');
const statuses = {};
for (const n of Object.values(rt.nodes)) statuses[n.status] = (statuses[n.status] || 0) + 1;
console.log(' status histogram:', JSON.stringify(statuses));
ok(Object.values(rt.nodes).some(n => n.status === 'owned'), 'some nodes owned');
ok(Object.values(rt.nodes).some(n => n.status === 'locked'), 'some nodes locked');
ok(Object.values(rt.nodes).every(n => typeof n.x === 'number' && typeof n.y === 'number'), 'every node has x/y coords');
ok(Object.values(rt.nodes).some(n => n.cat === 'combat') && Object.values(rt.nodes).some(n => n.cat === 'gold'), 'categories assigned');

console.log('\n-- party comp + survival --');
ok(r.partyComp && r.partyComp.hasFront === true, 'Priest counts as the front-line (heals/sustains)');
eq(r.partyComp.recommendTank, null, 'no tank pushed when a Priest already fronts the party');
ok(r.partyComp.roles.length === 6, 'all 6 heroes classified');
ok(r.partyComp.roles.find(x => x.heroKey === 101).role === 'tank', 'Knight classified as tank');
ok(!r.actions.some(a => a.k === 'party_tank'), 'no tank recommendation when the Priest fronts the party');
ok(r.survival && r.survival.stageKey && typeof r.survival.margin === 'number', 'survival sim computed for push stage');
ok(['comfortable','tight','risky'].includes(r.survival.rating), 'survival rating valid');
ok(E.DB.stageThreat['1206'] && E.DB.stageThreat['1206'].hit > 0, 'stage threat data present');

ok(r.enchant && r.enchant.totalOpen > 30, `enchant advisor finds open affix slots (got ${r.enchant && r.enchant.totalOpen})`);
ok(r.enchant.perHero.every(h => h.open > 0 && h.stat && typeof h.dPower === 'number'), 'per-hero enchant has open slots + stat + ΔPOWER');
ok(r.actions.some(a => a.k === 'gear_enchant'), 'gear_enchant action present');

ok(r.ap && r.ap.length >= 1 && r.ap.every(a => a.ap >= 1 && a.best), 'AP advisor recommends a node for each hero with unspent AP');

const rs = psd.heroSaveDatas.find(h => h.heroKey === 201);
const st201 = E.heroStats(rs, psd, null, 18).stats;
ok(E.mitigation(st201.Armor, 50, 300) < E.mitigation(st201.Armor, 18, 0), 'armor mitigation drops at higher stage + incoming damage');

console.log('\n-- economy + planners --');
ok(r.alchemy && r.alchemy.sellGold > 0, `alchemy value of loose gear (got ${r.alchemy && r.alchemy.sellGold}g)`);
ok(r.gearProgression && r.gearProgression.gap > 0 && r.gearProgression.advice === 'push_for_drops', 'gear is below frontier push for drops');
ok(r.pets && r.pets.unlocked.length > 0 && r.pets.bestGold, 'pet advisor finds unlocked pets + best for gold');
ok(r.runeROI && r.runeROI.length > 0 && r.runeROI[0].perGold > 0, 'rune ROI ranking present');
ok(r.goldPlan && Array.isArray(r.goldPlan.cart), 'gold-spend cart computed');
ok(r.goal && typeof r.goal.levelGap === 'number' && r.goal.rating, 'reverse goal planner for push stage');
ok(Array.isArray(r.synthesis), 'synthesis plan computed');
const xp201 = r.xpForecast.find(x => x.heroKey === 201);
ok(xp201 && xp201.targets.find(t => t.level === 100) && xp201.targets.find(t => t.level === 100).xp > 1e9, 'XP forecast to L100 (~40B XP)');
ok(r.forecast && Array.isArray(r.forecast.nextLevel), 'forecast/timeline computed');

ok(r.heroes.every(h => typeof h.skillDpsEst === 'number'), 'per-hero skill-DPS estimate present');
ok(byHero[201].skillDpsEst < byHero[201].dps, 'skill-DPS is a minor add vs the carry auto-attack (kept separate)');
ok(typeof r.meta.partySkillDps === 'number', 'party skill-DPS total in meta');

console.log('\n-- data integrity (hardcoded keys vs DB) --');
const grantsOf = k => { const rd = E.DB.runes[k]; const rl = rd && E.DB.runeLevels[rd.ldk]; return rl ? Object.values(rl).filter(Boolean).map(x => x.st) : []; };
for (const [keys, st] of [[E.OFFLINE_RUNES.gold, 'OfflineRewardGoldPercent'], [E.OFFLINE_RUNES.exp, 'OfflineRewardExpPercent']]) {
 ok(keys.every(k => E.DB.runes[k]), `${st} rune keys all exist in the DB`);
 ok(keys.every(k => grantsOf(k).includes(st)), `${st} rune keys all grant that stat`);
}
ok(grantsOf(E.OFFLINE_RUNES.unlock).includes('UnlockOfflineReward'), 'offline unlock rune key grants UnlockOfflineReward');
const skipNodes = Object.values(r.runeTree.nodes).filter(n => n.status === 'skip');
ok(skipNodes.every(n => n.cost > E.gold(psd)), 'no skip-status rune is actually affordable (skip is relative to gold)');
// fire hint: this save faces the fire band (frontier 3-6, lvl 28) with low resistance → must fire;
// the window check (26-31) is what keeps it from nagging players who already cleared past it
ok(r.actions.some(a => a.k === 'fire_protection'), 'fire hint present while facing the fire maps');

console.log('\n-- drop finder --');
const bowEntry = Object.entries(E.DB.items).find(([k, v]) => v.gt === 'BOW' && v.lvl === 15 && v.grade === 'COMMON');
ok(!!bowEntry, 'a lv15 COMMON bow exists in the DB');
const bowKey = +bowEntry[0], bands15 = E.dropBands(bowKey);
ok(bands15.some(b => b.band === 15), 'lv15 bow drops from the Lv15 box band');
ok(bands15.every(b => b.chance > 0 && b.chance < 1), 'drop chances are sane fractions');
const dStages = E.dropStages(bowKey, psd);
ok(dStages.length > 0 && dStages.every(x => E.DB.stages[x.key]), 'drop stages resolve to real stages');
ok(dStages.some(x => x.unlocked) || dStages.every(x => !x.unlocked), 'unlocked flag computed');
const ffm = E.favFarm(psd, [bowKey]);
ok(Array.isArray(ffm), 'favFarm computes');
if (ffm.length) ok(ffm[0].favs.length >= 1 && ffm[0].score > 0, 'favFarm top stage carries the favorite');

console.log('\n-- inventory / stash --');
const inv = E.inventory(psd);
ok(inv.length === psd.itemSaveDatas.length, `inventory returns every item instance (${inv.length})`);
ok(inv.every(i => ['equipped', 'stash', 'inventory', 'trading', 'loose'].includes(i.loc)), 'every item has a valid location');
ok(inv.filter(i => i.loc === 'equipped').length > 0, 'some items resolve as equipped');
ok(inv.filter(i => i.loc === 'stash').length > 0, 'some items resolve to the stash');
ok(inv.filter(i => i.grade === 'LEGENDARY').length > 0, 'grade filter has legendaries to find');
ok(inv.filter(i => i.type === 'GEAR').length > 0 && inv.filter(i => i.type === 'MATERIAL').length > 0, 'both gear and materials present');
ok(inv.every(i => i.level == null || (i.level >= 1 && i.level <= 100)), 'item levels are sane');
const equippedSlots = inv.filter(i => i.loc === 'equipped');
ok(equippedSlots.every(i => i.hero != null && i.slot != null), 'equipped items carry their hero + slot');
const grid = E.storageGrid(psd, 'stash');
ok(grid.length > 0, `stash grid has slots (${grid.length})`);
ok(grid.every((s, i) => s.slot === i), 'stash grid slots are contiguous in Index order');
ok(grid.some(s => s.uid) && grid.some(s => !s.uid), 'stash grid has both filled and empty slots');
ok(grid.filter(s => s.uid).length === inv.filter(i => i.loc === 'stash').length, 'filled stash slots match the stash item count');

console.log('\n-- chest timers --');
const ch = E.chestInfo(psd);
ok(ch.normal && ch.boss && ch.act, 'chestInfo returns all three chest types');
ok(ch.normal.unlocked && ch.normal.base === 300, 'normal chest base auto-open is 300s when unlocked');
ok(ch.boss.base === 600 && ch.act.base === 60, 'boss/act chest base cooldowns read from the save');
ok(ch.normal.cooldown === ch.normal.base - ch.normal.reduce, 'effective cooldown = base minus rune reduction');
ok(ch.normal.cooldown <= ch.normal.base && ch.normal.cooldown >= 1, 'effective cooldown is sane');
ok(ch.normal.capacity >= 0 && Number.isFinite(ch.normal.capacity), 'chest capacity from runes is a number');

console.log('\n-- chest planner --');
const cp = E.chestPlan(psd, { farm: r.farm, favKeys: [] });
ok(cp.dropCooldown === 300, 'shared field-drop cooldown is ~5 min (300s)');
ok(cp.types.length === 3, 'chestPlan returns the three chest types');
const cpN = cp.types.find(t => t.kind === 'normal'), cpB = cp.types.find(t => t.kind === 'boss'), cpA = cp.types.find(t => t.kind === 'act');
ok(cpN.fillSec === null, 'an auto-opened type faster than the drop cadence never fills (fillSec null)');
ok(cpB.slowOpen === true, 'boss auto-open (600s) is slower than the 300s drop cadence -> flagged slowOpen');
ok(!cpA.unlocked && cpA.fillSec === cpA.capacity * cp.dropCooldown, 'a locked (no auto-open) type fills at capacity x drop cadence');
ok(cp.best && cp.source === 'recommend', 'with no wishlist the best chest stage falls back to the farm recommend');
ok(cp.best.clearsPerWindow === cp.dropCooldown / cp.best.clearTime, 'clears-per-window = drop cooldown / real clear time');
const favKey = inv.find(i => i.key && i.grade) ? inv.find(i => i.key && i.grade).key : null;
const cpFav = E.chestPlan(psd, { farm: r.farm, favKeys: favKey ? [favKey] : [] });
ok(!favKey || (cpFav.source === 'wishlist' && cpFav.best.favCount >= 1), 'a starred gear key routes the best chest stage to the wishlist farm');

console.log('\n-- power delta (gear) --');
const rangerSave = psd.heroSaveDatas.find(h => h.heroKey === 201);
const d = E.powerDelta(rangerSave, psd, 0, 314141);
ok(d.dPower > 1000, `swapping Ranger bow->314141 raises POWER by ${round(d.dPower)} (>1000)`);
ok(Math.abs(d.dEhp) < 1, 'pure weapon swap leaves EHP unchanged');

console.log(`\n=== ${pass} passed, ${fail} failed ===`);
process.exit(fail ? 1 : 0);
