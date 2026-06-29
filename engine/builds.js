// engine/builds.js — curated TBH: Task Bar Hero build catalog (team comps + per-class).
// Rendered save-aware in the Builds tab: owned heroes and your live formation are highlighted.
// Meta synced to the late-June-2026 game build (v1.00.20): Priest·Ranger·Sorcerer is the top
// farm comp; Hunter shifted into a Knight·Hunter·Priest elemental setup. Text is EN + PT-BR;
// other locales fall back to EN (matches the rest of the app). Curated from the current meta —
// not an in-game export. Skill / passive icons live under assets/game/skills/.
(function () {
  // active-skill display names by skill key -> [en, pt-BR]
  var S = {
    10101: ['Piercing Thrust', 'Estocada Perfurante'], 10201: ['Shield Charge', 'Investida do Escudo'],
    10301: ['Retribution Strike', 'Golpe de Retribuição'], 10401: ['Aegis Field', 'Campo de Égide'],
    10501: ['Sacred Blade', 'Lâmina Sagrada'], 10601: ['Unyielding Will', 'Vontade Inabalável'],
    20101: ['Rapid Fire', 'Tiro Rápido'], 20201: ['Scatter Shot', 'Tiro Disperso'],
    20301: ['Arrow Rain', 'Chuva de Flechas'], 20401: ['Swift Surge', 'Surto Veloz'],
    20501: ['Piercing Arrow', 'Flecha Perfurante'], 20601: ['Skewer Shot', 'Disparo Espetador'],
    30101: ['Fireball', 'Bola de Fogo'], 30201: ['Ice Orb', 'Orbe de Gelo'],
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
    HpLeech: ['Life Leech', 'Roubo de Vida']
  };
  var pick = function (e) { return e ? { en: e[0], pt: e[1] } : null; };

  window.TBH_BUILDS = {
    ver: '1.00.20',
    updated: '2026-06-28',
    skill: function (k) { return pick(S[k]) || { en: 'Skill ' + k, pt: 'Skill ' + k }; },
    pass: function (k) { return pick(P[k]) || { en: k, pt: k }; },

    // ---- team compositions, slot order = formation front -> back ----
    teams: [
      {
        id: 'prs', tier: 'S', slots: [401, 201, 301], tag: 'META',
        sum: { en: 'The strongest farm team right now. The Priest tanks the front and buffs the whole party, the Ranger melts single targets and bosses, and the Sorcerer wipes packs.',
               pt: 'O time de farm mais forte agora. O Priest segura a frente e buffa a party inteira, o Ranger derrete alvo único e chefes, e o Sorcerer limpa as ondas.' },
        when: { en: 'Mid/late game, once the Ranger has gear and you can keep the backline alive.',
                pt: 'Meio/fim de jogo, quando o Ranger já tem gear e você consegue manter a retaguarda viva.' },
        skills: { 401: [40201, 40401], 201: [20401, 20601], 301: [30401, 30601] }
      },
      {
        id: 'kpr', tier: 'A', slots: [101, 401, 201],
        sum: { en: 'The safest sustain comp. Knight holds the front, Priest heals the line, Ranger pours in clean free damage from the back.',
               pt: 'A comp de sustento mais segura. O Knight segura a frente, o Priest cura a linha e o Ranger entrega dano limpo da retaguarda.' },
        when: { en: 'Best when deaths or failed pushes are wasting your idle time.',
                pt: 'Melhor quando mortes ou pushes falhos estão desperdiçando seu tempo de idle.' },
        skills: { 101: [10201, 10401], 401: [40201, 40101], 201: [20101, 20201] }
      },
      {
        id: 'khp', tier: 'A', slots: [101, 501, 401],
        sum: { en: 'Elemental burst comp. Knight soaks the hits, Hunter clears packs and freezes bosses with fire/cold bolts, Priest keeps the line healthy.',
               pt: 'Comp de explosão elemental. O Knight absorve, o Hunter limpa ondas e congela chefes com virotes de fogo/gelo, e o Priest mantém a linha saudável.' },
        when: { en: 'Great farm option once survival is solved and you own the Hunter DLC.',
                pt: 'Ótima opção de farm quando a sobrevivência está resolvida e você tem a DLC do Hunter.' },
        skills: { 101: [10201, 10401], 501: [50101, 50201], 401: [40201, 40101] }
      },
      {
        id: 'kr', tier: 'B', slots: [101, 201],
        sum: { en: 'The starter core. Two heroes, rock-steady early idle clears — your first real formation.',
               pt: 'O núcleo inicial. Dois heróis, clears de idle bem estáveis no começo — sua primeira formação de verdade.' },
        when: { en: 'Early game, before the Priest / 3rd slot. Slot in the Priest the moment you unlock it.',
                pt: 'Início de jogo, antes do Priest / 3º slot. Encaixe o Priest assim que desbloquear.' },
        skills: { 101: [10201, 10301], 201: [20101, 20201] }
      },
      {
        id: 'ksp', tier: 'B', slots: [101, 301, 401],
        sum: { en: 'Maximum AoE wave clear. The Sorcerer nukes packs from behind a Knight wall while the Priest keeps everyone standing.',
               pt: 'Limpeza máxima em área. O Sorcerer detona ondas atrás do muro do Knight enquanto o Priest mantém todo mundo de pé.' },
        when: { en: 'When stages throw big mobs at you — protect the Sorcerer before judging its damage.',
                pt: 'Quando as fases jogam muitos inimigos — proteja o Sorcerer antes de julgar o dano dele.' },
        skills: { 101: [10201, 10401], 301: [30101, 30401], 401: [40201, 40101] }
      }
    ],

    // ---- per-class builds ----
    classes: [
      {
        hk: 101, dlc: false,
        role: { en: 'Front-line Tank', pt: 'Tanque da Linha de Frente' },
        skills: [10201, 10401, 10601],
        passives: ['MaxHp', 'Armor', 'BlockChance', 'DamageReduction', 'PhysicalDamagePercent'],
        gear: { en: 'Max HP, Armor, Damage Reduction, Block — Sword + Shield.',
                pt: 'HP Máx, Armadura, Redução de Dano, Bloqueio — Espada + Escudo.' },
        tip: { en: 'The default anchor. Stack survivability so failed runs start at the front line, not on your DPS.',
               pt: 'A âncora padrão. Empilhe sobrevivência pra que runs falhos comecem pela linha de frente, não pelo seu DPS.' }
      },
      {
        hk: 201, dlc: false,
        role: { en: 'Ranged Single-Target DPS', pt: 'DPS de Alvo Único à Distância' },
        skills: [20101, 20401, 20601],
        passives: ['AttackSpeed', 'CriticalChance', 'CriticalDamage', 'ProjectileDamage', 'DodgeChance'],
        gear: { en: 'Attack Speed, Crit Chance, Crit Damage, Projectile Damage — Bow + Arrow.',
                pt: 'Vel. de Ataque, Chance e Dano Crítico, Dano de Projétil — Arco + Flecha.' },
        tip: { en: 'Build pure attack speed early (Rapid Fire), then swap to Swift Surge + Skewer Shot for boss damage.',
               pt: 'Foque vel. de ataque cedo (Tiro Rápido) e depois troque pra Surto Veloz + Disparo Espetador pro dano em chefe.' }
      },
      {
        hk: 301, dlc: false,
        role: { en: 'AoE Burst Caster', pt: 'Conjurador de Dano em Área' },
        skills: [30101, 30401, 30601],
        passives: ['CooldownReduction', 'AreaOfEffectDamage', 'FireDamagePercent', 'LightningDamagePercent', 'CastSpeed'],
        gear: { en: 'Cooldown Reduction, AoE, Fire/Cold/Lightning Damage, Cast Speed — Staff + Orb.',
                pt: 'Red. de Recarga, Área, Dano de Fogo/Gelo/Raio, Vel. de Conjuração — Cajado + Orbe.' },
        tip: { en: 'Fireball early for its low cooldown; swap to Flame Hydra (a rapid-fire fireball turret) for a big DPS jump. Needs a tank in front.',
               pt: 'Bola de Fogo cedo pela recarga baixa; troque pra Hidra de Chamas (uma torre de bolas de fogo) pra dar um salto de DPS. Precisa de um tank na frente.' }
      },
      {
        hk: 401, dlc: true,
        role: { en: 'Sustain Support & Off-Tank', pt: 'Suporte de Sustento e Semi-Tank' },
        skills: [40201, 40101, 40401],
        passives: ['CooldownReduction', 'SkillHealAmount', 'MaxHp', 'Armor', 'DamageAbsorption'],
        gear: { en: 'Max HP, Armor, Damage Absorption, Cooldown Reduction, Heal Amount — Scepter + Tome.',
                pt: 'HP Máx, Armadura, Absorção de Dano, Red. de Recarga, Cura — Cetro + Tomo.' },
        tip: { en: 'Blessing of Might is non-negotiable — an always-on party buff. Run Heal early, upgrade to Sanctuary for late Act 2/3.',
               pt: 'Bênção do Poder é obrigatória — um buff de party sempre ativo. Use Cura cedo e troque pra Santuário no fim do Ato 2/3.' }
      },
      {
        hk: 501, dlc: true,
        role: { en: 'Elemental Crossbow DPS', pt: 'DPS Elemental de Besta' },
        skills: [50101, 50201, 50501],
        passives: ['CriticalChance', 'CriticalDamage', 'FireDamagePercent', 'ColdDamagePercent', 'CooldownReduction'],
        gear: { en: 'Attack Speed, Crit Chance, Crit Damage, Fire/Cold Damage — Crossbow + Bolts.',
                pt: 'Vel. de Ataque, Chance e Dano Crítico, Dano de Fogo/Gelo — Besta + Virotes.' },
        tip: { en: 'Pure damage — never spread stats thin. Explosive Bolt + Frost Bolt clear packs and freeze bosses. Pair behind a Knight + Priest.',
               pt: 'Dano puro — nunca espalhe stats. Virote Explosivo + Virote de Gelo limpam ondas e congelam chefes. Encaixe atrás de Knight + Priest.' }
      },
      {
        hk: 601, dlc: true,
        role: { en: 'Melee Bruiser', pt: 'Brigão Corpo a Corpo' },
        skills: [60101, 60201, 60601],
        passives: ['MaxHp', 'PhysicalDamagePercent', 'AreaOfEffect', 'HpLeech', 'CriticalDamage'],
        gear: { en: 'Max HP, Physical Damage, AoE, HP Leech, Crit Damage — Axe + Hatchet.',
                pt: 'HP Máx, Dano Físico, Área, Roubo de Vida, Dano Crítico — Machado + Machadinha.' },
        tip: { en: 'A self-sustaining frontline damage dealer — HP Leech keeps him alive while he carves through packs.',
               pt: 'Um dano de linha de frente que se sustenta sozinho — o Roubo de Vida o mantém vivo enquanto corta as ondas.' }
      }
    ]
  };
})();
