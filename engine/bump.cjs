// One command to bump the cache-buster correctly: `node engine/bump.cjs`.
// It rewrites every ?v= in dashboard.html to the next integer AND records a content
// hash of the shipped assets in engine/cachever.json. smoke.cjs fails CI if the assets
// change without this being run, so the v50-style "shipped but invisible to cached
// visitors" bug can't reach production again.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..');

// Hash the actual shipped behavior, independent of the cache-buster value itself: the
// six engine bundles + dashboard.html with its ?v= query strings stripped out.
const SHIPPED = ['engine/gamedata.js', 'engine/i18n.js', 'engine/engine.js', 'engine/demo.js', 'engine/gearnames.js', 'engine/materialfx.js', 'engine/itemnames.js', 'engine/builds.js'];
// Normalize CRLF→LF before hashing so the digest is identical on a Windows working tree
// (git autocrlf) and a fresh Linux CI checkout — otherwise line endings alone would flip it.
const norm = p => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
function assetHash() {
  const h = crypto.createHash('sha256');
  for (const f of SHIPPED) h.update(norm(path.join(ROOT, f)));
  h.update(norm(path.join(ROOT, 'dashboard.html')).replace(/\?v=\d+/g, '?v='));
  return h.digest('hex').slice(0, 12);
}

module.exports = { assetHash, SHIPPED };

// Only bump when run directly (`node engine/bump.cjs`); requiring it (smoke.cjs) is
// side-effect-free and just reuses assetHash().
if (require.main === module) {
  const dashPath = path.join(ROOT, 'dashboard.html');
  let html = fs.readFileSync(dashPath, 'utf8');
  const cur = Math.max(0, ...[...html.matchAll(/\?v=(\d+)/g)].map(m => +m[1]));
  const next = cur + 1;
  html = html.replace(/\?v=\d+/g, '?v=' + next);
  fs.writeFileSync(dashPath, html);
  fs.writeFileSync(path.join(__dirname, 'cachever.json'), JSON.stringify({ version: next, hash: assetHash() }) + '\n');
  console.log(`cache-buster bumped v${cur} -> v${next} (asset hash ${assetHash()})`);
}
