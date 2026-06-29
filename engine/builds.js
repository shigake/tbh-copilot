// engine/builds.js — curated TBH: Task Bar Hero build catalog (team comps + per-class).
// Rendered save-aware in the Builds tab: owned heroes and your live formation are highlighted.
// Sourced from recent (late-June-2026) community build videos — each build links its source.
// The current fast-clear meta: a fully-free Priest·Ranger·Sorcerer comp where the Priest tanks
// the front herself, the Sorcerer kites with Frozen Orb (Ice Orb), and everyone wears Arcana
// Knight Boots to keep pace between waves. Text is EN + PT-BR; other locales fall back to EN.
(function () {
  // active-skill display names by skill key -> [en, pt-BR]
  var S = {
    10101: ['Piercing Thrust', 'Estocada Perfurante'], 10201: ['Shield Charge', 'Investida do Escudo'],
    10301: ['Retribution Strike', 'Golpe de Retribuição'], 10401: ['Aegis Field', 'Campo de Égide'],
    10501: ['Sacred Blade', 'Lâmina Sagrada'], 10601: ['Unyielding Will', 'Vontade Inabalável'],
    20101: ['Rapid Fire', 'Tiro Rápido'], 20201: ['Scatter Shot', 'Tiro Disperso'],
    20301: ['Arrow Rain', 'Chuva de Flechas'], 20401: ['Swift Surge', 'Surto Veloz'],
    20501: ['Piercing Arrow', 'Flecha Perfurante'], 20601: ['Skewer Shot', 'Disparo Espetador'],
    30101: ['Fireball', 'Bola de Fogo'], 30201: ['Ice Orb (Frozen Orb)', 'Orbe de Gelo'],
    30301: ['Lightning', 'Raio'], 30401: ['Flame Hydra', 'Hidra de Chamas'],
    30501: ['Snowstorm', 'Nevasca'], 30601: ['Meteor Strike', 'Golpe Meteórico'],
    40101: ['Heal', 'Cura'], 40201: ['Blessing of Might', 'Bênção do Poder'],
    40301: ['Wrath of Heaven', 'Ira dos Céus'], 40401: ['Sanctuary', 'Santuário'],
    40501: ['Blessing of Warding', 'Bênção de Proteção'], 40601: ['Resurrection', 'Ressurreição'],
    50101: ['Explosive Bolt', 'Virote Explosivo'], 50201: ['Frost Bolt', 'Virote de Gelo'],
    50301: ['Quick Loader', 'Recarga Rápida'], 50401: ['Charge Trap', 'Armadilha de Carga'],
    50501: ['Crossbow Turret', 'Torre de Besta'], 50601: ['Shock Bolt', 'Virote de Choque'],
    60101: ['Slam Jump', 'Salto Devastador'], 60201: ['Crushing Blow', 'Golpe Esmagador'],
    60301: ["Commander's Cry", 'Grito do Comandante'], 60401: ['Ground Slam', 'Golpe no Chão'],
    60501: ['Axe Spin', 'Giro de Machado'], 60601: ['Bloodlust', 'Sede de Sangue']
  };
  // passive-priority labels by icon base name (assets/game/skills/Passive_<key>.png) -> [en, pt-BR]
  var P = {
    MaxHp: ['Max HP', 'HP Máx'], Armor: ['Armor', 'Armadura'], BlockChance: ['Block Chance', 'Bloqueio'],
    DamageReduction: ['Damage Reduction', 'Redução de Dano'], DamageAbsorption: ['Damage Absorption', 'Absorção de Dano'],
    PhysicalDamagePercent: ['Physical Damage', 'Dano Físico'], AttackSpeed: ['Attack Speed', 'Vel. de Ataque'],
    CriticalChance: ['Crit Chance', 'Chance Crítica'], CriticalDamage: ['Crit Damage', 'Dano Crítico'],
    ProjectileDamage: ['Projectile Damage', 'Dano de Projétil'], DodgeChance: ['Dodge Chance', 'Esquiva'],
    CooldownReduction: ['Cooldown Reduction', 'Red. de Recarga'], AreaOfEffect: ['Area of Effect', 'Área de Efeito'],
    AreaOfEffectDamage: ['AoE Damage', 'Dano em Área'], FireDamagePercent: ['Fire Damage', 'Dano de Fogo'],
    ColdDamagePercent: ['Cold Damage', 'Dano de Gelo'], LightningDamagePercent: ['Lightning Damage', 'Dano de Raio'],
    CastSpeed: ['Cast Speed', 'Vel. de Conjuração'], SkillHealAmount: ['Heal Amount', 'Cura'],
    HpLeech: ['Life Leech', 'Roubo de Vida'], MovementSpeed: ['Move Speed', 'Vel. de Movimento'],
    HpRegenPerSec: ['HP Regen', 'Regen. de HP']
  };
  var pick = function (e) { return e ? { en: e[0], pt: e[1] } : null; };
  var Y = function (id) { return 'https://www.youtube.com/watch?v=' + id; };

  window.TBH_BUILDS = {
    ver: '1.00.20',
    updated: '2026-06-29',
    // benchmark clear times from the source videos, keyed by stage label (Torment difficulty)
    benchmarks: { '3-9': '~70s', '1-3': '~72-76s' },
    skill: function (k) { return pick(S[k]) || { en: 'Skill ' + k, pt: 'Skill ' + k }; },
    pass: function (k) { return pick(P[k]) || { en: k, pt: k }; },

    // ---- team compositions, slot order = formation front -> back ----
    teams: [
      {
        id: 'prs', tier: 'S', slots: [401, 201, 301], tag: 'BROKEN', clear: 'Torment 3-9 · ~70s',
        sum: { en: 'The strongest team in the game and fully free — no DLC. The Priest tanks the front herself and buffs the party +140% damage, the Ranger is a glass-cannon auto-attacker, and the Sorcerer kites packs with Frozen Orb. This is the comp clearing Torment 3-9 in ~70 seconds.',
               pt: 'O time mais forte do jogo e 100% grátis — sem DLC. A Priest segura a frente sozinha e buffa +140% de dano na party, o Ranger é um glass cannon de ataque básico, e o Sorcerer kita as ondas com o Orbe de Gelo. É a comp que limpa o Tormento 3-9 em ~70 segundos.' },
        when: { en: 'Your end-game farm and push comp. Put Arcana Knight Boots on the Sorcerer so it keeps pace between waves, and stack Cooldown Reduction + Cast Speed on the Priest.',
                pt: 'Sua comp de farm e push do end-game. Põe as Botas do Knight (Arcana) no Sorcerer pra ele acompanhar entre as ondas, e empilha Redução de Recarga + Vel. de Conjuração na Priest.' },
        skills: { 401: [40401, 40201], 201: [20101, 20401], 301: [30201, 30401] },
        src: [{ u: Y('DgA6i61PL24'), by: 'Sir Eat Alot' }, { u: Y('X972q4q_YD4'), by: 'Task Bar Hero Dicas' }]
      },
      {
        id: 'srs', tier: 'A', slots: [601, 201, 301], tag: 'NEW', clear: 'Torment 1-3 · ~72-76s',
        sum: { en: 'The meta-breaker: swap the Priest for a Slayer and crank movement speed. The Slayer self-sustains up front with Life Leech while the Ranger and Sorcerer melt — clears Torment 1-3 in ~72-76s, even without the Arcana Frozen Orb.',
               pt: 'O quebra-meta: troca a Priest por um Slayer e aumenta a velocidade de movimento. O Slayer se sustenta sozinho na frente com Roubo de Vida enquanto Ranger e Sorcerer derretem — limpa o Tormento 1-3 em ~72-76s, mesmo sem o Orbe de Gelo Arcana.' },
        when: { en: 'When you want to push without a Priest, or you own the Slayer and have good movement-speed gear.',
                pt: 'Quando você quer empurrar sem Priest, ou tem o Slayer e gear bom de velocidade de movimento.' },
        skills: { 601: [60101, 60601], 201: [20101, 20401], 301: [30201, 30401] },
        src: [{ u: Y('OpZcWv9QS4A'), by: 'MyGamerAcademia' }]
      },
      {
        id: 'kr', tier: 'B', slots: [101, 201],
        sum: { en: 'The starter core. Two heroes, rock-steady early idle clears — your first real formation before the Priest and a third slot come online.',
               pt: 'O núcleo inicial. Dois heróis, clears de idle bem estáveis no começo — sua primeira formação de verdade antes do Priest e do terceiro slot.' },
        when: { en: 'Early game. Slot in the Priest the moment you unlock it, then build toward the meta comp above.',
                pt: 'Início de jogo. Encaixe o Priest assim que desbloquear e evolua pra comp meta acima.' },
        skills: { 101: [10201, 10301], 201: [20101, 20201] }
      }
    ],

    // ---- per-class builds ----
    classes: [
      {
        hk: 301, dlc: false,
        role: { en: 'Frozen Orb Kiter (AoE)', pt: 'Kiter de Orbe de Gelo (Área)' },
        skills: [30201, 30401, 30601],
        passives: ['CooldownReduction', 'AreaOfEffectDamage', 'CriticalChance', 'CriticalDamage', 'FireDamagePercent'],
        gear: { en: 'Cooldown Reduction, AoE Damage + Size, Crit — Staff + Orb. Wear Arcana Knight Boots to keep pace between waves.',
                pt: 'Red. de Recarga, Dano e Tamanho de Área, Crítico — Cajado + Orbe. Use as Botas do Knight (Arcana) pra acompanhar entre as ondas.' },
        tip: { en: 'The current fast-clear mage: Ice Orb (Frozen Orb) slows packs so you kite while Flame Hydra / Meteor melt them. Cooldown Reduction is king — every skill is on a cooldown. The Knight-Boots trick lets the slow Sorcerer move at the party’s fastest speed.',
               pt: 'O mago de fast clear do momento: o Orbe de Gelo dá slow pra você kitar enquanto Hidra de Chamas / Meteoro derretem. Redução de Recarga é o rei — toda skill tem cooldown. As Botas do Knight deixam o Sorcerer lento andar na velocidade do membro mais rápido.' },
        src: [{ u: Y('ScZmLZtQrLM'), by: 'Namoratow' }, { u: Y('DgA6i61PL24'), by: 'Sir Eat Alot' }]
      },
      {
        hk: 201, dlc: false,
        role: { en: 'Glass-Cannon Auto-Attacker', pt: 'Glass Cannon de Ataque Básico' },
        skills: [20101, 20401, 20601],
        passives: ['AttackSpeed', 'CriticalChance', 'CriticalDamage', 'ProjectileDamage', 'DodgeChance'],
        gear: { en: 'Attack Damage + Attack Speed (both mandatory), Crit, and Physical-Damage decorations / engravings (amethyst) — Bow + Arrow. Go full glass cannon for Torment.',
                pt: 'Dano de Ataque + Vel. de Ataque (ambos obrigatórios), Crítico, e decorações / gravações de Dano Físico (ametista) — Arco + Flecha. Vai full glass cannon pro Tormento.' },
        tip: { en: 'The endgame solo carry once the Priest falls off (~Torment 2-7). Meta discovery: Physical-Damage decorations buff her basic attacks, so with high Attack Speed you lean on auto-attacks over cooldown skills. Rapid Fire early, swap to Swift Surge (~Lv 21) for single-target. Arcana, F2P-friendly.',
               pt: 'O carry solo do endgame quando a Priest cai (~Tormento 2-7). Descoberta do meta: decorações de Dano Físico aumentam o ataque básico dela, então com Vel. de Ataque alta você foca nos autos em vez das skills de cooldown. Tiro Rápido cedo, troca pra Surto Veloz (~Nv 21) pro alvo único. Arcana, amigável a F2P.' },
        src: [{ u: Y('Yw-k52X_GOw'), by: 'MyGamerAcademia' }, { u: Y('a7zg3o4URHg'), by: 'Tudo Sobre TBH' }, { u: Y('2AjaaRf1D8o'), by: 'Starker MMOs' }]
      },
      {
        hk: 401, dlc: true,
        role: { en: 'Lifesteal Tank & Party Buffer', pt: 'Tank de Roubo de Vida e Buff' },
        skills: [40201, 40401, 40601],
        passives: ['CooldownReduction', 'MaxHp', 'Armor', 'HpLeech', 'SkillHealAmount'],
        gear: { en: 'Max HP, Armor, HP Leech, Cooldown Reduction, Cast Speed — Scepter + Tome.',
                pt: 'HP Máx, Armadura, Roubo de Vida, Red. de Recarga, Vel. de Conjuração — Cetro + Tomo.' },
        tip: { en: 'Blessing of Might is an always-on +140% party-damage buff; with HP Leech + Sanctuary she becomes nearly unkillable and tanks the front herself — no Knight. She carries from early game to ~Torment 2-7; past that enemies one-shot her, so transition to a solo Ranger.',
               pt: 'Bênção do Poder é um buff de +140% de dano na party sempre ativo; com Roubo de Vida + Santuário ela fica quase imortal e tanka a frente sozinha — sem Knight. Carrega do early até ~Tormento 2-7; depois disso os inimigos dão one-shot, então migre pra um Ranger solo.' },
        src: [{ u: Y('C0dAl4ptLHM'), by: 'Starker MMOs' }, { u: Y('MY8mgZc_ZUU'), by: 'MyGamerAcademia' }]
      },
      {
        hk: 601, dlc: true,
        role: { en: 'Meta-Breaker Bruiser', pt: 'Brigão Quebra-Meta' },
        skills: [60101, 60201, 60601],
        passives: ['MovementSpeed', 'PhysicalDamagePercent', 'MaxHp', 'HpLeech', 'CriticalDamage'],
        gear: { en: 'Movement Speed, Physical Damage, HP Leech, Crit, Max HP — Axe + Hatchet.',
                pt: 'Vel. de Movimento, Dano Físico, Roubo de Vida, Crítico, HP Máx — Machado + Machadinha.' },
        tip: { en: 'The off-meta breaker: drop the Priest, push movement speed, and the Slayer carves Torment 1-3 in ~72-76s — even without the Arcana Frozen Orb. A self-sustaining frontline carry thanks to HP Leech.',
               pt: 'O quebra-meta: tira o Priest, aumenta a vel. de movimento e o Slayer corta o Tormento 1-3 em ~72-76s — mesmo sem o Orbe de Gelo Arcana. Um carry de frente que se sustenta sozinho com Roubo de Vida.' },
        src: [{ u: Y('OpZcWv9QS4A'), by: 'MyGamerAcademia' }]
      },
      {
        hk: 101, dlc: false,
        role: { en: 'Front-line Tank (situational)', pt: 'Tanque de Frente (situacional)' },
        skills: [10201, 10401, 10601],
        passives: ['MaxHp', 'Armor', 'BlockChance', 'DamageReduction', 'PhysicalDamagePercent'],
        gear: { en: 'Max HP, Armor, Damage Reduction, Block — Sword + Shield.',
                pt: 'HP Máx, Armadura, Redução de Dano, Bloqueio — Espada + Escudo.' },
        tip: { en: 'The free meta uses the Priest as the tank, so the Knight is situational now — but his Arcana Boots are the best-in-slot move-speed item for the whole party (everyone moves at the fastest member’s speed between waves).',
               pt: 'O meta grátis usa a Priest como tank, então o Knight é situacional agora — mas as Botas dele (Arcana) são o melhor item de vel. de movimento pra party inteira (todos andam na velocidade do mais rápido entre as ondas).' },
        src: [{ u: Y('DgA6i61PL24'), by: 'Sir Eat Alot' }]
      },
      {
        hk: 501, dlc: true,
        role: { en: 'Elemental Crossbow DPS', pt: 'DPS Elemental de Besta' },
        skills: [50101, 50201, 50501],
        passives: ['CriticalChance', 'CriticalDamage', 'FireDamagePercent', 'ColdDamagePercent', 'CooldownReduction'],
        gear: { en: 'Attack Speed, Crit Chance, Crit Damage, Fire/Cold Damage — Crossbow + Bolts.',
                pt: 'Vel. de Ataque, Chance e Dano Crítico, Dano de Fogo/Gelo — Besta + Virotes.' },
        tip: { en: 'A strong DLC alternative: Explosive Bolt + Frost Bolt clear packs and freeze bosses. Pure damage — never spread stats thin. Pair behind a tank (Knight or Priest).',
               pt: 'Uma alternativa DLC forte: Virote Explosivo + Virote de Gelo limpam ondas e congelam chefes. Dano puro — nunca espalhe stats. Encaixe atrás de um tank (Knight ou Priest).' }
      }
    ]
  };
})();
