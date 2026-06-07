

const E = require('./engine.js'), fs = require('path').join, p = require('path');
const path = p.join(__dirname, '..', 'runtime', 'save_snapshot.json');
const snap = JSON.parse(require('fs').readFileSync(path, 'utf8'));
const psd = E.parseSave(snap.PlayerSaveData.value);
const gps = 50;
const _cur = E.DB.stages[String(psd.commonSaveData.currentStageKey)];
const eps = _cur ? 3 * gps * (_cur.exp / _cur.gold) : undefined;
const _s11 = E.DB.stages['1101'], _s35 = E.DB.stages['1305'];
const clearSamples = [{ hp: _s11.totalHP, waves: _s11.waves, clearSec: 46 }, { hp: _s35.totalHP, waves: _s35.waves, clearSec: 221 }];
const rec = E.recommend(psd, { goldPerSec: gps, expPerSec: eps, clearSamples, elapsedSec: 0 });
const c = psd.commonSaveData;
const meta = { gold: E.gold(psd), goldPerHour: Math.round(gps * 3600), playTimeH: +(c.playTime / 3600).toFixed(1), version: c.version };
const payload = JSON.stringify({ rec, meta });
const out = ';(function(g){g.TBH_DEMO=' + payload + ';if(typeof module!=="undefined"&&module.exports)module.exports=g.TBH_DEMO;})(typeof globalThis!=="undefined"?globalThis:this);\n';
require('fs').writeFileSync(p.join(__dirname, 'demo.js'), out);
console.log('regenerated engine/demo.js (' + (out.length / 1024).toFixed(0) + ' KB) carry=' + (E.DB.heroes[rec.meta.carryHero] || {}).cls + ' farm.recommend=' + (rec.farm.recommend && rec.farm.recommend.label));
