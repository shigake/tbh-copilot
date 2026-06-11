<div align="center">

# TBH Co-pilot

An optimization companion for the idle-RPG [TBH: Task Bar Hero](https://store.steampowered.com/app/3678970/TBH_Task_Bar_Hero/).
It reads your save **locally in the browser**, decrypts it, and tells you the optimal next move: where to
farm, when to come back, when you'll level, which runes and gear to get, and how much power each change buys.

[![CI](https://github.com/shigake/tbh-copilot/actions/workflows/ci.yml/badge.svg)](https://github.com/shigake/tbh-copilot/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Privacy](https://img.shields.io/badge/privacy-100%25%20local-blue.svg)](#privacy-and-ethics)
[![Languages](https://img.shields.io/badge/languages-16-orange.svg)](#features)

### ▶ [Open the app](https://shigake.github.io/tbh-copilot/dashboard.html) — no install, runs in your browser

100% local &nbsp;&middot;&nbsp; free, no ads, no tracking &nbsp;&middot;&nbsp; no server, no build step &nbsp;&middot;&nbsp; 16 languages

<img src="screenshots/overview.png" width="820" alt="Overview: party roster, POWER, next actions">

</div>

> Unofficial fan project. Not affiliated with or endorsed by the developers of TBH: Task Bar Hero.
> All game content, names, sprites and data belong to their respective owners. You need to own and run the game.

## Why

Combat is automatic, so the game is less about reflexes and more about decisions: which heroes to field,
where to spend gold, which floor gives the best loot per minute. TBH Co-pilot answers all of that from your
actual save, live, with no spreadsheets and no manual input. Everything is computed in your browser and
nothing ever leaves your machine.

## Features

| Area | What it does |
|---|---|
| **Coach & timeline** | A single "do this now" card distilling the best next action, plus a timeline of what lands when: each hero's next level, the offline-reward cap, the gold target for your next planned purchase. |
| **Party roster** | Game sprites, POWER, DPS share, EHP, level and XP/ETA, unspent ability points, equipped gear. Click a hero for a full stat sheet that breaks every stat down by source. |
| **Farm optimizer** | The wiki Farming Optimizer idea, automated. It calibrates your real clear rate from your measured gold/sec and ranks every cleared stage by gold/hour and exp/hour, with a sortable table (clear time, EXP/HP and Gold/HP density) and level/gold projections at 1/3/5/8 h. It sends you to the dense, fast stage instead of an unclearable floor. |
| **Idle / return timer** | Offline reward curve, the optimal time to come back (the 8 h cap), and what to park on first. |
| **Interactive rune tree** | All 197 nodes laid out and colored by category. Pick a category (EXP, Combat, Gold, Items, Chest, Inventory, Offline, Utility) and the tree highlights that branch and lists the three cheapest buyable nodes. Almost-free runes are called out. |
| **Gear comparator** | For any slot, the POWER delta of every item: the ones in your bag and the ones you don't have yet (capped to gear you can realistically farm), with live Steam Market prices and listing links, so you can see what to aim for. |
| **Shop / build planner** | Pick the effects you want (Decorations, Engravings, Inscriptions), see which materials grant them, and build a cart with live Steam Market prices — then open every listing with one click. |
| **History charts** | POWER and gold tracked over time in your browser (IndexedDB), so you can see how fast you're actually growing. |
| **Notifications** | Opt-in browser notifications while the tab sits in the background: a hero levels up, a planned purchase becomes affordable, or your offline rewards hit the 8 h cap. |
| **Install & themes** | Installable as an app (PWA) with offline-cached sprites; dark and light themes. |
| **16 languages** | UI and game content localized; the stat model is calibrated against the in-game Status panel. |

<div align="center">
<img src="screenshots/runes.png" width="49%" alt="Rune tree with recommend by category">
<img src="screenshots/farm.png" width="49%" alt="Farm optimizer table and idle timer">
</div>

## Quick start

**Option 1 — hosted (recommended):** open **[shigake.github.io/tbh-copilot](https://shigake.github.io/tbh-copilot/dashboard.html)**.
Even hosted, your save is read and decrypted *in your browser* — nothing is uploaded anywhere.

**Option 2 — run it yourself:** clone the repo (or download it as a ZIP) and open `dashboard.html`. No build, no dependencies.

Then:

1. Click **Connect save** and pick your save file:
   - **Windows**: `%USERPROFILE%\AppData\LocalLow\TesseractStudio\TaskbarHero\SaveFile_Live.es3`
   - **Linux (Steam Flatpak)**: `~/.var/app/com.valvesoftware.Steam/.local/share/Steam/steamapps/compatdata/3678970/pfx/drive_c/users/steamuser/AppData/LocalLow/TesseractStudio/TaskbarHero/SaveFile_Live.es3`
   - **Linux (native Steam)**: `~/.local/share/Steam/steamapps/compatdata/3678970/pfx/drive_c/users/steamuser/AppData/LocalLow/TesseractStudio/TaskbarHero/SaveFile_Live.es3`
2. Done. In Chrome/Edge it tracks the save live and updates as you play. Other browsers load the save on
   demand — click the refresh button to re-read. Or click **demo** to look around first.

Everything lives on one page: an **Overview** (party roster and what-to-do-now), the **Farm**
optimizer, the **Runes** tree, a **Gear** comparator, the **Shop** build planner, and **History** charts.

## How it works

The save (encrypted ES3 / AES-CBC) is decrypted with Web Crypto, and the game data the app needs is bundled
into `engine/gamedata.js`. On browsers with the File System Access API (Chrome/Edge) it watches the save
live; on other browsers it falls back to a standard file picker. There is no backend and no build step;
the only things fetched from the network are web fonts and the optional Steam Market prices — your save
data is never part of any request.

One engine drives both surfaces: `engine/engine.js` (UMD, runs in the browser and in Node) computes
effective DPS/EHP/POWER, leveling, the calibrated farm optimizer, idle, the rune tree and planners, and the
gear and enchant deltas. Every tab calls the same `recommend()`. The stat model uses the exact formulas
recovered from the game binary (via the community wiki) and was checked against the in-game Status panel,
and a 68-assertion test suite validates it against a real save on every push.

```
index.html            landing page
dashboard.html        the whole app (open this)
engine/               engine.js, gamedata.js, i18n.js, demo.js, tests, build scripts
assets/               game icons and sprites the UI shows
data/                 trimmed stage and rune tables
```

## Development

There is deliberately no toolchain: edit a file, refresh the browser.

```bash
node engine/test.cjs    # run the engine test suite (68 assertions vs a real save)
```

CI runs the same suite on every push. Issues and PRs are welcome — and if the
co-pilot helps your runs, a ⭐ helps other players find it.

## Privacy and ethics

Your save never leaves your computer. It is read and decrypted locally, with no servers, analytics, or
trackers. The project is free, has no ads, and there is no intention to ever make money from it. Use it,
fork it, self-host it.

## License

Code is [MIT](LICENSE). Game content and assets remain the property of their respective owners (see the
note at the bottom of `LICENSE`).
