const fs = require('fs'), path = require('path');
const src = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'wiki', 'material_effects.json'), 'utf8'));
const mats = src.map(m => ({ key: m.key, name: m.name, grade: m.grade, type: m.type, grants: m.grants.map(g => ({ slot: g.slot, stat: g.stat, value: g.value, tier: g.tier, chance: g.chance })) }));
const payload = JSON.stringify(mats);
const out = ';(function(x){x.TBH_MATFX=' + payload + ';if(typeof module!=="undefined"&&module.exports)module.exports=x.TBH_MATFX;})(typeof globalThis!=="undefined"?globalThis:this);\n';
fs.writeFileSync(path.join(__dirname, 'materialfx.js'), out);
const stats = [...new Set(mats.flatMap(m => m.grants.map(g => g.stat)))].sort();
console.log('wrote engine/materialfx.js: ' + mats.length + ' materials, ' + stats.length + ' stats, ' + (out.length / 1024).toFixed(0) + 'KB raw');
