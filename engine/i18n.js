

;(function (g) {
 'use strict';

 const LOCALES = [
 ['en-US', 'English'], ['pt-BR', 'Português'], ['es-ES', 'Español'], ['fr-FR', 'Français'],
 ['de-DE', 'Deutsch'], ['ja-JP', '日本語'], ['ko-KR', '한국어'], ['zh-Hans', '简体中文'],
 ['zh-Hant', '繁體中文'], ['ru-RU', 'Русский'], ['pl-PL', 'Polski'], ['tr-TR', 'Türkçe'],
 ['uk-UA', 'Українська'], ['id-ID', 'Indonesia'], ['th-TH', 'ไทย'], ['vi-VN', 'Tiếng Việt'],
 ];

 const UI = {
 'en-US': {
 tagline: 'optimize your run — 100% local',
 connect: ' CONNECT SAVE', reconnect: ' RECONNECT', demo: 'see demo',
 gate_pick: 'Point me at your save once and I track it live while you play.',
 gate_reconnect: 'Reconnect to your save to keep tracking live (1 click).',
 need_browser: 'Your browser lacks File System Access — use Chrome or Edge (or click "see demo").',
 perm_denied: 'permission denied',
 live: 'live', loaded: 'loaded', reconnecting: 'reconnecting…', waiting: 'waiting', demo_mode: 'demo',
 decrypt_fail: "couldn't read the save: {0} (the password may have changed in a game update)",
 gold: 'GOLD', per_hour: '/hour', calibrating: '(calibrating…)', current_stage: 'current stage',
 power: 'POWER', dps: 'DPS', ehp: 'EHP', party: 'PARTY', carry: 'damage carry',
 lvl: 'LVL', xp_to_next: 'to next', eta: 'ETA', unspent: '+{0} point', of_dps: '{0}% of party DPS',
 farming: 'FARMING · where to leave it', farm_now: 'NOW', farm_gold: '+GOLD', farm_exp: '+EXP',
 farm_push: 'PUSH', risky: 'risky — above your level', safe: 'safe', gph: '/h gold', xph: '/h exp',
 idle_title: 'IDLE · when to come back', idle_unlocked: 'offline unlocked', idle_locked: 'offline locked — get rune 11001',
 idle_full: 'full window', idle_comeback: 'come back at the cap (~{0}h)', idle_return_in: 'return in {0}',
 idle_at_cap: 'at the cap ', idle_linear: 'linear until the cap, then flat — no penalty for waiting',
 idle_park: 'park on {0} first (+{1}% gold) before logging off', idle_vs_active: 'idle is ~{0}× slower than playing',
 runes_title: 'RUNES · planner', runes_af: 'almost free', runes_next: 'recommended next',
 runes_cost: 'cost', runes_effect: 'effect', runes_secs: '{0}s of farm', runes_owned: 'owned',
 runes_first_dps: 'first DPS rune', runes_path: '{0} over {1} buys', runes_no_combat: 'you have no real combat runes yet',
 runes_combat: 'combat', runes_economy: 'economy', lv_short: 'Lv',
 gear_title: 'GEAR · advisor', gear_swap_q: 'worth swapping?', gear_yes: 'YES', gear_no: 'no',
 gear_noswap: 'best you own in every slot — no swap', gear_empty: 'empty', gear_current: 'current',
 gear_enchant: 'enchant your gear — {0} open slots, 0 used', gear_jewelry: '{0} empty jewelry slots — any drop is pure gain',
 gear_levelweapon: "level the {0}'s weapon — biggest power jump", dpower: 'ΔPOWER',
 actions_title: 'NEXT ACTIONS',
 a_af: 'Grab {0} almost-free runes now', a_switch: 'Move farm to {0}', a_push: 'Push toward {0} (lv {1})',
 a_dps: 'Buy the combat chain to {0} ({1}g) — your first real DPS', a_swap: 'Swap {0} gear slot(s)',
 a_jewelry: 'Fill {0} empty jewelry slots', a_carry: 'Prioritize {0} (your carry)',
 footer: '100% local · decrypts in your browser · nothing leaves your machine',
 lang: 'Language', interval: 'refresh',
 },
 'pt-BR': {
 tagline: 'otimize sua run — 100% local',
 connect: ' CONECTAR SAVE', reconnect: ' RECONECTAR', demo: 'ver demo',
 gate_pick: 'Aponte uma vez pro seu save e eu acompanho ao vivo enquanto você joga.',
 gate_reconnect: 'Reconecte ao seu save pra continuar acompanhando ao vivo (1 clique).',
 need_browser: 'Seu navegador não tem File System Access — use Chrome ou Edge (ou clique "ver demo").',
 perm_denied: 'permissão negada',
 live: 'ao vivo', loaded: 'carregado', reconnecting: 'reconectando…', waiting: 'aguardando', demo_mode: 'demo',
 decrypt_fail: 'não li o save: {0} (a senha pode ter trocado num update do jogo)',
 gold: 'OURO', per_hour: '/hora', calibrating: '(calibrando…)', current_stage: 'stage atual',
 power: 'PODER', dps: 'DPS', ehp: 'EHP', party: 'PARTY', carry: 'carregador de dano',
 lvl: 'NÍV', xp_to_next: 'pro próximo', eta: 'ETA', unspent: '+{0} ponto', of_dps: '{0}% do DPS da party',
 farming: 'FARM · onde deixar', farm_now: 'AGORA', farm_gold: '+OURO', farm_exp: '+EXP',
 farm_push: 'AVANÇAR', risky: 'arriscado — acima do seu nível', safe: 'seguro', gph: '/h ouro', xph: '/h exp',
 idle_title: 'IDLE · quando voltar', idle_unlocked: 'offline liberado', idle_locked: 'offline travado — pegue a runa 11001',
 idle_full: 'janela cheia', idle_comeback: 'volte no cap (~{0}h)', idle_return_in: 'volte em {0}',
 idle_at_cap: 'no cap ', idle_linear: 'linear até o cap, depois trava — sem penalidade por esperar',
 idle_park: 'estacione em {0} (+{1}% ouro) antes de deslogar', idle_vs_active: 'idle é ~{0}× mais lento que jogar',
 runes_title: 'RUNAS · planejador', runes_af: 'quase de graça', runes_next: 'próximas recomendadas',
 runes_cost: 'custo', runes_effect: 'efeito', runes_secs: '{0}s de farm', runes_owned: 'possui',
 runes_first_dps: 'primeira runa de DPS', runes_path: '{0} em {1} compras', runes_no_combat: 'você ainda não tem runas de combate de verdade',
 runes_combat: 'combate', runes_economy: 'economia', lv_short: 'Nv',
 gear_title: 'GEAR · conselheiro', gear_swap_q: 'vale trocar?', gear_yes: 'SIM', gear_no: 'não',
 gear_noswap: 'o melhor que você tem em todo slot — não troque', gear_empty: 'vazio', gear_current: 'atual',
 gear_enchant: 'encante seu gear — {0} slots abertos, 0 usados', gear_jewelry: '{0} slots de joia vazios — qualquer drop é ganho puro',
 gear_levelweapon: 'suba a arma do {0} — o maior salto de poder', dpower: 'ΔPODER',
 actions_title: 'PRÓXIMAS AÇÕES',
 a_af: 'Pegue {0} runas quase de graça agora', a_switch: 'Mude o farm pra {0}', a_push: 'Avance rumo a {0} (nv {1})',
 a_dps: 'Compre a cadeia de combate até {0} ({1} ouro) — seu primeiro DPS real', a_swap: 'Troque {0} slot(s) de gear',
 a_jewelry: 'Preencha {0} slots de joia vazios', a_carry: 'Priorize {0} (seu carry)',
 footer: '100% local · decripta no seu navegador · nada sai da sua máquina',
 lang: 'Idioma', interval: 'atualização',
 },
 'es-ES': {
 tagline: 'optimiza tu partida — 100% local',
 connect: ' CONECTAR PARTIDA', reconnect: ' RECONECTAR', demo: 'ver demo',
 gate_pick: 'Apúntame a tu partida una vez y la sigo en vivo mientras juegas.',
 gate_reconnect: 'Reconéctate a tu partida para seguir en vivo (1 clic).',
 need_browser: 'Tu navegador no tiene File System Access — usa Chrome o Edge (o pulsa "ver demo").',
 perm_denied: 'permiso denegado',
 live: 'en vivo', loaded: 'cargado', reconnecting: 'reconectando…', waiting: 'esperando', demo_mode: 'demo',
 decrypt_fail: 'no pude leer la partida: {0} (la contraseña pudo cambiar en una actualización)',
 gold: 'ORO', per_hour: '/hora', calibrating: '(calibrando…)', current_stage: 'fase actual',
 power: 'PODER', dps: 'DPS', ehp: 'EHP', party: 'GRUPO', carry: 'portador de daño',
 lvl: 'NIV', xp_to_next: 'al siguiente', eta: 'ETA', unspent: '+{0} punto', of_dps: '{0}% del DPS del grupo',
 farming: 'FARMEO · dónde dejarlo', farm_now: 'AHORA', farm_gold: '+ORO', farm_exp: '+EXP',
 farm_push: 'AVANZAR', risky: 'arriesgado — sobre tu nivel', safe: 'seguro', gph: '/h oro', xph: '/h exp',
 idle_title: 'INACTIVO · cuándo volver', idle_unlocked: 'sin conexión desbloqueado', idle_locked: 'sin conexión bloqueado — consigue la runa 11001',
 idle_full: 'ventana completa', idle_comeback: 'vuelve al tope (~{0}h)', idle_return_in: 'vuelve en {0}',
 idle_at_cap: 'al tope ', idle_linear: 'lineal hasta el tope, luego plano — sin penalización por esperar',
 idle_park: 'déjalo en {0} (+{1}% oro) antes de salir', idle_vs_active: 'inactivo es ~{0}× más lento que jugar',
 runes_title: 'RUNAS · planificador', runes_af: 'casi gratis', runes_next: 'próximas recomendadas',
 runes_cost: 'coste', runes_effect: 'efecto', runes_secs: '{0}s de farmeo', runes_owned: 'tienes',
 runes_first_dps: 'primera runa de DPS', runes_path: '{0} en {1} compras', runes_no_combat: 'aún no tienes runas de combate reales',
 runes_combat: 'combate', runes_economy: 'economía', lv_short: 'Nv',
 gear_title: 'EQUIPO · asesor', gear_swap_q: '¿vale cambiar?', gear_yes: 'SÍ', gear_no: 'no',
 gear_noswap: 'lo mejor que tienes en cada ranura — no cambies', gear_empty: 'vacío', gear_current: 'actual',
 gear_enchant: 'encanta tu equipo — {0} ranuras libres, 0 usadas', gear_jewelry: '{0} ranuras de joya vacías — cualquier drop es ganancia pura',
 gear_levelweapon: 'sube el arma de {0} — el mayor salto de poder', dpower: 'ΔPODER',
 actions_title: 'PRÓXIMAS ACCIONES',
 a_af: 'Consigue {0} runas casi gratis ya', a_switch: 'Mueve el farmeo a {0}', a_push: 'Avanza hacia {0} (niv {1})',
 a_dps: 'Compra la cadena de combate hasta {0} ({1} oro) — tu primer DPS real', a_swap: 'Cambia {0} ranura(s) de equipo',
 a_jewelry: 'Llena {0} ranuras de joya vacías', a_carry: 'Prioriza a {0} (tu portador)',
 footer: '100% local · descifra en tu navegador · nada sale de tu equipo',
 lang: 'Idioma', interval: 'actualización',
 },
 'fr-FR': {
 tagline: 'optimise ta partie — 100% local',
 connect: ' CONNECTER LA SAUVEGARDE', reconnect: ' RECONNECTER', demo: 'voir la démo',
 gate_pick: 'Indique-moi ta sauvegarde une fois et je la suis en direct pendant que tu joues.',
 gate_reconnect: 'Reconnecte ta sauvegarde pour continuer le suivi en direct (1 clic).',
 need_browser: "Ton navigateur n'a pas File System Access — utilise Chrome ou Edge (ou clique « voir la démo »).",
 perm_denied: 'permission refusée',
 live: 'en direct', loaded: 'chargé', reconnecting: 'reconnexion…', waiting: 'en attente', demo_mode: 'démo',
 decrypt_fail: "lecture impossible : {0} (le mot de passe a pu changer lors d'une mise à jour)",
 gold: 'OR', per_hour: '/heure', calibrating: '(calibrage…)', current_stage: 'niveau actuel',
 power: 'PUISSANCE', dps: 'DPS', ehp: 'PV eff.', party: 'ÉQUIPE', carry: 'porteur de dégâts',
 lvl: 'NIV', xp_to_next: 'au suivant', eta: 'ETA', unspent: '+{0} point', of_dps: '{0}% du DPS de l’équipe',
 farming: 'FARM · où le laisser', farm_now: 'ACTUEL', farm_gold: '+OR', farm_exp: '+EXP',
 farm_push: 'AVANCER', risky: 'risqué — au-dessus de ton niveau', safe: 'sûr', gph: '/h or', xph: '/h exp',
 idle_title: 'HORS-LIGNE · quand revenir', idle_unlocked: 'hors-ligne débloqué', idle_locked: 'hors-ligne verrouillé — obtiens la rune 11001',
 idle_full: 'fenêtre complète', idle_comeback: 'reviens au plafond (~{0}h)', idle_return_in: 'reviens dans {0}',
 idle_at_cap: 'au plafond ', idle_linear: 'linéaire jusqu’au plafond, puis plat — aucune pénalité',
 idle_park: 'laisse sur {0} (+{1}% or) avant de quitter', idle_vs_active: 'hors-ligne est ~{0}× plus lent que jouer',
 runes_title: 'RUNES · planificateur', runes_af: 'presque gratuit', runes_next: 'recommandées ensuite',
 runes_cost: 'coût', runes_effect: 'effet', runes_secs: '{0}s de farm', runes_owned: 'possédé',
 runes_first_dps: 'première rune DPS', runes_path: '{0} en {1} achats', runes_no_combat: 'tu n’as pas encore de vraies runes de combat',
 runes_combat: 'combat', runes_economy: 'économie', lv_short: 'Niv',
 gear_title: 'ÉQUIPEMENT · conseiller', gear_swap_q: 'vaut-il l’échange ?', gear_yes: 'OUI', gear_no: 'non',
 gear_noswap: 'le meilleur que tu possèdes partout — pas d’échange', gear_empty: 'vide', gear_current: 'actuel',
 gear_enchant: 'enchante ton équipement — {0} emplacements libres, 0 utilisés', gear_jewelry: '{0} emplacements de bijou vides — tout drop est un gain pur',
 gear_levelweapon: "améliore l'arme de {0} — le plus gros gain de puissance", dpower: 'ΔPUISS',
 actions_title: 'PROCHAINES ACTIONS',
 a_af: 'Prends {0} runes presque gratuites', a_switch: 'Déplace le farm vers {0}', a_push: 'Avance vers {0} (niv {1})',
 a_dps: 'Achète la chaîne de combat jusqu’à {0} ({1} or) — ton premier vrai DPS', a_swap: 'Change {0} emplacement(s) d’équipement',
 a_jewelry: 'Remplis {0} emplacements de bijou vides', a_carry: 'Priorise {0} (ton porteur)',
 footer: '100% local · déchiffre dans ton navigateur · rien ne quitte ta machine',
 lang: 'Langue', interval: 'rafraîchir',
 },
 'de-DE': {
 tagline: 'optimiere deinen Run — 100% lokal',
 connect: ' SPIELSTAND VERBINDEN', reconnect: ' NEU VERBINDEN', demo: 'Demo ansehen',
 gate_pick: 'Zeig mir einmal deinen Spielstand und ich verfolge ihn live, während du spielst.',
 gate_reconnect: 'Verbinde deinen Spielstand neu, um live weiterzuverfolgen (1 Klick).',
 need_browser: 'Dein Browser hat kein File System Access — nutze Chrome oder Edge (oder „Demo ansehen“).',
 perm_denied: 'Zugriff verweigert',
 live: 'live', loaded: 'geladen', reconnecting: 'verbinde neu…', waiting: 'warte', demo_mode: 'Demo',
 decrypt_fail: 'Spielstand nicht lesbar: {0} (das Passwort kann sich durch ein Update geändert haben)',
 gold: 'GOLD', per_hour: '/Stunde', calibrating: '(kalibriere…)', current_stage: 'aktuelles Level',
 power: 'STÄRKE', dps: 'DPS', ehp: 'eHP', party: 'GRUPPE', carry: 'Schadensträger',
 lvl: 'STUFE', xp_to_next: 'bis nächste', eta: 'ETA', unspent: '+{0} Punkt', of_dps: '{0}% des Gruppen-DPS',
 farming: 'FARMEN · wo lassen', farm_now: 'JETZT', farm_gold: '+GOLD', farm_exp: '+EXP',
 farm_push: 'VORSTOSS', risky: 'riskant — über deinem Level', safe: 'sicher', gph: '/h Gold', xph: '/h Exp',
 idle_title: 'OFFLINE · wann zurück', idle_unlocked: 'Offline freigeschaltet', idle_locked: 'Offline gesperrt — hol Rune 11001',
 idle_full: 'volles Fenster', idle_comeback: 'komm beim Limit zurück (~{0}h)', idle_return_in: 'zurück in {0}',
 idle_at_cap: 'am Limit ', idle_linear: 'linear bis zum Limit, dann flach — keine Strafe fürs Warten',
 idle_park: 'parke auf {0} (+{1}% Gold) vor dem Ausloggen', idle_vs_active: 'Offline ist ~{0}× langsamer als Spielen',
 runes_title: 'RUNEN · Planer', runes_af: 'fast gratis', runes_next: 'als Nächstes empfohlen',
 runes_cost: 'Kosten', runes_effect: 'Effekt', runes_secs: '{0}s Farmen', runes_owned: 'besitzt',
 runes_first_dps: 'erste DPS-Rune', runes_path: '{0} in {1} Käufen', runes_no_combat: 'du hast noch keine echten Kampfrunen',
 runes_combat: 'Kampf', runes_economy: 'Wirtschaft', lv_short: 'St',
 gear_title: 'AUSRÜSTUNG · Berater', gear_swap_q: 'Tausch lohnt sich?', gear_yes: 'JA', gear_no: 'nein',
 gear_noswap: 'das Beste, das du hast, in jedem Slot — kein Tausch', gear_empty: 'leer', gear_current: 'aktuell',
 gear_enchant: 'verzaubere deine Ausrüstung — {0} freie Slots, 0 genutzt', gear_jewelry: '{0} leere Schmuck-Slots — jeder Drop ist reiner Gewinn',
 gear_levelweapon: 'levle die Waffe von {0} — größter Stärkesprung', dpower: 'ΔSTÄRKE',
 actions_title: 'NÄCHSTE SCHRITTE',
 a_af: 'Hol {0} fast gratis Runen', a_switch: 'Farm zu {0} wechseln', a_push: 'Stoß vor zu {0} (St {1})',
 a_dps: 'Kauf die Kampfkette bis {0} ({1} Gold) — dein erster echter DPS', a_swap: 'Tausche {0} Ausrüstungs-Slot(s)',
 a_jewelry: 'Fülle {0} leere Schmuck-Slots', a_carry: 'Priorisiere {0} (dein Carry)',
 footer: '100% lokal · entschlüsselt im Browser · nichts verlässt deinen Rechner',
 lang: 'Sprache', interval: 'Aktualisierung',
 },
 'ja-JP': {
 tagline: 'プレイを最適化 — 100%ローカル',
 connect: ' セーブを接続', reconnect: ' 再接続', demo: 'デモを見る',
 gate_pick: 'セーブを一度指定すれば、プレイ中にライブで追跡します。',
 gate_reconnect: 'ライブ追跡を続けるにはセーブを再接続してください（1クリック）。',
 need_browser: 'このブラウザは File System Access 非対応です — Chrome か Edge を使ってください（または「デモを見る」）。',
 perm_denied: '許可が拒否されました',
 live: 'ライブ', loaded: '読み込み済み', reconnecting: '再接続中…', waiting: '待機中', demo_mode: 'デモ',
 decrypt_fail: 'セーブを読めません: {0}（アップデートでパスワードが変わった可能性があります）',
 gold: 'ゴールド', per_hour: '/時', calibrating: '(計測中…)', current_stage: '現在のステージ',
 power: '戦闘力', dps: 'DPS', ehp: '実効HP', party: 'パーティ', carry: '主力アタッカー',
 lvl: 'Lv', xp_to_next: '次まで', eta: '到達', unspent: '+{0} ポイント', of_dps: 'パーティDPSの{0}%',
 farming: '周回 · どこで放置', farm_now: '現在', farm_gold: '+金', farm_exp: '+経験',
 farm_push: '挑戦', risky: '危険 — レベル超過', safe: '安全', gph: '/時 金', xph: '/時 経験',
 idle_title: '放置 · いつ戻る', idle_unlocked: '放置報酬 解放済', idle_locked: '放置報酬 未解放 — ルーン11001を取得',
 idle_full: '満タン', idle_comeback: '上限(~{0}時間)で戻る', idle_return_in: '{0}後に戻る',
 idle_at_cap: '上限到達 ', idle_linear: '上限まで一定、その後は頭打ち — 待っても損なし',
 idle_park: 'ログアウト前に {0} に放置(+{1}% 金)', idle_vs_active: '放置はプレイの約{0}倍遅い',
 runes_title: 'ルーン · プランナー', runes_af: 'ほぼ無料', runes_next: '次のおすすめ',
 runes_cost: 'コスト', runes_effect: '効果', runes_secs: '周回{0}秒', runes_owned: '所持',
 runes_first_dps: '最初のDPSルーン', runes_path: '{1}回で{0}', runes_no_combat: 'まだ本物の戦闘ルーンがありません',
 runes_combat: '戦闘', runes_economy: '経済', lv_short: 'Lv',
 gear_title: '装備 · アドバイザー', gear_swap_q: '替える価値は？', gear_yes: 'はい', gear_no: 'いいえ',
 gear_noswap: '全スロットで所持最強 — 交換不要', gear_empty: '空き', gear_current: '現在',
 gear_enchant: '装備にエンチャント — 空きスロット{0}、使用0', gear_jewelry: '装飾品スロット{0}個が空き — ドロップは全部得',
 gear_levelweapon: '{0}の武器を強化 — 最大の戦闘力アップ', dpower: 'Δ戦闘力',
 actions_title: '次の行動',
 a_af: 'ほぼ無料ルーンを{0}個入手', a_switch: '周回を{0}へ変更', a_push: '{0}(Lv{1})へ挑戦',
 a_dps: '{0}まで戦闘ルーンを購入({1}金) — 初の本物DPS', a_swap: '装備{0}枠を交換',
 a_jewelry: '空き装飾枠{0}個を埋める', a_carry: '{0}(主力)を優先',
 footer: '100%ローカル · ブラウザ内で復号 · 何もマシンの外に出ません',
 lang: '言語', interval: '更新',
 },
 'ko-KR': {
 tagline: '플레이 최적화 — 100% 로컬',
 connect: ' 세이브 연결', reconnect: ' 재연결', demo: '데모 보기',
 gate_pick: '세이브를 한 번만 지정하면 플레이 중 실시간으로 추적합니다.',
 gate_reconnect: '실시간 추적을 계속하려면 세이브를 재연결하세요 (1클릭).',
 need_browser: '이 브라우저는 File System Access를 지원하지 않습니다 — Chrome이나 Edge를 사용하세요(또는 "데모 보기").',
 perm_denied: '권한 거부됨',
 live: '실시간', loaded: '불러옴', reconnecting: '재연결 중…', waiting: '대기 중', demo_mode: '데모',
 decrypt_fail: '세이브를 읽을 수 없음: {0} (업데이트로 비밀번호가 바뀌었을 수 있음)',
 gold: '골드', per_hour: '/시간', calibrating: '(보정 중…)', current_stage: '현재 스테이지',
 power: '전투력', dps: 'DPS', ehp: '유효 HP', party: '파티', carry: '딜 캐리',
 lvl: 'Lv', xp_to_next: '다음까지', eta: '도달', unspent: '+{0} 포인트', of_dps: '파티 DPS의 {0}%',
 farming: '파밍 · 어디에 둘까', farm_now: '현재', farm_gold: '+골드', farm_exp: '+경험',
 farm_push: '도전', risky: '위험 — 레벨 초과', safe: '안전', gph: '/h 골드', xph: '/h 경험',
 idle_title: '방치 · 언제 돌아올까', idle_unlocked: '오프라인 해금', idle_locked: '오프라인 잠김 — 룬 11001 획득',
 idle_full: '최대치', idle_comeback: '상한(~{0}h)에 돌아오기', idle_return_in: '{0} 후 복귀',
 idle_at_cap: '상한 도달 ', idle_linear: '상한까지 선형, 이후 평탄 — 기다려도 손해 없음',
 idle_park: '로그아웃 전 {0}에 방치(+{1}% 골드)', idle_vs_active: '방치는 플레이보다 약 {0}배 느림',
 runes_title: '룬 · 플래너', runes_af: '거의 무료', runes_next: '다음 추천',
 runes_cost: '비용', runes_effect: '효과', runes_secs: '파밍 {0}초', runes_owned: '보유',
 runes_first_dps: '첫 DPS 룬', runes_path: '{1}회로 {0}', runes_no_combat: '아직 진짜 전투 룬이 없습니다',
 runes_combat: '전투', runes_economy: '경제', lv_short: 'Lv',
 gear_title: '장비 · 조언', gear_swap_q: '교체 가치?', gear_yes: '예', gear_no: '아니오',
 gear_noswap: '모든 슬롯에서 보유 최강 — 교체 불필요', gear_empty: '빈칸', gear_current: '현재',
 gear_enchant: '장비 인챈트 — 빈 슬롯 {0}개, 사용 0', gear_jewelry: '장신구 슬롯 {0}개 비어 있음 — 드롭은 전부 이득',
 gear_levelweapon: '{0}의 무기를 강화 — 최대 전투력 상승', dpower: 'Δ전투력',
 actions_title: '다음 행동',
 a_af: '거의 무료 룬 {0}개 획득', a_switch: '파밍을 {0}(으)로 변경', a_push: '{0}(Lv {1})로 도전',
 a_dps: '{0}까지 전투 체인 구매({1} 골드) — 첫 진짜 DPS', a_swap: '장비 {0}칸 교체',
 a_jewelry: '빈 장신구 {0}칸 채우기', a_carry: '{0}(캐리) 우선',
 footer: '100% 로컬 · 브라우저에서 복호화 · 아무것도 기기를 벗어나지 않음',
 lang: '언어', interval: '새로고침',
 },
 'zh-Hans': {
 tagline: '优化你的进度 — 100% 本地',
 connect: ' 连接存档', reconnect: ' 重新连接', demo: '查看演示',
 gate_pick: '指给我你的存档一次，我会在你游玩时实时追踪。',
 gate_reconnect: '重新连接存档以继续实时追踪（1 次点击）。',
 need_browser: '你的浏览器不支持 File System Access — 请使用 Chrome 或 Edge（或点击"查看演示"）。',
 perm_denied: '权限被拒绝',
 live: '实时', loaded: '已加载', reconnecting: '重新连接中…', waiting: '等待中', demo_mode: '演示',
 decrypt_fail: '无法读取存档：{0}（更新可能更改了密码）',
 gold: '金币', per_hour: '/小时', calibrating: '(校准中…)', current_stage: '当前关卡',
 power: '战力', dps: 'DPS', ehp: '有效HP', party: '队伍', carry: '主输出',
 lvl: '等级', xp_to_next: '距下一级', eta: '预计', unspent: '+{0} 点', of_dps: '占队伍DPS的{0}%',
 farming: '刷怪 · 留在哪', farm_now: '当前', farm_gold: '+金', farm_exp: '+经验',
 farm_push: '推进', risky: '危险 — 超出等级', safe: '安全', gph: '/h 金', xph: '/h 经验',
 idle_title: '挂机 · 何时回来', idle_unlocked: '离线已解锁', idle_locked: '离线未解锁 — 获取符文 11001',
 idle_full: '满额', idle_comeback: '到上限(~{0}小时)再回来', idle_return_in: '{0}后回来',
 idle_at_cap: '已达上限 ', idle_linear: '到上限前线性，之后封顶 — 等待无惩罚',
 idle_park: '下线前停在 {0}(+{1}% 金)', idle_vs_active: '挂机比游玩慢约{0}倍',
 runes_title: '符文 · 规划', runes_af: '几乎免费', runes_next: '下一步推荐',
 runes_cost: '花费', runes_effect: '效果', runes_secs: '刷{0}秒', runes_owned: '已有',
 runes_first_dps: '第一个DPS符文', runes_path: '{1}次购买共{0}', runes_no_combat: '你还没有真正的战斗符文',
 runes_combat: '战斗', runes_economy: '经济', lv_short: 'Lv',
 gear_title: '装备 · 顾问', gear_swap_q: '值得更换吗？', gear_yes: '是', gear_no: '否',
 gear_noswap: '每个槽位都已是你最好的 — 无需更换', gear_empty: '空', gear_current: '当前',
 gear_enchant: '附魔你的装备 — {0} 个空槽，已用 0', gear_jewelry: '{0} 个首饰槽为空 — 任何掉落都是纯收益',
 gear_levelweapon: '升级 {0} 的武器 — 最大战力提升', dpower: 'Δ战力',
 actions_title: '下一步行动',
 a_af: '立即获取 {0} 个几乎免费的符文', a_switch: '把刷怪改到 {0}', a_push: '推进到 {0}(等级 {1})',
 a_dps: '购买战斗链直到 {0}({1} 金) — 你的第一个真实DPS', a_swap: '更换 {0} 个装备槽',
 a_jewelry: '填满 {0} 个空首饰槽', a_carry: '优先 {0}(你的主C)',
 footer: '100% 本地 · 在你的浏览器解密 · 不向外发送任何数据',
 lang: '语言', interval: '刷新',
 },
 'zh-Hant': {
 tagline: '優化你的進度 — 100% 本地',
 connect: ' 連接存檔', reconnect: ' 重新連接', demo: '查看示範',
 gate_pick: '指給我你的存檔一次，我會在你遊玩時即時追蹤。',
 gate_reconnect: '重新連接存檔以繼續即時追蹤（1 次點擊）。',
 need_browser: '你的瀏覽器不支援 File System Access — 請使用 Chrome 或 Edge（或點擊「查看示範」）。',
 perm_denied: '權限被拒絕',
 live: '即時', loaded: '已載入', reconnecting: '重新連接中…', waiting: '等待中', demo_mode: '示範',
 decrypt_fail: '無法讀取存檔：{0}（更新可能更改了密碼）',
 gold: '金幣', per_hour: '/小時', calibrating: '(校準中…)', current_stage: '目前關卡',
 power: '戰力', dps: 'DPS', ehp: '有效HP', party: '隊伍', carry: '主輸出',
 lvl: '等級', xp_to_next: '距下一級', eta: '預計', unspent: '+{0} 點', of_dps: '佔隊伍DPS的{0}%',
 farming: '刷怪 · 留在哪', farm_now: '目前', farm_gold: '+金', farm_exp: '+經驗',
 farm_push: '推進', risky: '危險 — 超出等級', safe: '安全', gph: '/h 金', xph: '/h 經驗',
 idle_title: '掛機 · 何時回來', idle_unlocked: '離線已解鎖', idle_locked: '離線未解鎖 — 取得符文 11001',
 idle_full: '滿額', idle_comeback: '到上限(~{0}小時)再回來', idle_return_in: '{0}後回來',
 idle_at_cap: '已達上限 ', idle_linear: '到上限前線性，之後封頂 — 等待無懲罰',
 idle_park: '下線前停在 {0}(+{1}% 金)', idle_vs_active: '掛機比遊玩慢約{0}倍',
 runes_title: '符文 · 規劃', runes_af: '幾乎免費', runes_next: '下一步推薦',
 runes_cost: '花費', runes_effect: '效果', runes_secs: '刷{0}秒', runes_owned: '已有',
 runes_first_dps: '第一個DPS符文', runes_path: '{1}次購買共{0}', runes_no_combat: '你還沒有真正的戰鬥符文',
 runes_combat: '戰鬥', runes_economy: '經濟', lv_short: 'Lv',
 gear_title: '裝備 · 顧問', gear_swap_q: '值得更換嗎？', gear_yes: '是', gear_no: '否',
 gear_noswap: '每個槽位都已是你最好的 — 無需更換', gear_empty: '空', gear_current: '目前',
 gear_enchant: '附魔你的裝備 — {0} 個空槽，已用 0', gear_jewelry: '{0} 個首飾槽為空 — 任何掉落都是純收益',
 gear_levelweapon: '升級 {0} 的武器 — 最大戰力提升', dpower: 'Δ戰力',
 actions_title: '下一步行動',
 a_af: '立即取得 {0} 個幾乎免費的符文', a_switch: '把刷怪改到 {0}', a_push: '推進到 {0}(等級 {1})',
 a_dps: '購買戰鬥鏈直到 {0}({1} 金) — 你的第一個真實DPS', a_swap: '更換 {0} 個裝備槽',
 a_jewelry: '填滿 {0} 個空首飾槽', a_carry: '優先 {0}(你的主C)',
 footer: '100% 本地 · 在你的瀏覽器解密 · 不向外傳送任何資料',
 lang: '語言', interval: '刷新',
 },
 'ru-RU': {
 tagline: 'оптимизируй прохождение — 100% локально',
 connect: ' ПОДКЛЮЧИТЬ СОХРАНЕНИЕ', reconnect: ' ПЕРЕПОДКЛЮЧИТЬ', demo: 'демо',
 gate_pick: 'Укажи сохранение один раз — и я отслеживаю его вживую, пока ты играешь.',
 gate_reconnect: 'Переподключи сохранение, чтобы продолжить отслеживание (1 клик).',
 need_browser: 'Браузер не поддерживает File System Access — используй Chrome или Edge (или «демо»).',
 perm_denied: 'доступ запрещён',
 live: 'вживую', loaded: 'загружено', reconnecting: 'переподключение…', waiting: 'ожидание', demo_mode: 'демо',
 decrypt_fail: 'не удалось прочитать сохранение: {0} (пароль мог измениться после обновления)',
 gold: 'ЗОЛОТО', per_hour: '/час', calibrating: '(калибровка…)', current_stage: 'текущий этап',
 power: 'СИЛА', dps: 'DPS', ehp: 'эХП', party: 'ОТРЯД', carry: 'основной урон',
 lvl: 'УР', xp_to_next: 'до следующего', eta: 'ETA', unspent: '+{0} очко', of_dps: '{0}% урона отряда',
 farming: 'ФАРМ · где оставить', farm_now: 'СЕЙЧАС', farm_gold: '+ЗОЛ', farm_exp: '+ОПЫТ',
 farm_push: 'ПРОДВИНУТЬСЯ', risky: 'рискованно — выше уровня', safe: 'безопасно', gph: '/ч золото', xph: '/ч опыт',
 idle_title: 'ОФЛАЙН · когда вернуться', idle_unlocked: 'офлайн разблокирован', idle_locked: 'офлайн закрыт — получи руну 11001',
 idle_full: 'полное окно', idle_comeback: 'вернись на пределе (~{0}ч)', idle_return_in: 'вернись через {0}',
 idle_at_cap: 'на пределе ', idle_linear: 'линейно до предела, затем плато — ждать не штрафуется',
 idle_park: 'перед выходом оставь на {0} (+{1}% золота)', idle_vs_active: 'офлайн ~в {0}× медленнее игры',
 runes_title: 'РУНЫ · планировщик', runes_af: 'почти бесплатно', runes_next: 'рекомендуется далее',
 runes_cost: 'цена', runes_effect: 'эффект', runes_secs: '{0}с фарма', runes_owned: 'есть',
 runes_first_dps: 'первая руна урона', runes_path: '{0} за {1} покупок', runes_no_combat: 'у тебя пока нет настоящих боевых рун',
 runes_combat: 'бой', runes_economy: 'экономика', lv_short: 'Ур',
 gear_title: 'СНАРЯЖЕНИЕ · советник', gear_swap_q: 'стоит менять?', gear_yes: 'ДА', gear_no: 'нет',
 gear_noswap: 'лучшее из твоего в каждом слоте — замена не нужна', gear_empty: 'пусто', gear_current: 'текущее',
 gear_enchant: 'зачаруй снаряжение — {0} свободных слотов, 0 занято', gear_jewelry: '{0} пустых слотов украшений — любой дроп в плюс',
 gear_levelweapon: 'прокачай оружие {0} — наибольший прирост силы', dpower: 'ΔСИЛА',
 actions_title: 'СЛЕДУЮЩИЕ ДЕЙСТВИЯ',
 a_af: 'Возьми {0} почти бесплатных рун', a_switch: 'Перенеси фарм на {0}', a_push: 'Продвинься к {0} (ур {1})',
 a_dps: 'Купи боевую цепочку до {0} ({1} золота) — твой первый реальный DPS', a_swap: 'Замени {0} слот(ов) снаряжения',
 a_jewelry: 'Заполни {0} пустых слотов украшений', a_carry: 'Приоритет {0} (твой кэрри)',
 footer: '100% локально · расшифровка в браузере · ничего не покидает устройство',
 lang: 'Язык', interval: 'обновление',
 },
 };

 const NEW = {
 'en-US': {
 tab_overview: 'Overview', tab_heroes: 'Heroes', tab_farm: 'Farm', tab_runes: 'Runes', tab_gear: 'Gear',
 do_now: 'What to do now', summary: 'summary', skills_label: 'skills', equipped: 'equipped',
 farm_recommend: 'recommended', farm_onbest: "you're on the best stage ", farm_move_up: 'move up to here',
 farm_clear: 'clear time', farm_drops: 'best drops + gold here',
 tree_legend: 'legend', tree_fit: 'fit', tree_reset: 'reset', tree_zoomhint: 'drag to pan · scroll to zoom',
 tree_open: 'open full tree', tree_title: 'rune tree',
 cat_combat: 'combat', cat_gold: 'gold', cat_exp: 'exp', cat_offline: 'offline', cat_loot: 'loot', cat_qol: 'utility',
 st_owned: 'owned', st_recommended: 'recommended', st_important: 'important', st_almostfree: 'almost free',
 st_skip: 'skip (overpriced)', st_locked: 'locked', st_maxed: 'maxed', st_available: 'available',
 node_lv: 'Lv {0}/{1}', node_cost: 'next', node_locked: 'unlock the previous node first',
 a_tank: 'Field the {0} as a tank — your party has no front-line',
 a_enchant: 'Enchant {0} open affix slots — your biggest gear lever (all empty)',
 a_synthesis: 'Synthesize spare {1} gear a higher grade',
 a_pet: 'Equip a better pet for your goal',
 comp_title: 'party composition', comp_notank: 'no tank squishy front line', comp_hastank: 'front line covered ', comp_solo: 'solo build · one hero',
 surv_push: 'push readiness', surv_comfortable: 'ready ', surv_tight: 'tight', surv_risky: 'risky — need more EHP/DPS',
 role_tank: 'tank', role_bruiser: 'bruiser', role_support: 'support', role_dps: 'dps', role_caster: 'caster', fielded: 'in party',
 },
 'pt-BR': {
 tab_overview: 'Visão Geral', tab_heroes: 'Heróis', tab_farm: 'Farm', tab_runes: 'Runas', tab_gear: 'Gear',
 do_now: 'O que fazer agora', summary: 'resumo', skills_label: 'habilidades', equipped: 'equipado',
 farm_recommend: 'recomendado', farm_onbest: 'você está no melhor stage ', farm_move_up: 'suba pra cá',
 farm_clear: 'tempo de clear', farm_drops: 'melhores drops + ouro aqui',
 tree_legend: 'legenda', tree_fit: 'ajustar', tree_reset: 'resetar', tree_zoomhint: 'arraste pra mover · scroll pra zoom',
 tree_open: 'abrir árvore', tree_title: 'árvore de runas',
 cat_combat: 'combate', cat_gold: 'ouro', cat_exp: 'exp', cat_offline: 'offline', cat_loot: 'loot', cat_qol: 'utilidade',
 st_owned: 'possui', st_recommended: 'recomendado', st_important: 'importante', st_almostfree: 'quase de graça',
 st_skip: 'pular (caro demais)', st_locked: 'travado', st_maxed: 'no máximo', st_available: 'disponível',
 node_lv: 'Nv {0}/{1}', node_cost: 'próx', node_locked: 'desbloqueie o nó anterior',
 a_tank: 'Coloque o {0} de tank — sua party não tem linha de frente',
 a_enchant: 'Encante {0} slots de affixe vazios — sua maior alavanca de gear (todos vazios)',
 a_synthesis: 'Funda o gear {1} sobrando um grade acima',
 a_pet: 'Equipe um pet melhor pro seu objetivo',
 comp_title: 'composição da party', comp_notank: 'sem tank frente frágil', comp_hastank: 'linha de frente coberta ', comp_solo: 'build solo · 1 herói',
 surv_push: 'prontidão pro push', surv_comfortable: 'pronto ', surv_tight: 'apertado', surv_risky: 'arriscado — precisa de mais EHP/DPS',
 role_tank: 'tank', role_bruiser: 'bruiser', role_support: 'suporte', role_dps: 'dano', role_caster: 'mago', fielded: 'na party',
 },
 'es-ES': { tab_overview: 'Resumen', tab_heroes: 'Héroes', tab_farm: 'Farmeo', tab_runes: 'Runas', tab_gear: 'Equipo',
 do_now: 'Qué hacer ahora', skills_label: 'habilidades', equipped: 'equipado', farm_recommend: 'recomendado',
 farm_onbest: 'estás en la mejor fase ', farm_move_up: 'sube aquí', tree_legend: 'leyenda', tree_open: 'abrir árbol',
 tree_title: 'árbol de runas', tree_zoomhint: 'arrastra · rueda para zoom', cat_combat: 'combate', cat_gold: 'oro',
 cat_exp: 'exp', cat_offline: 'sin conexión', cat_loot: 'botín', cat_qol: 'utilidad', st_owned: 'tienes',
 st_recommended: 'recomendado', st_important: 'importante', st_almostfree: 'casi gratis', st_skip: 'omitir',
 st_locked: 'bloqueado', st_maxed: 'al máximo', st_available: 'disponible', node_lv: 'Nv {0}/{1}', node_cost: 'sig' },
 'fr-FR': { tab_overview: "Vue d'ensemble", tab_heroes: 'Héros', tab_farm: 'Farm', tab_runes: 'Runes', tab_gear: 'Équipement',
 do_now: 'Que faire maintenant', skills_label: 'compétences', equipped: 'équipé', farm_recommend: 'recommandé',
 farm_onbest: 'tu es au meilleur niveau ', farm_move_up: 'monte ici', tree_legend: 'légende', tree_open: "ouvrir l'arbre",
 tree_title: 'arbre de runes', tree_zoomhint: 'glisser · molette pour zoomer', cat_combat: 'combat', cat_gold: 'or',
 cat_exp: 'exp', cat_offline: 'hors-ligne', cat_loot: 'butin', cat_qol: 'utilité', st_owned: 'possédé',
 st_recommended: 'recommandé', st_important: 'important', st_almostfree: 'presque gratuit', st_skip: 'ignorer',
 st_locked: 'verrouillé', st_maxed: 'au max', st_available: 'disponible', node_lv: 'Niv {0}/{1}', node_cost: 'suiv' },
 'de-DE': { tab_overview: 'Übersicht', tab_heroes: 'Helden', tab_farm: 'Farmen', tab_runes: 'Runen', tab_gear: 'Ausrüstung',
 do_now: 'Was jetzt tun', skills_label: 'Fähigkeiten', equipped: 'ausgerüstet', farm_recommend: 'empfohlen',
 farm_onbest: 'du bist im besten Level ', farm_move_up: 'hierher wechseln', tree_legend: 'Legende', tree_open: 'Baum öffnen',
 tree_title: 'Runenbaum', tree_zoomhint: 'ziehen · scrollen zum Zoomen', cat_combat: 'Kampf', cat_gold: 'Gold',
 cat_exp: 'Exp', cat_offline: 'Offline', cat_loot: 'Beute', cat_qol: 'Nutzen', st_owned: 'besitzt',
 st_recommended: 'empfohlen', st_important: 'wichtig', st_almostfree: 'fast gratis', st_skip: 'überspringen',
 st_locked: 'gesperrt', st_maxed: 'max', st_available: 'verfügbar', node_lv: 'St {0}/{1}', node_cost: 'nächste' },
 'ja-JP': { tab_overview: '概要', tab_heroes: 'ヒーロー', tab_farm: '周回', tab_runes: 'ルーン', tab_gear: '装備',
 do_now: '今やること', skills_label: 'スキル', equipped: '装備中', farm_recommend: 'おすすめ',
 farm_onbest: '最適なステージです ', farm_move_up: 'ここへ上げる', tree_legend: '凡例', tree_open: 'ツリーを開く',
 tree_title: 'ルーンツリー', tree_zoomhint: 'ドラッグで移動・スクロールで拡大', cat_combat: '戦闘', cat_gold: '金',
 cat_exp: '経験', cat_offline: '放置', cat_loot: '戦利品', cat_qol: '利便', st_owned: '所持',
 st_recommended: 'おすすめ', st_important: '重要', st_almostfree: 'ほぼ無料', st_skip: 'スキップ',
 st_locked: 'ロック', st_maxed: '最大', st_available: '取得可', node_lv: 'Lv {0}/{1}', node_cost: '次' },
 'ko-KR': { tab_overview: '개요', tab_heroes: '영웅', tab_farm: '파밍', tab_runes: '룬', tab_gear: '장비',
 do_now: '지금 할 일', skills_label: '스킬', equipped: '장착됨', farm_recommend: '추천',
 farm_onbest: '최적의 스테이지입니다 ', farm_move_up: '여기로 올리기', tree_legend: '범례', tree_open: '트리 열기',
 tree_title: '룬 트리', tree_zoomhint: '드래그로 이동 · 스크롤로 확대', cat_combat: '전투', cat_gold: '골드',
 cat_exp: '경험', cat_offline: '방치', cat_loot: '전리품', cat_qol: '편의', st_owned: '보유',
 st_recommended: '추천', st_important: '중요', st_almostfree: '거의 무료', st_skip: '건너뛰기',
 st_locked: '잠김', st_maxed: '최대', st_available: '가능', node_lv: 'Lv {0}/{1}', node_cost: '다음' },
 'zh-Hans': { tab_overview: '概览', tab_heroes: '英雄', tab_farm: '刷怪', tab_runes: '符文', tab_gear: '装备',
 do_now: '现在该做什么', skills_label: '技能', equipped: '已装备', farm_recommend: '推荐',
 farm_onbest: '你在最佳关卡 ', farm_move_up: '升到这里', tree_legend: '图例', tree_open: '打开符文树',
 tree_title: '符文树', tree_zoomhint: '拖动平移 · 滚轮缩放', cat_combat: '战斗', cat_gold: '金币',
 cat_exp: '经验', cat_offline: '离线', cat_loot: '掉落', cat_qol: '便利', st_owned: '已有',
 st_recommended: '推荐', st_important: '重要', st_almostfree: '几乎免费', st_skip: '跳过',
 st_locked: '锁定', st_maxed: '满级', st_available: '可获取', node_lv: 'Lv {0}/{1}', node_cost: '下一级' },
 'zh-Hant': { tab_overview: '概覽', tab_heroes: '英雄', tab_farm: '刷怪', tab_runes: '符文', tab_gear: '裝備',
 do_now: '現在該做什麼', skills_label: '技能', equipped: '已裝備', farm_recommend: '推薦',
 farm_onbest: '你在最佳關卡 ', farm_move_up: '升到這裡', tree_legend: '圖例', tree_open: '打開符文樹',
 tree_title: '符文樹', tree_zoomhint: '拖動平移 · 滾輪縮放', cat_combat: '戰鬥', cat_gold: '金幣',
 cat_exp: '經驗', cat_offline: '離線', cat_loot: '掉落', cat_qol: '便利', st_owned: '已有',
 st_recommended: '推薦', st_important: '重要', st_almostfree: '幾乎免費', st_skip: '跳過',
 st_locked: '鎖定', st_maxed: '滿級', st_available: '可獲取', node_lv: 'Lv {0}/{1}', node_cost: '下一級' },
 'ru-RU': { tab_overview: 'Обзор', tab_heroes: 'Герои', tab_farm: 'Фарм', tab_runes: 'Руны', tab_gear: 'Снаряжение',
 do_now: 'Что делать сейчас', skills_label: 'навыки', equipped: 'надето', farm_recommend: 'рекомендуется',
 farm_onbest: 'ты на лучшем этапе ', farm_move_up: 'перейти сюда', tree_legend: 'легенда', tree_open: 'открыть дерево',
 tree_title: 'дерево рун', tree_zoomhint: 'тащи · колесо для зума', cat_combat: 'бой', cat_gold: 'золото',
 cat_exp: 'опыт', cat_offline: 'офлайн', cat_loot: 'добыча', cat_qol: 'удобство', st_owned: 'есть',
 st_recommended: 'рекомендуется', st_important: 'важно', st_almostfree: 'почти даром', st_skip: 'пропустить',
 st_locked: 'закрыто', st_maxed: 'максимум', st_available: 'доступно', node_lv: 'Ур {0}/{1}', node_cost: 'след' },
 };
 for (const l in NEW) { UI[l] = Object.assign(UI[l] || {}, NEW[l]); }

 const FARM = {
 'en-US': { f_level: 'level', f_stage: 'STAGE', f_clear: 'CLEAR', f_unlock: 'UNLOCK', f_surv: 'surv.', f_calfit: 'calibrated from your real times across {0} stages', f_calone: 'calibrating — farm another stage to lock in the distant ones', f_calnone: 'play a few seconds to calibrate', tab_hist: 'History', d_normal: 'Normal', d_nightmare: 'Nightmare', d_hell: 'Hell', d_torment: 'Torment', f_caledit: 'your clear times', f_caltime: 'seconds', f_caladd: 'add', f_calmax: 'max', f_calextra: 'refine', f_vlevel: 'Level', f_vgold: 'Gold', f_projnote: 'estimate · fill your clear times above to make it exact', f_calhint: 'real clear time in seconds · 2+ stages', f_calman: 'calibrated from your {0} entered clear times', f_stages: 'STAGES', f_calneed: '1 entered — add one more stage to apply', refresh_save: 'Re-read the save now', gsl_pre: 'enable up to', gsl_off: 'all', gsl_n: 'nodes', hist_power: 'HISTORY · POWER', hist_gold: 'HISTORY · GOLD', hist_note: 'Builds up as you play.', hist_pow_sum: '{0} samples · POWER {1} → {2} ({3})', hist_gold_sum: 'gold {0} → {1}', hist_collecting: 'Collecting… leave it open while you play.', refreshed: 'Reloaded', refresh_savedat: 'save from {0}', refresh_nosync: "Out of sync? The game hasn't written its save yet." },
 'pt-BR': { f_level: 'nível', f_stage: 'ESTÁGIO', f_clear: 'CLEAR', f_unlock: 'DESTRAVAR', f_surv: 'sobrev.', f_calfit: 'calibrado pelos seus tempos reais em {0} estágios', f_calone: 'calibrando — farme outro estágio pra cravar os distantes', f_calnone: 'jogue uns segundos pra calibrar', tab_hist: 'Histórico', d_normal: 'Normal', d_nightmare: 'Pesadelo', d_hell: 'Inferno', d_torment: 'Tormento', f_caledit: 'seus tempos de clear', f_caltime: 'segundos', f_caladd: 'add', f_calmax: 'máx', f_calextra: 'refinar', f_vlevel: 'Nível', f_vgold: 'Gold', f_projnote: 'estimativa · preencha seus tempos de clear acima pra cravar', f_calhint: 'tempo real de clear em segundos · 2+ estágios', f_calman: 'calibrado pelos seus {0} tempos digitados', f_stages: 'ESTÁGIOS', f_calneed: '1 adicionado — bote mais um estágio pra aplicar', refresh_save: 'Reler o save agora', gsl_pre: 'habilitar até', gsl_off: 'tudo', gsl_n: 'nós', hist_power: 'HISTÓRICO · POWER', hist_gold: 'HISTÓRICO · GOLD', hist_note: 'Acumula enquanto você joga.', hist_pow_sum: '{0} amostras · POWER {1} → {2} ({3})', hist_gold_sum: 'ouro {0} → {1}', hist_collecting: 'Coletando… deixe aberto enquanto joga.', refreshed: 'Recarregado', refresh_savedat: 'save de {0}', refresh_nosync: 'Desincronizado? O jogo ainda não salvou.' },
 'es-ES': { f_level: 'nivel', f_stage: 'FASE', f_clear: 'TIEMPO', f_unlock: 'DESBLOQUEAR', f_surv: 'superv.', f_calfit: 'calibrado con tus tiempos reales en {0} fases', f_calone: 'calibrando — farmea otra fase para afinar las lejanas', f_calnone: 'juega unos segundos para calibrar' },
 'fr-FR': { f_level: 'niveau', f_stage: 'NIVEAU', f_clear: 'TEMPS', f_unlock: 'DÉBLOQUER', f_surv: 'surv.', f_calfit: 'calibré sur tes temps réels sur {0} niveaux', f_calone: 'calibrage — farme un autre niveau pour fixer les lointains', f_calnone: 'joue quelques secondes pour calibrer' },
 'de-DE': { f_level: 'Stufe', f_stage: 'STUFE', f_clear: 'ZEIT', f_unlock: 'FREISCHALTEN', f_surv: 'Überl.', f_calfit: 'kalibriert anhand deiner echten Zeiten über {0} Stufen', f_calone: 'kalibriere — farme eine weitere Stufe für die entfernten', f_calnone: 'spiele ein paar Sekunden zum Kalibrieren' },
 'ja-JP': { f_level: 'レベル', f_stage: 'ステージ', f_clear: 'クリア', f_unlock: '解放', f_surv: '生存', f_calfit: '{0}ステージの実測タイムで較正済み', f_calone: '較正中 — 別のステージを周回して遠い数値を確定', f_calnone: '数秒プレイして較正' },
 'ko-KR': { f_level: '레벨', f_stage: '스테이지', f_clear: '클리어', f_unlock: '해금', f_surv: '생존', f_calfit: '{0}개 스테이지의 실측 시간으로 보정됨', f_calone: '보정 중 — 다른 스테이지를 farm해 먼 값까지 확정', f_calnone: '몇 초 플레이해서 보정' },
 'zh-Hans': { f_level: '等级', f_stage: '关卡', f_clear: '用时', f_unlock: '解锁', f_surv: '生存', f_calfit: '已用你 {0} 个关卡的真实时间校准', f_calone: '校准中 — 再刷一个关卡以锁定较远的', f_calnone: '玩几秒来校准' },
 'zh-Hant': { f_level: '等級', f_stage: '關卡', f_clear: '用時', f_unlock: '解鎖', f_surv: '生存', f_calfit: '已用你 {0} 個關卡的真實時間校準', f_calone: '校準中 — 再刷一個關卡以鎖定較遠的', f_calnone: '玩幾秒來校準' },
 'ru-RU': { f_level: 'уровень', f_stage: 'ЭТАП', f_clear: 'ВРЕМЯ', f_unlock: 'ОТКРЫТЬ', f_surv: 'выж.', f_calfit: 'откалибровано по вашим временам на {0} этапах', f_calone: 'калибровка — фармите ещё этап, чтобы уточнить дальние', f_calnone: 'поиграйте пару секунд для калибровки' },
 'pl-PL': { f_level: 'poziom', f_stage: 'ETAP', f_clear: 'CZAS', f_unlock: 'ODBLOKUJ', f_surv: 'przeż.', f_calfit: 'skalibrowane na podstawie twoich czasów z {0} etapów', f_calone: 'kalibracja — farmij inny etap, by dopiąć te dalsze', f_calnone: 'graj kilka sekund, by skalibrować' },
 'tr-TR': { f_level: 'seviye', f_stage: 'AŞAMA', f_clear: 'SÜRE', f_unlock: 'AÇ', f_surv: 'hayatta', f_calfit: '{0} aşamadaki gerçek sürelerinle kalibre edildi', f_calone: 'kalibre ediliyor — uzaktakileri netleştirmek için başka bir aşama farmla', f_calnone: 'kalibre etmek için birkaç saniye oyna' },
 'uk-UA': { f_level: 'рівень', f_stage: 'ЕТАП', f_clear: 'ЧАС', f_unlock: 'ВІДКРИТИ', f_surv: 'вижив.', f_calfit: 'відкалібровано за вашими часами на {0} етапах', f_calone: 'калібрування — фарміть інший етап, щоб уточнити дальні', f_calnone: 'пограйте кілька секунд для калібрування' },
 'id-ID': { f_level: 'level', f_stage: 'STAGE', f_clear: 'WAKTU', f_unlock: 'BUKA', f_surv: 'bertahan', f_calfit: 'dikalibrasi dari waktu nyatamu di {0} stage', f_calone: 'mengalibrasi — farm stage lain untuk mengunci yang jauh', f_calnone: 'main beberapa detik untuk kalibrasi' },
 'th-TH': { f_level: 'เลเวล', f_stage: 'ด่าน', f_clear: 'เวลา', f_unlock: 'ปลดล็อก', f_surv: 'รอด', f_calfit: 'ปรับเทียบจากเวลาจริงของคุณใน {0} ด่าน', f_calone: 'กำลังปรับเทียบ — ฟาร์มอีกด่านเพื่อล็อกด่านที่ไกล', f_calnone: 'เล่นสักครู่เพื่อปรับเทียบ' },
 'vi-VN': { f_level: 'cấp', f_stage: 'MÀN', f_clear: 'THỜI GIAN', f_unlock: 'MỞ KHÓA', f_surv: 'sống sót', f_calfit: 'đã hiệu chỉnh theo thời gian thực của bạn qua {0} màn', f_calone: 'đang hiệu chỉnh — farm thêm một màn để khóa các màn xa', f_calnone: 'chơi vài giây để hiệu chỉnh' },
 };
 for (const l in FARM) { UI[l] = Object.assign(UI[l] || {}, FARM[l]); }

 const GEAR = {
 'en-US': { g_title: 'GEAR · compare equipment', g_hint: "click a slot to compare every item — the ones you have and the ones you don't", g_hero: 'hero', g_pick: 'Select a slot above to compare gear (owned and not-owned).', g_needsave: "The full comparison needs the connected save — it tests every item, including ones you don't have yet.", g_equipped: 'EQUIPPED', g_best: 'BEST', g_dont: "don't have", g_empty: '(empty slot)', g_noitems: 'No gear of this type in the game.', g_hidden: '+{0} items with smaller gains hidden', g_slots: 'Weap,Sub,Helm,Body,Glov,Boot,Amul,Ear,Ring,Brac', a_fire: '{0} (your front-line) has little fire resistance — get some before the fire maps from 3-6 on', gear_lvl: 'up to level', g_have: 'owned', g_sellonly: 'only on Steam', tab_research: 'shop', rs_title: 'SHOP · plan & buy effects', rs_cart: 'CART', rs_none: 'No material grants that — try other stats.', rs_cartempty: 'Add materials below to plan your purchases.', rs_total: 'total', rs_openall: 'open all on Steam', rs_pickstat: 'pick the stats you want:', rs_have: 'have', rs_all: 'all', rs_type: 'type', rs_slot: 'slot', rs_clear: 'clear', rs_missing: '{0} no price', rs_slot_weapon: 'Weapon', rs_slot_armor: 'Armor', rs_slot_accessory: 'Accessory', rs_allslots: 'all slots' },
 'pt-BR': { g_title: 'GEAR · comparar equipamentos', g_hint: 'clique num slot pra comparar todos os itens — os que você tem e os que não tem', g_hero: 'herói', g_pick: 'Selecione um slot acima pra comparar equipamentos (os que você tem e os que não tem).', g_needsave: 'A comparação completa precisa do save conectado — ela testa cada item, inclusive os que você ainda não tem.', g_equipped: 'EQUIPADO', g_best: 'MELHOR', g_dont: 'não tem', g_empty: '(esvaziar slot)', g_noitems: 'Nenhum equipamento desse tipo no jogo.', g_hidden: '+{0} itens com ganho menor ocultos', g_slots: 'Arma,Sec,Elmo,Peito,Luvas,Botas,Amul,Brinco,Anel,Brac', a_fire: '{0} (seu front-line) tem pouca resistência a fogo — pegue antes dos mapas de fogo (3-6 em diante)', gear_lvl: 'até nível', g_have: 'você tem', g_sellonly: 'só na Steam', tab_research: 'loja', rs_title: 'LOJA · planeje e compre efeitos', rs_cart: 'CARRINHO', rs_none: 'Nenhum material concede isso — tente outros stats.', rs_cartempty: 'Adicione materiais abaixo pra planejar as compras.', rs_total: 'total', rs_openall: 'abrir tudo no Steam', rs_pickstat: 'escolha os stats que você quer:', rs_have: 'tem', rs_all: 'todos', rs_type: 'tipo', rs_slot: 'slot', rs_clear: 'limpar', rs_missing: '{0} sem preço', rs_slot_weapon: 'Arma', rs_slot_armor: 'Armadura', rs_slot_accessory: 'Acessório', rs_allslots: 'todos os slots' },
 'es-ES': { g_title: 'GEAR · comparar equipo', g_hint: 'haz clic en un slot para comparar cada objeto — los que tienes y los que no', g_hero: 'héroe', g_pick: 'Selecciona un slot arriba para comparar equipo (los que tienes y los que no).', g_needsave: 'La comparación completa necesita el save conectado — prueba cada objeto, incluso los que aún no tienes.', g_equipped: 'EQUIPADO', g_best: 'MEJOR', g_dont: 'no lo tienes', g_empty: '(vaciar slot)', g_noitems: 'No hay equipo de este tipo en el juego.', g_hidden: '+{0} objetos con menor ganancia ocultos', g_slots: 'Arma,Sec,Casco,Peto,Guant,Botas,Amul,Pend,Anillo,Braz' },
 'fr-FR': { g_title: "GEAR · comparer l'équipement", g_hint: "clique sur un slot pour comparer chaque objet — ceux que tu as et ceux que tu n'as pas", g_hero: 'héros', g_pick: "Sélectionne un slot ci-dessus pour comparer l'équipement (possédé ou non).", g_needsave: "La comparaison complète nécessite la sauvegarde connectée — elle teste chaque objet, même ceux que tu n'as pas encore.", g_equipped: 'ÉQUIPÉ', g_best: 'MEILLEUR', g_dont: 'pas en stock', g_empty: '(vider le slot)', g_noitems: 'Aucun équipement de ce type dans le jeu.', g_hidden: '+{0} objets à gain moindre masqués', g_slots: 'Arme,Sec,Casq,Plast,Gants,Bott,Amul,BO,Bague,Brass' },
 'de-DE': { g_title: 'GEAR · Ausrüstung vergleichen', g_hint: 'klicke auf einen Slot, um jedes Item zu vergleichen — vorhandene und fehlende', g_hero: 'Held', g_pick: 'Wähle oben einen Slot, um Ausrüstung zu vergleichen (vorhanden und nicht).', g_needsave: 'Der volle Vergleich braucht den verbundenen Spielstand — er testet jedes Item, auch die, die du noch nicht hast.', g_equipped: 'AUSGERÜSTET', g_best: 'BESTE', g_dont: 'fehlt', g_empty: '(Slot leeren)', g_noitems: 'Keine Ausrüstung dieses Typs im Spiel.', g_hidden: '+{0} Items mit kleinerem Gewinn ausgeblendet', g_slots: 'Waffe,Neb,Helm,Brust,Hand,Stief,Amul,Ohr,Ring,Arm' },
 'ja-JP': { g_title: 'GEAR · 装備を比較', g_hint: 'スロットをクリックして全アイテムを比較 — 手持ちと未所持の両方', g_hero: 'ヒーロー', g_pick: '上のスロットを選んで装備を比較（所持・未所持）。', g_needsave: '完全な比較には接続したセーブが必要 — 未所持を含む全アイテムを検証します。', g_equipped: '装備中', g_best: '最良', g_dont: '未所持', g_empty: '(スロットを空に)', g_noitems: 'このタイプの装備はゲームに存在しません。', g_hidden: '効果が小さい +{0} 件を非表示', g_slots: '武器,副,兜,鎧,手,靴,首,耳,指,腕' },
 'ko-KR': { g_title: 'GEAR · 장비 비교', g_hint: '슬롯을 클릭해 모든 아이템 비교 — 보유 및 미보유', g_hero: '영웅', g_pick: '위 슬롯을 선택해 장비 비교 (보유/미보유).', g_needsave: '전체 비교에는 연결된 세이브가 필요 — 미보유 포함 모든 아이템을 검증합니다.', g_equipped: '장착', g_best: '최고', g_dont: '미보유', g_empty: '(슬롯 비우기)', g_noitems: '이 유형의 장비가 게임에 없습니다.', g_hidden: '효과가 작은 +{0}개 숨김', g_slots: '무기,보조,투구,갑옷,장갑,신발,목,귀,반지,팔' },
 'zh-Hans': { g_title: 'GEAR · 比较装备', g_hint: '点击槽位比较所有装备 — 你有的和没有的', g_hero: '英雄', g_pick: '选择上方槽位比较装备（拥有和未拥有）。', g_needsave: '完整比较需要已连接的存档 — 它会测试每件装备，包括你还没有的。', g_equipped: '已装备', g_best: '最佳', g_dont: '未拥有', g_empty: '(清空槽位)', g_noitems: '游戏中没有这种类型的装备。', g_hidden: '已隐藏 +{0} 件收益较小的装备', g_slots: '武器,副,头,甲,手,鞋,项,耳,戒,腕' },
 'zh-Hant': { g_title: 'GEAR · 比較裝備', g_hint: '點擊槽位比較所有裝備 — 你有的和沒有的', g_hero: '英雄', g_pick: '選擇上方槽位比較裝備（擁有和未擁有）。', g_needsave: '完整比較需要已連接的存檔 — 它會測試每件裝備，包括你還沒有的。', g_equipped: '已裝備', g_best: '最佳', g_dont: '未擁有', g_empty: '(清空槽位)', g_noitems: '遊戲中沒有這種類型的裝備。', g_hidden: '已隱藏 +{0} 件收益較小的裝備', g_slots: '武器,副,頭,甲,手,鞋,項,耳,戒,腕' },
 'ru-RU': { g_title: 'GEAR · сравнить экипировку', g_hint: 'нажмите на слот, чтобы сравнить все предметы — ваши и те, которых нет', g_hero: 'герой', g_pick: 'Выберите слот выше, чтобы сравнить экипировку (имеющуюся и нет).', g_needsave: 'Полное сравнение требует подключённого сейва — оно проверяет каждый предмет, включая те, которых у вас нет.', g_equipped: 'НАДЕТО', g_best: 'ЛУЧШЕЕ', g_dont: 'нет', g_empty: '(освободить слот)', g_noitems: 'В игре нет экипировки этого типа.', g_hidden: '+{0} предметов с меньшим приростом скрыто', g_slots: 'Оруж,Доп,Шлем,Броня,Перч,Сапог,Амул,Серьг,Кольцо,Браслет' },
 };
 for (const l in GEAR) { UI[l] = Object.assign(UI[l] || {}, GEAR[l]); }

 // Steam Market availability + file-open errors (price-failure UX)
 const MKT = {
 'en-US': { mkt_down: 'Steam Market unreachable (CORS proxies failing) — prices unavailable right now', mkt_nolist: 'not listed on the Steam Market', connect_fail: 'could not open the save: {0}', ver_drift: 'your game is v{0}, the data is v{1} — the wiki we pull from trails the live game by a few patches, so a small gap here is normal' },
 'pt-BR': { mkt_down: 'Steam Market inacessível (proxies CORS falhando) — preços indisponíveis agora', mkt_nolist: 'sem anúncio no Steam Market', connect_fail: 'não consegui abrir o save: {0}', ver_drift: 'seu jogo é v{0}, os dados são v{1} — o wiki de onde puxamos fica alguns patches atrás do jogo ao vivo, então uma pequena diferença aqui é normal' },
 'es-ES': { mkt_down: 'Steam Market inaccesible (fallan los proxies CORS) — precios no disponibles ahora', mkt_nolist: 'sin anuncios en el Steam Market', connect_fail: 'no pude abrir la partida: {0}', ver_drift: 'tu juego es v{0}, los datos son v{1} — la wiki de la que tomamos los datos va unos parches por detrás del juego, así que una pequeña diferencia aquí es normal' },
 'fr-FR': { mkt_down: "Steam Market injoignable (proxys CORS en panne) — prix indisponibles pour le moment", mkt_nolist: "pas d'annonce sur le Steam Market", connect_fail: "impossible d'ouvrir la sauvegarde : {0}", ver_drift: "votre jeu est en v{0}, les données en v{1} — le wiki dont on tire les données a quelques patchs de retard sur le jeu, un petit écart est donc normal" },
 'de-DE': { mkt_down: 'Steam Market nicht erreichbar (CORS-Proxys ausgefallen) — Preise derzeit nicht verfügbar', mkt_nolist: 'kein Angebot auf dem Steam Market', connect_fail: 'Spielstand konnte nicht geöffnet werden: {0}', ver_drift: 'dein Spiel ist v{0}, die Daten sind v{1} — das Wiki, aus dem wir die Daten beziehen, hinkt dem Spiel um ein paar Patches hinterher, ein kleiner Abstand ist also normal' },
 'ja-JP': { mkt_down: 'Steamマーケットに接続できません（CORSプロキシ障害）— 現在価格を取得できません', mkt_nolist: 'Steamマーケットに出品なし', connect_fail: 'セーブを開けません: {0}', ver_drift: 'ゲームは v{0}、データは v{1} です — データ元の wiki はライブのゲームより数パッチ遅れるため、少しのズレは正常です' },
 'ko-KR': { mkt_down: 'Steam 장터에 연결할 수 없음 (CORS 프록시 오류) — 현재 가격을 가져올 수 없습니다', mkt_nolist: 'Steam 장터에 매물 없음', connect_fail: '세이브를 열 수 없음: {0}', ver_drift: '게임은 v{0}, 데이터는 v{1} — 데이터를 가져오는 위키는 실제 게임보다 몇 패치 뒤처지므로 약간의 차이는 정상입니다' },
 'zh-Hans': { mkt_down: '无法连接 Steam 市场（CORS 代理故障）— 暂时无法获取价格', mkt_nolist: 'Steam 市场无在售', connect_fail: '无法打开存档：{0}', ver_drift: '你的游戏是 v{0}，数据是 v{1} — 我们抓取的 wiki 比线上游戏慢几个补丁，所以这里有小差距是正常的' },
 'zh-Hant': { mkt_down: '無法連接 Steam 市場（CORS 代理故障）— 暫時無法取得價格', mkt_nolist: 'Steam 市場無在售', connect_fail: '無法打開存檔：{0}', ver_drift: '你的遊戲是 v{0}，資料是 v{1} — 我們抓取的 wiki 比線上遊戲慢幾個更新，所以這裡有小差距是正常的' },
 'ru-RU': { mkt_down: 'Steam Market недоступен (CORS-прокси не отвечают) — цены сейчас недоступны', mkt_nolist: 'нет лотов на Steam Market', connect_fail: 'не удалось открыть сохранение: {0}', ver_drift: 'игра v{0}, данные v{1} — вики, откуда мы берём данные, отстаёт от живой игры на несколько патчей, так что небольшой разрыв здесь — это нормально' },
 };
 for (const l in MKT) { UI[l] = Object.assign(UI[l] || {}, MKT[l]); }

 // Shop tab: material-type labels (no official game localization exists — these are
 // schema column names in the data) and list pagination.
 const SHOP = {
 'en-US': { rs_t_decoration: 'Decoration', rs_t_engraving: 'Engraving', rs_t_inscription: 'Inscription', rs_more: 'show more (+{0})' },
 'pt-BR': { rs_t_decoration: 'Decoração', rs_t_engraving: 'Gravação', rs_t_inscription: 'Inscrição', rs_more: 'mostrar mais (+{0})' },
 'es-ES': { rs_t_decoration: 'Decoración', rs_t_engraving: 'Grabado', rs_t_inscription: 'Inscripción', rs_more: 'mostrar más (+{0})' },
 'fr-FR': { rs_t_decoration: 'Décoration', rs_t_engraving: 'Gravure', rs_t_inscription: 'Inscription', rs_more: 'afficher plus (+{0})' },
 'de-DE': { rs_t_decoration: 'Verzierung', rs_t_engraving: 'Gravur', rs_t_inscription: 'Inschrift', rs_more: 'mehr anzeigen (+{0})' },
 'ja-JP': { rs_t_decoration: '装飾', rs_t_engraving: '彫刻', rs_t_inscription: '銘刻', rs_more: 'さらに表示 (+{0})' },
 'ko-KR': { rs_t_decoration: '장식', rs_t_engraving: '각인', rs_t_inscription: '명문', rs_more: '더 보기 (+{0})' },
 'zh-Hans': { rs_t_decoration: '装饰', rs_t_engraving: '雕刻', rs_t_inscription: '铭文', rs_more: '显示更多 (+{0})' },
 'zh-Hant': { rs_t_decoration: '裝飾', rs_t_engraving: '雕刻', rs_t_inscription: '銘文', rs_more: '顯示更多 (+{0})' },
 'ru-RU': { rs_t_decoration: 'Украшение', rs_t_engraving: 'Гравировка', rs_t_inscription: 'Надпись', rs_more: 'показать ещё (+{0})' },
 };
 for (const l in SHOP) { UI[l] = Object.assign(UI[l] || {}, SHOP[l]); }

 // Affix-only stats the game ships WITHOUT localized names (stat_strings has no name
 // entry for them). Hand-translated here; matStatName() in the dashboard falls back to
 // these st_* keys when the game data has no display name.
 const STATS = {
 'en-US': { st_FireDamagePercent: 'Fire Damage %', st_ColdDamagePercent: 'Cold Damage %', st_LightningDamagePercent: 'Lightning Damage %', st_CastSpeed: 'Cast Speed', st_PhysicalDamagePercent: 'Physical Damage %', st_AddHpPerHit: 'HP per Hit', st_AreaOfEffect: 'Area of Effect', st_HpLeech: 'HP Leech', st_DamageReduction: 'Damage Reduction', st_AllElementalResistance: 'All Elemental Resistance', st_Multistrike: 'Multistrike', st_BaseAttackCountReduction: 'Base Attack Count Reduction', st_ProjectileCount: 'Projectile Count' },
 'pt-BR': { st_FireDamagePercent: '% de Dano de Fogo', st_ColdDamagePercent: '% de Dano de Gelo', st_LightningDamagePercent: '% de Dano de Raio', st_CastSpeed: 'Velocidade de Conjuração', st_PhysicalDamagePercent: '% de Dano Físico', st_AddHpPerHit: 'PV por Acerto', st_AreaOfEffect: 'Área de Efeito', st_HpLeech: 'Roubo de Vida', st_DamageReduction: 'Redução de Dano', st_AllElementalResistance: 'Resistência Elemental Total', st_Multistrike: 'Golpe Múltiplo', st_BaseAttackCountReduction: 'Redução de Ataques Base', st_ProjectileCount: 'Nº de Projéteis' },
 'es-ES': { st_FireDamagePercent: '% de daño de fuego', st_ColdDamagePercent: '% de daño de hielo', st_LightningDamagePercent: '% de daño de rayo', st_CastSpeed: 'Velocidad de lanzamiento', st_PhysicalDamagePercent: '% de daño físico', st_AddHpPerHit: 'PV por golpe', st_AreaOfEffect: 'Área de efecto', st_HpLeech: 'Robo de vida', st_DamageReduction: 'Reducción de daño', st_AllElementalResistance: 'Resistencia elemental total', st_Multistrike: 'Golpe múltiple', st_BaseAttackCountReduction: 'Reducción de ataques base', st_ProjectileCount: 'N.º de proyectiles' },
 'fr-FR': { st_FireDamagePercent: '% dégâts de feu', st_ColdDamagePercent: '% dégâts de froid', st_LightningDamagePercent: '% dégâts de foudre', st_CastSpeed: "Vitesse d'incantation", st_PhysicalDamagePercent: '% dégâts physiques', st_AddHpPerHit: 'PV par coup', st_AreaOfEffect: "Zone d'effet", st_HpLeech: 'Vol de vie', st_DamageReduction: 'Réduction des dégâts', st_AllElementalResistance: 'Résistance élémentaire totale', st_Multistrike: 'Frappe multiple', st_BaseAttackCountReduction: "Réduction d'attaques de base", st_ProjectileCount: 'Nombre de projectiles' },
 'de-DE': { st_FireDamagePercent: 'Feuerschaden %', st_ColdDamagePercent: 'Kälteschaden %', st_LightningDamagePercent: 'Blitzschaden %', st_CastSpeed: 'Zaubertempo', st_PhysicalDamagePercent: 'Physischer Schaden %', st_AddHpPerHit: 'LP pro Treffer', st_AreaOfEffect: 'Wirkungsbereich', st_HpLeech: 'Lebensraub', st_DamageReduction: 'Schadensreduktion', st_AllElementalResistance: 'Alle Elementarresistenzen', st_Multistrike: 'Mehrfachschlag', st_BaseAttackCountReduction: 'Basisangriffs-Reduktion', st_ProjectileCount: 'Projektilanzahl' },
 'ja-JP': { st_FireDamagePercent: '火炎ダメージ%', st_ColdDamagePercent: '冷気ダメージ%', st_LightningDamagePercent: '雷ダメージ%', st_CastSpeed: '詠唱速度', st_PhysicalDamagePercent: '物理ダメージ%', st_AddHpPerHit: 'ヒット毎HP', st_AreaOfEffect: '効果範囲', st_HpLeech: 'HP吸収', st_DamageReduction: 'ダメージ軽減', st_AllElementalResistance: '全属性耐性', st_Multistrike: 'マルチストライク', st_BaseAttackCountReduction: '基本攻撃回数減少', st_ProjectileCount: '投射体数' },
 'ko-KR': { st_FireDamagePercent: '화염 피해 %', st_ColdDamagePercent: '냉기 피해 %', st_LightningDamagePercent: '번개 피해 %', st_CastSpeed: '시전 속도', st_PhysicalDamagePercent: '물리 피해 %', st_AddHpPerHit: '타격당 HP', st_AreaOfEffect: '효과 범위', st_HpLeech: 'HP 흡수', st_DamageReduction: '피해 감소', st_AllElementalResistance: '모든 원소 저항', st_Multistrike: '다중 타격', st_BaseAttackCountReduction: '기본 공격 횟수 감소', st_ProjectileCount: '투사체 수' },
 'zh-Hans': { st_FireDamagePercent: '火焰伤害%', st_ColdDamagePercent: '冰霜伤害%', st_LightningDamagePercent: '闪电伤害%', st_CastSpeed: '施法速度', st_PhysicalDamagePercent: '物理伤害%', st_AddHpPerHit: '每次命中回血', st_AreaOfEffect: '作用范围', st_HpLeech: '生命偷取', st_DamageReduction: '伤害减免', st_AllElementalResistance: '全元素抗性', st_Multistrike: '多重打击', st_BaseAttackCountReduction: '基础攻击次数减少', st_ProjectileCount: '弹道数量' },
 'zh-Hant': { st_FireDamagePercent: '火焰傷害%', st_ColdDamagePercent: '冰霜傷害%', st_LightningDamagePercent: '閃電傷害%', st_CastSpeed: '施法速度', st_PhysicalDamagePercent: '物理傷害%', st_AddHpPerHit: '每次命中回血', st_AreaOfEffect: '作用範圍', st_HpLeech: '生命偷取', st_DamageReduction: '傷害減免', st_AllElementalResistance: '全元素抗性', st_Multistrike: '多重打擊', st_BaseAttackCountReduction: '基礎攻擊次數減少', st_ProjectileCount: '彈道數量' },
 'ru-RU': { st_FireDamagePercent: '% урона огнём', st_ColdDamagePercent: '% урона холодом', st_LightningDamagePercent: '% урона молнией', st_CastSpeed: 'Скорость произнесения', st_PhysicalDamagePercent: '% физического урона', st_AddHpPerHit: 'ОЗ за удар', st_AreaOfEffect: 'Область действия', st_HpLeech: 'Похищение здоровья', st_DamageReduction: 'Снижение урона', st_AllElementalResistance: 'Сопротивление всем стихиям', st_Multistrike: 'Мультиудар', st_BaseAttackCountReduction: 'Меньше базовых атак', st_ProjectileCount: 'Число снарядов' },
 };
 for (const l in STATS) { UI[l] = Object.assign(UI[l] || {}, STATS[l]); }

 // Coach card, timeline and summary extras (Overview)
 const COACH = {
 'en-US': { coach_title: 'DO THIS NOW', tl_title: 'TIMELINE', tl_lvlup: '{0} → level {1}', tl_goldfor: 'gold for {0}', tl_idlecap: 'offline reward cap (8h)', sum_alch: 'gold sitting in loose gear' },
 'pt-BR': { coach_title: 'FAÇA ISSO AGORA', tl_title: 'LINHA DO TEMPO', tl_lvlup: '{0} → nível {1}', tl_goldfor: 'gold para {0}', tl_idlecap: 'cap da recompensa offline (8h)', sum_alch: 'gold parado em itens soltos' },
 'es-ES': { coach_title: 'HAZ ESTO AHORA', tl_title: 'CRONOLOGÍA', tl_lvlup: '{0} → nivel {1}', tl_goldfor: 'oro para {0}', tl_idlecap: 'tope de recompensa offline (8h)', sum_alch: 'oro parado en objetos sueltos' },
 'fr-FR': { coach_title: 'FAITES ÇA MAINTENANT', tl_title: 'CHRONOLOGIE', tl_lvlup: '{0} → niveau {1}', tl_goldfor: 'or pour {0}', tl_idlecap: 'plafond de récompense hors ligne (8h)', sum_alch: "or dormant dans l'équipement en vrac" },
 'de-DE': { coach_title: 'MACH DAS JETZT', tl_title: 'ZEITLEISTE', tl_lvlup: '{0} → Level {1}', tl_goldfor: 'Gold für {0}', tl_idlecap: 'Offline-Belohnungslimit (8h)', sum_alch: 'Gold in losen Items gebunden' },
 'ja-JP': { coach_title: '今これをやる', tl_title: 'タイムライン', tl_lvlup: '{0} → レベル{1}', tl_goldfor: '{0}のゴールド', tl_idlecap: 'オフライン報酬上限 (8h)', sum_alch: '未売却アイテムのゴールド' },
 'ko-KR': { coach_title: '지금 할 일', tl_title: '타임라인', tl_lvlup: '{0} → 레벨 {1}', tl_goldfor: '{0} 구매 골드', tl_idlecap: '오프라인 보상 한도 (8h)', sum_alch: '미판매 아이템에 묶인 골드' },
 'zh-Hans': { coach_title: '现在就做', tl_title: '时间线', tl_lvlup: '{0} → 等级 {1}', tl_goldfor: '{0} 所需金币', tl_idlecap: '离线奖励上限 (8h)', sum_alch: '闲置物品中的金币' },
 'zh-Hant': { coach_title: '現在就做', tl_title: '時間線', tl_lvlup: '{0} → 等級 {1}', tl_goldfor: '{0} 所需金幣', tl_idlecap: '離線獎勵上限 (8h)', sum_alch: '閒置物品中的金幣' },
 'ru-RU': { coach_title: 'СДЕЛАЙ ЭТО СЕЙЧАС', tl_title: 'ХРОНОЛОГИЯ', tl_lvlup: '{0} → уровень {1}', tl_goldfor: 'золото на {0}', tl_idlecap: 'лимит офлайн-награды (8ч)', sum_alch: 'золото в непроданных вещах' },
 };
 for (const l in COACH) { UI[l] = Object.assign(UI[l] || {}, COACH[l]); }

 // Pets panel, gear progression, synthesis and the spending-plan cart
 const PANELS = {
 'en-US': { pets_title: 'PETS', pets_active: 'active', pets_bestgold: 'best for gold', pets_bestexp: 'best for EXP', pets_next: 'next unlock', prog_title: 'GEAR PROGRESSION', prog_avg: 'average equipped gear level', prog_frontier: 'frontier stage level', prog_push: 'your gear is {0} levels behind — push the frontier for better drops', prog_ok: 'gear keeps pace with your stage', synth_title: 'SYNTHESIS', synth_row: '{0}× {1} → 1 {2}', synth_ready: '{0} fusion(s) ready', synth_none: 'no full set of 9 same-grade spares yet', cart_title: 'SPENDING PLAN', cart_hint: 'best ΔPOWER per gold, in buy order', cart_now: 'buy now', cart_save: 'save up' },
 'pt-BR': { pets_title: 'PETS', pets_active: 'ativo', pets_bestgold: 'melhor pra gold', pets_bestexp: 'melhor pra EXP', pets_next: 'próximo a destravar', prog_title: 'PROGRESSÃO DE GEAR', prog_avg: 'nível médio do gear equipado', prog_frontier: 'nível do estágio fronteira', prog_push: 'seu gear está {0} níveis atrás — empurre a fronteira pra dropar gear melhor', prog_ok: 'o gear acompanha seu estágio', synth_title: 'SYNTHESIS', synth_row: '{0}× {1} → 1 {2}', synth_ready: '{0} fusão(ões) pronta(s)', synth_none: 'ainda não há 9 sobras do mesmo grade', cart_title: 'PLANO DE GASTO', cart_hint: 'melhor ΔPODER por gold, em ordem de compra', cart_now: 'dá pra comprar', cart_save: 'junte gold' },
 'es-ES': { pets_title: 'MASCOTAS', pets_active: 'activa', pets_bestgold: 'mejor para oro', pets_bestexp: 'mejor para EXP', pets_next: 'próximo desbloqueo', prog_title: 'PROGRESIÓN DE EQUIPO', prog_avg: 'nivel medio del equipo', prog_frontier: 'nivel de la etapa frontera', prog_push: 'tu equipo va {0} niveles atrás — empuja la frontera para mejores drops', prog_ok: 'el equipo sigue el ritmo de tu etapa', synth_title: 'SÍNTESIS', synth_row: '{0}× {1} → 1 {2}', synth_ready: '{0} fusión(es) lista(s)', synth_none: 'aún no hay 9 sobrantes del mismo grado', cart_title: 'PLAN DE GASTO', cart_hint: 'mejor ΔPODER por oro, en orden de compra', cart_now: 'puedes comprarlo', cart_save: 'ahorra' },
 'fr-FR': { pets_title: 'FAMILIERS', pets_active: 'actif', pets_bestgold: "meilleur pour l'or", pets_bestexp: "meilleur pour l'EXP", pets_next: 'prochain déblocage', prog_title: "PROGRESSION D'ÉQUIPEMENT", prog_avg: "niveau moyen de l'équipement", prog_frontier: 'niveau du palier frontière', prog_push: 'votre équipement a {0} niveaux de retard — poussez la frontière pour de meilleurs butins', prog_ok: "l'équipement suit votre palier", synth_title: 'SYNTHÈSE', synth_row: '{0}× {1} → 1 {2}', synth_ready: '{0} fusion(s) prête(s)', synth_none: 'pas encore 9 doublons du même grade', cart_title: 'PLAN DE DÉPENSES', cart_hint: 'meilleur ΔPUISSANCE par or, en ordre d’achat', cart_now: 'achetable', cart_save: 'économisez' },
 'de-DE': { pets_title: 'BEGLEITER', pets_active: 'aktiv', pets_bestgold: 'am besten für Gold', pets_bestexp: 'am besten für EXP', pets_next: 'nächste Freischaltung', prog_title: 'AUSRÜSTUNGS-FORTSCHRITT', prog_avg: 'mittleres Ausrüstungslevel', prog_frontier: 'Frontier-Stufenlevel', prog_push: 'deine Ausrüstung liegt {0} Level zurück — pushe die Frontier für bessere Drops', prog_ok: 'Ausrüstung hält mit deiner Stufe Schritt', synth_title: 'SYNTHESE', synth_row: '{0}× {1} → 1 {2}', synth_ready: '{0} Fusion(en) bereit', synth_none: 'noch kein voller Satz aus 9 gleichen Graden', cart_title: 'AUSGABENPLAN', cart_hint: 'beste ΔMACHT pro Gold, in Kaufreihenfolge', cart_now: 'jetzt kaufbar', cart_save: 'sparen' },
 'ja-JP': { pets_title: 'ペット', pets_active: '装備中', pets_bestgold: 'ゴールド最適', pets_bestexp: 'EXP最適', pets_next: '次の解放', prog_title: '装備の進行', prog_avg: '装備の平均レベル', prog_frontier: 'フロンティアのレベル', prog_push: '装備が{0}レベル遅れています — フロンティアを進めて良いドロップを', prog_ok: '装備はステージに追いついています', synth_title: '合成', synth_row: '{0}× {1} → 1 {2}', synth_ready: '{0}回合成できます', synth_none: '同グレード9個の余剰がまだありません', cart_title: '購入プラン', cart_hint: 'ゴールドあたりΔPOWER順', cart_now: '今買えます', cart_save: '貯金中' },
 'ko-KR': { pets_title: '펫', pets_active: '장착 중', pets_bestgold: '골드 최적', pets_bestexp: 'EXP 최적', pets_next: '다음 해금', prog_title: '장비 진행도', prog_avg: '평균 장비 레벨', prog_frontier: '프런티어 스테이지 레벨', prog_push: '장비가 {0}레벨 뒤처져 있습니다 — 프런티어를 밀어 더 좋은 드롭을 받으세요', prog_ok: '장비가 스테이지를 따라가고 있습니다', synth_title: '합성', synth_row: '{0}× {1} → 1 {2}', synth_ready: '합성 {0}회 가능', synth_none: '같은 등급 여분 9개가 아직 없습니다', cart_title: '지출 계획', cart_hint: '골드당 ΔPOWER 순', cart_now: '지금 구매 가능', cart_save: '저축 중' },
 'zh-Hans': { pets_title: '宠物', pets_active: '已装备', pets_bestgold: '金币最佳', pets_bestexp: '经验最佳', pets_next: '下一个解锁', prog_title: '装备进度', prog_avg: '平均装备等级', prog_frontier: '前线关卡等级', prog_push: '你的装备落后 {0} 级 — 推进前线获取更好掉落', prog_ok: '装备跟上了你的关卡', synth_title: '合成', synth_row: '{0}× {1} → 1 {2}', synth_ready: '可合成 {0} 次', synth_none: '同品级余件还不足 9 个', cart_title: '消费计划', cart_hint: '按每金币 ΔPOWER 排序', cart_now: '现在可买', cart_save: '继续攒钱' },
 'zh-Hant': { pets_title: '寵物', pets_active: '已裝備', pets_bestgold: '金幣最佳', pets_bestexp: '經驗最佳', pets_next: '下一個解鎖', prog_title: '裝備進度', prog_avg: '平均裝備等級', prog_frontier: '前線關卡等級', prog_push: '你的裝備落後 {0} 級 — 推進前線獲取更好掉落', prog_ok: '裝備跟上了你的關卡', synth_title: '合成', synth_row: '{0}× {1} → 1 {2}', synth_ready: '可合成 {0} 次', synth_none: '同品級餘件還不足 9 個', cart_title: '消費計畫', cart_hint: '按每金幣 ΔPOWER 排序', cart_now: '現在可買', cart_save: '繼續存錢' },
 'ru-RU': { pets_title: 'ПИТОМЦЫ', pets_active: 'активен', pets_bestgold: 'лучший для золота', pets_bestexp: 'лучший для опыта', pets_next: 'следующий анлок', prog_title: 'ПРОГРЕСС ЭКИПИРОВКИ', prog_avg: 'средний уровень экипировки', prog_frontier: 'уровень фронтира', prog_push: 'экипировка отстаёт на {0} уровней — продвигайте фронтир ради лучшего лута', prog_ok: 'экипировка не отстаёт от этапа', synth_title: 'СИНТЕЗ', synth_row: '{0}× {1} → 1 {2}', synth_ready: 'готово слияний: {0}', synth_none: 'ещё нет 9 запасных одного грейда', cart_title: 'ПЛАН ТРАТ', cart_hint: 'лучший ΔСИЛЫ за золото, в порядке покупки', cart_now: 'можно купить', cart_save: 'копите' },
 };
 for (const l in PANELS) { UI[l] = Object.assign(UI[l] || {}, PANELS[l]); }

 // Web Notifications (bell toggle in the top bar)
 const NTF = {
 'en-US': { ntf_btn: 'notify me: level ups, gold targets, idle cap', ntf_on: 'notifications on', ntf_off: 'notifications off', ntf_denied: 'notifications blocked by the browser', ntf_lvl: '{0} reached level {1}', ntf_gold: 'you can afford {0} now ({1} gold)', ntf_idle: 'offline rewards capped (8h) — collect them' },
 'pt-BR': { ntf_btn: 'me avise: level up, metas de gold, cap de idle', ntf_on: 'notificações ligadas', ntf_off: 'notificações desligadas', ntf_denied: 'notificações bloqueadas pelo navegador', ntf_lvl: '{0} chegou ao nível {1}', ntf_gold: 'já dá pra comprar {0} ({1} de gold)', ntf_idle: 'recompensa offline no cap (8h) — vai coletar' },
 'es-ES': { ntf_btn: 'avísame: subidas de nivel, metas de oro, tope de idle', ntf_on: 'notificaciones activadas', ntf_off: 'notificaciones desactivadas', ntf_denied: 'notificaciones bloqueadas por el navegador', ntf_lvl: '{0} alcanzó el nivel {1}', ntf_gold: 'ya puedes comprar {0} ({1} de oro)', ntf_idle: 'recompensa offline al tope (8h) — ve a recogerla' },
 'fr-FR': { ntf_btn: "prévenez-moi : niveaux, objectifs d'or, plafond idle", ntf_on: 'notifications activées', ntf_off: 'notifications désactivées', ntf_denied: 'notifications bloquées par le navigateur', ntf_lvl: '{0} a atteint le niveau {1}', ntf_gold: 'vous pouvez acheter {0} ({1} or)', ntf_idle: 'récompense hors ligne au plafond (8h) — allez la récupérer' },
 'de-DE': { ntf_btn: 'benachrichtige mich: Level-ups, Goldziele, Idle-Limit', ntf_on: 'Benachrichtigungen an', ntf_off: 'Benachrichtigungen aus', ntf_denied: 'Benachrichtigungen vom Browser blockiert', ntf_lvl: '{0} hat Level {1} erreicht', ntf_gold: 'du kannst dir {0} jetzt leisten ({1} Gold)', ntf_idle: 'Offline-Belohnung am Limit (8h) — abholen' },
 'ja-JP': { ntf_btn: '通知: レベルアップ・ゴールド目標・放置上限', ntf_on: '通知オン', ntf_off: '通知オフ', ntf_denied: 'ブラウザが通知をブロックしています', ntf_lvl: '{0}がレベル{1}に到達', ntf_gold: '{0}が買えるようになりました（{1}ゴールド）', ntf_idle: 'オフライン報酬が上限です (8h) — 回収しましょう' },
 'ko-KR': { ntf_btn: '알림: 레벨업, 골드 목표, 방치 한도', ntf_on: '알림 켜짐', ntf_off: '알림 꺼짐', ntf_denied: '브라우저가 알림을 차단했습니다', ntf_lvl: '{0}이(가) 레벨 {1} 달성', ntf_gold: '이제 {0}을(를) 살 수 있습니다 ({1} 골드)', ntf_idle: '오프라인 보상이 한도에 도달 (8h) — 수령하세요' },
 'zh-Hans': { ntf_btn: '通知我：升级、金币目标、挂机上限', ntf_on: '通知已开启', ntf_off: '通知已关闭', ntf_denied: '浏览器已阻止通知', ntf_lvl: '{0} 达到等级 {1}', ntf_gold: '现在买得起 {0} 了（{1} 金币）', ntf_idle: '离线奖励已达上限 (8h) — 去领取吧' },
 'zh-Hant': { ntf_btn: '通知我：升級、金幣目標、掛機上限', ntf_on: '通知已開啟', ntf_off: '通知已關閉', ntf_denied: '瀏覽器已封鎖通知', ntf_lvl: '{0} 達到等級 {1}', ntf_gold: '現在買得起 {0} 了（{1} 金幣）', ntf_idle: '離線獎勵已達上限 (8h) — 去領取吧' },
 'ru-RU': { ntf_btn: 'уведомлять: уровни, цели по золоту, лимит простоя', ntf_on: 'уведомления включены', ntf_off: 'уведомления выключены', ntf_denied: 'браузер блокирует уведомления', ntf_lvl: '{0} достиг уровня {1}', ntf_gold: 'теперь хватает на {0} ({1} золота)', ntf_idle: 'офлайн-награда на лимите (8ч) — заберите её' },
 };
 for (const l in NTF) { UI[l] = Object.assign(UI[l] || {}, NTF[l]); }

 const THEME = {
 'en-US': { theme_btn: 'light / dark theme', reco_locate: 'click to locate it in the tree' }, 'pt-BR': { theme_btn: 'tema claro / escuro', reco_locate: 'clique pra localizar na árvore' },
 'es-ES': { theme_btn: 'tema claro / oscuro', reco_locate: 'haz clic para ubicarla en el árbol' }, 'fr-FR': { theme_btn: 'thème clair / sombre', reco_locate: "cliquez pour la situer dans l'arbre" },
 'de-DE': { theme_btn: 'helles / dunkles Design', reco_locate: 'klicken, um sie im Baum zu finden' }, 'ja-JP': { theme_btn: 'ライト / ダークテーマ', reco_locate: 'クリックでツリー内の位置を表示' },
 'ko-KR': { theme_btn: '라이트 / 다크 테마', reco_locate: '클릭하면 트리에서 위치를 보여줍니다' }, 'zh-Hans': { theme_btn: '浅色 / 深色主题', reco_locate: '点击在符文树中定位' },
 'zh-Hant': { theme_btn: '淺色 / 深色主題', reco_locate: '點擊在符文樹中定位' }, 'ru-RU': { theme_btn: 'светлая / тёмная тема', reco_locate: 'нажмите, чтобы найти её в древе' },
 };
 for (const l in THEME) { UI[l] = Object.assign(UI[l] || {}, THEME[l]); }

 // Drop finder: gear favorites + where-it-drops + the wishlist farm card
 const DROPS = {
 'en-US': { fav_tip: 'favorite — rank farm stages by where this drops', drops_at: 'drops at', drops_none: 'not a stage drop (synthesis/market only)', drops_locked: 'no unlocked stage drops it yet', fav_best: 'BEST FOR YOUR ★', fav_box: 'per box', fav_sort: 'sort by your ★ favorites' },
 'pt-BR': { fav_tip: 'favoritar — ranqueia os estágios de farm por onde isso dropa', drops_at: 'dropa em', drops_none: 'não dropa em estágio (só synthesis/market)', drops_locked: 'nenhum estágio desbloqueado dropa ainda', fav_best: 'MELHOR PROS SEUS ★', fav_box: 'por caixa', fav_sort: 'ordenar pelos seus ★ favoritos' },
 'es-ES': { fav_tip: 'favorito — ordena las etapas de farmeo por dónde cae', drops_at: 'cae en', drops_none: 'no cae en etapas (solo síntesis/mercado)', drops_locked: 'ninguna etapa desbloqueada lo suelta aún', fav_best: 'MEJOR PARA TUS ★', fav_box: 'por caja', fav_sort: 'ordenar por tus ★ favoritos' },
 'fr-FR': { fav_tip: 'favori — classe les paliers de farm selon où ça tombe', drops_at: 'tombe en', drops_none: 'ne tombe pas en palier (synthèse/marché uniquement)', drops_locked: "aucun palier débloqué ne le fait tomber pour l'instant", fav_best: 'MEILLEUR POUR VOS ★', fav_box: 'par coffre', fav_sort: 'trier selon vos ★ favoris' },
 'de-DE': { fav_tip: 'Favorit — sortiert Farm-Stufen danach, wo das droppt', drops_at: 'droppt in', drops_none: 'kein Stufen-Drop (nur Synthese/Markt)', drops_locked: 'noch keine freigeschaltete Stufe droppt es', fav_best: 'BESTE FÜR DEINE ★', fav_box: 'pro Kiste', fav_sort: 'nach deinen ★ Favoriten sortieren' },
 'ja-JP': { fav_tip: 'お気に入り — ドロップ場所でファームを並べ替え', drops_at: 'ドロップ:', drops_none: 'ステージドロップなし（合成/マーケットのみ）', drops_locked: '解放済みステージではまだドロップしません', fav_best: '★に最適', fav_box: '箱あたり', fav_sort: '★お気に入りで並べ替え' },
 'ko-KR': { fav_tip: '즐겨찾기 — 드롭 위치 기준으로 파밍 정렬', drops_at: '드롭:', drops_none: '스테이지 드롭 없음 (합성/장터 전용)', drops_locked: '해금된 스테이지에서는 아직 드롭되지 않습니다', fav_best: '★에 최적', fav_box: '상자당', fav_sort: '★ 즐겨찾기로 정렬' },
 'zh-Hans': { fav_tip: '收藏 — 按掉落地点排序刷图关卡', drops_at: '掉落于', drops_none: '不在关卡掉落（仅合成/市场）', drops_locked: '已解锁的关卡还掉不出它', fav_best: '最适合你的 ★', fav_box: '每箱', fav_sort: '按你的 ★ 收藏排序' },
 'zh-Hant': { fav_tip: '收藏 — 按掉落地點排序刷圖關卡', drops_at: '掉落於', drops_none: '不在關卡掉落（僅合成/市場）', drops_locked: '已解鎖的關卡還掉不出它', fav_best: '最適合你的 ★', fav_box: '每箱', fav_sort: '按你的 ★ 收藏排序' },
 'ru-RU': { fav_tip: 'избранное — сортирует фарм-этапы по месту дропа', drops_at: 'падает в', drops_none: 'не падает на этапах (только синтез/маркет)', drops_locked: 'пока ни один открытый этап его не даёт', fav_best: 'ЛУЧШЕЕ ДЛЯ ВАШИХ ★', fav_box: 'за сундук', fav_sort: 'сортировать по вашим ★' },
 };
 for (const l in DROPS) { UI[l] = Object.assign(UI[l] || {}, DROPS[l]); }

 // Chests tab — auto-open cooldown timers (durations + capacity come from the save)
 const CHEST = {
 'en-US': { tab_chests: 'Chests', chests_title: 'AUTO-OPEN TIMERS', chest_normal: 'Normal chest', chest_boss: 'Stage-boss chest', chest_act: 'Act-boss chest', chest_every: 'auto-opens every', chest_cap: 'capacity', chest_slots: '{0} slots', chest_locked: 'auto-open not unlocked yet', chest_start: 'start', chest_stop: 'stop', chest_ready: '{0} ready — auto-opened', chest_opens: 'opened {0}×', chest_vol: 'alert volume', chest_test: 'test', chest_intro: 'Chests aren’t in the save, so start a timer when you’re AFK and it dings each auto-open cycle — durations are your real cooldowns (base minus your reduction runes).', chest_demo: 'demo cooldowns shown — connect your save for your exact timers', chest_full: 'when the backpack fills up, new chests stop dropping — keep an eye on capacity' },
 'pt-BR': { tab_chests: 'Baús', chests_title: 'TIMERS DE AUTO-ABRIR', chest_normal: 'Baú comum', chest_boss: 'Baú de chefe de estágio', chest_act: 'Baú de chefe de ato', chest_every: 'auto-abre a cada', chest_cap: 'capacidade', chest_slots: '{0} slots', chest_locked: 'auto-abrir ainda não desbloqueado', chest_start: 'iniciar', chest_stop: 'parar', chest_ready: '{0} pronto — auto-abriu', chest_opens: 'abriu {0}×', chest_vol: 'volume do alerta', chest_test: 'testar', chest_intro: 'Baús não estão no save, então inicie um timer quando estiver AFK e ele apita a cada ciclo de auto-abrir — as durações são os seus cooldowns reais (base menos suas runas de redução).', chest_demo: 'mostrando cooldowns de demo — conecte seu save pros seus timers exatos', chest_full: 'quando a mochila enche, novos baús param de dropar — fique de olho na capacidade' },
 'es-ES': { tab_chests: 'Cofres', chests_title: 'TEMPORIZADORES DE AUTOAPERTURA', chest_normal: 'Cofre común', chest_boss: 'Cofre de jefe de etapa', chest_act: 'Cofre de jefe de acto', chest_every: 'se abre solo cada', chest_cap: 'capacidad', chest_slots: '{0} ranuras', chest_locked: 'autoapertura aún no desbloqueada', chest_start: 'iniciar', chest_stop: 'parar', chest_ready: '{0} listo — autoabierto', chest_opens: 'abierto {0}×', chest_vol: 'volumen de alerta', chest_test: 'probar', chest_intro: 'Los cofres no están en la partida, así que inicia un temporizador cuando estés AFK y sonará en cada ciclo de autoapertura — las duraciones son tus cooldowns reales (base menos tus runas de reducción).', chest_demo: 'mostrando cooldowns de demo — conecta tu partida para tus tiempos exactos', chest_full: 'cuando la mochila se llena, dejan de caer cofres nuevos — vigila la capacidad' },
 'fr-FR': { tab_chests: 'Coffres', chests_title: "MINUTEURS D'AUTO-OUVERTURE", chest_normal: 'Coffre normal', chest_boss: "Coffre de boss d'étape", chest_act: "Coffre de boss d'acte", chest_every: 'ouvre tout seul toutes les', chest_cap: 'capacité', chest_slots: '{0} emplacements', chest_locked: "auto-ouverture pas encore débloquée", chest_start: 'démarrer', chest_stop: 'arrêter', chest_ready: '{0} prêt — auto-ouvert', chest_opens: 'ouvert {0}×', chest_vol: "volume de l'alerte", chest_test: 'tester', chest_intro: "Les coffres ne sont pas dans la sauvegarde : lancez un minuteur quand vous êtes AFK et il sonne à chaque cycle d'auto-ouverture — les durées sont vos vrais cooldowns (base moins vos runes de réduction).", chest_demo: 'cooldowns de démo affichés — connectez votre sauvegarde pour vos minuteurs exacts', chest_full: 'quand le sac est plein, les nouveaux coffres arrêtent de tomber — surveillez la capacité' },
 'de-DE': { tab_chests: 'Truhen', chests_title: 'AUTO-ÖFFNEN-TIMER', chest_normal: 'Normale Truhe', chest_boss: 'Stufenboss-Truhe', chest_act: 'Aktboss-Truhe', chest_every: 'öffnet automatisch alle', chest_cap: 'Kapazität', chest_slots: '{0} Plätze', chest_locked: 'Auto-Öffnen noch nicht freigeschaltet', chest_start: 'Start', chest_stop: 'Stopp', chest_ready: '{0} bereit — automatisch geöffnet', chest_opens: '{0}× geöffnet', chest_vol: 'Alarmlautstärke', chest_test: 'testen', chest_intro: 'Truhen stehen nicht im Spielstand — starte beim AFK einen Timer, der bei jedem Auto-Öffnen-Zyklus piept. Die Zeiten sind deine echten Cooldowns (Basis minus deine Reduktionsrunen).', chest_demo: 'Demo-Cooldowns angezeigt — verbinde deinen Spielstand für deine genauen Timer', chest_full: 'wenn der Rucksack voll ist, droppen keine neuen Truhen mehr — behalte die Kapazität im Auge' },
 'ja-JP': { tab_chests: '宝箱', chests_title: '自動開封タイマー', chest_normal: '通常の宝箱', chest_boss: 'ステージボス宝箱', chest_act: 'アクトボス宝箱', chest_every: '自動開封間隔', chest_cap: '容量', chest_slots: '{0}枠', chest_locked: '自動開封がまだ解放されていません', chest_start: '開始', chest_stop: '停止', chest_ready: '{0} 自動開封しました', chest_opens: '{0}回開封', chest_vol: 'アラート音量', chest_test: 'テスト', chest_intro: '宝箱はセーブに記録されないので、放置中にタイマーを開始すると自動開封のたびに鳴ります。時間はあなたの実際のクールダウン（基本値−軽減ルーン）です。', chest_demo: 'デモのクールダウン表示中 — 正確なタイマーはセーブを接続してください', chest_full: 'バッグが満杯になると新しい宝箱がドロップしなくなります — 容量に注意' },
 'ko-KR': { tab_chests: '상자', chests_title: '자동 개봉 타이머', chest_normal: '일반 상자', chest_boss: '스테이지 보스 상자', chest_act: '액트 보스 상자', chest_every: '자동 개봉 주기', chest_cap: '용량', chest_slots: '{0}칸', chest_locked: '자동 개봉이 아직 해금되지 않음', chest_start: '시작', chest_stop: '정지', chest_ready: '{0} 자동 개봉됨', chest_opens: '{0}회 개봉', chest_vol: '알림 음량', chest_test: '테스트', chest_intro: '상자는 세이브에 없으니 자리비움일 때 타이머를 켜면 자동 개봉 주기마다 알림이 울립니다 — 시간은 당신의 실제 쿨다운(기본값 − 감소 룬)입니다.', chest_demo: '데모 쿨다운 표시 중 — 정확한 타이머는 세이브를 연결하세요', chest_full: '가방이 가득 차면 새 상자가 더 이상 드롭되지 않습니다 — 용량을 확인하세요' },
 'zh-Hans': { tab_chests: '宝箱', chests_title: '自动开启计时器', chest_normal: '普通宝箱', chest_boss: '关卡首领宝箱', chest_act: '章节首领宝箱', chest_every: '自动开启间隔', chest_cap: '容量', chest_slots: '{0} 格', chest_locked: '尚未解锁自动开启', chest_start: '开始', chest_stop: '停止', chest_ready: '{0} 已自动开启', chest_opens: '已开启 {0} 次', chest_vol: '提示音量', chest_test: '测试', chest_intro: '宝箱不在存档里，挂机时启动计时器，每个自动开启周期都会提醒——时长是你的真实冷却（基础值减去你的缩减符文）。', chest_demo: '显示的是演示冷却——连接存档获取你的精确计时', chest_full: '背包满了之后新宝箱就不再掉落——注意容量' },
 'zh-Hant': { tab_chests: '寶箱', chests_title: '自動開啟計時器', chest_normal: '普通寶箱', chest_boss: '關卡首領寶箱', chest_act: '章節首領寶箱', chest_every: '自動開啟間隔', chest_cap: '容量', chest_slots: '{0} 格', chest_locked: '尚未解鎖自動開啟', chest_start: '開始', chest_stop: '停止', chest_ready: '{0} 已自動開啟', chest_opens: '已開啟 {0} 次', chest_vol: '提示音量', chest_test: '測試', chest_intro: '寶箱不在存檔裡，掛機時啟動計時器，每個自動開啟週期都會提醒——時長是你的真實冷卻（基礎值減去你的縮減符文）。', chest_demo: '顯示的是示範冷卻——連接存檔取得你的精確計時', chest_full: '背包滿了之後新寶箱就不再掉落——注意容量' },
 'ru-RU': { tab_chests: 'Сундуки', chests_title: 'ТАЙМЕРЫ АВТООТКРЫТИЯ', chest_normal: 'Обычный сундук', chest_boss: 'Сундук босса этапа', chest_act: 'Сундук босса акта', chest_every: 'автооткрытие каждые', chest_cap: 'вместимость', chest_slots: '{0} слотов', chest_locked: 'автооткрытие ещё не разблокировано', chest_start: 'старт', chest_stop: 'стоп', chest_ready: '{0} автооткрыт', chest_opens: 'открыто {0}×', chest_vol: 'громкость оповещения', chest_test: 'тест', chest_intro: 'Сундуков нет в сохранении, поэтому запустите таймер, когда вы AFK, и он будет пищать в каждом цикле автооткрытия — длительности это ваши реальные кулдауны (база минус ваши руны сокращения).', chest_demo: 'показаны демо-кулдауны — подключите сохранение для точных таймеров', chest_full: 'когда рюкзак полон, новые сундуки перестают выпадать — следите за вместимостью' },
 };
 for (const l in CHEST) { UI[l] = Object.assign(UI[l] || {}, CHEST[l]); }

 // Tab labels for Shop + History were only filled for en/pt — the other 8 main locales
 // fell back to a lowercase English "shop"/"History" that stuck out among translated tabs.
 // (The 6 smaller locales still fall back to English on all tabs by design.)
 const TABFIX = {
 'en-US': { tab_research: 'Shop', tab_hist: 'History' },
 'pt-BR': { tab_research: 'Loja', tab_hist: 'Histórico' },
 'es-ES': { tab_research: 'Tienda', tab_hist: 'Historial' },
 'fr-FR': { tab_research: 'Boutique', tab_hist: 'Historique' },
 'de-DE': { tab_research: 'Shop', tab_hist: 'Verlauf' },
 'ja-JP': { tab_research: 'ショップ', tab_hist: '履歴' },
 'ko-KR': { tab_research: '상점', tab_hist: '기록' },
 'zh-Hans': { tab_research: '商店', tab_hist: '历史' },
 'zh-Hant': { tab_research: '商店', tab_hist: '歷史' },
 'ru-RU': { tab_research: 'Магазин', tab_hist: 'История' },
 };
 for (const l in TABFIX) { UI[l] = Object.assign(UI[l] || {}, TABFIX[l]); }

 // Chest tab disclaimer — the devs are cracking down on reconnect-to-skip-cooldown
 // exploits; make crystal clear this is a passive reminder, not a game-touching tool.
 const CHESTLEGIT = {
 'en-US': { chest_legit: 'Just a passive reminder of your normal cooldown — it never touches the game, reconnects, or bypasses anything.' },
 'pt-BR': { chest_legit: 'Apenas um lembrete passivo do seu cooldown normal — não toca no jogo, não reconecta e não burla nada.' },
 'es-ES': { chest_legit: 'Solo un recordatorio pasivo de tu cooldown normal — nunca toca el juego, ni reconecta, ni elude nada.' },
 'fr-FR': { chest_legit: 'Juste un rappel passif de votre cooldown normal — il ne touche jamais au jeu, ne reconnecte rien et ne contourne rien.' },
 'de-DE': { chest_legit: 'Nur eine passive Erinnerung an deinen normalen Cooldown — es greift nie ins Spiel ein, verbindet nichts neu und umgeht nichts.' },
 'ja-JP': { chest_legit: '通常クールダウンの受動的なリマインダーです — ゲームには一切干渉せず、再接続も回避もしません。' },
 'ko-KR': { chest_legit: '평범한 쿨다운을 알려주는 수동적 알림일 뿐입니다 — 게임에 관여하거나 재접속하거나 우회하지 않습니다.' },
 'zh-Hans': { chest_legit: '只是被动提醒你正常的冷却时间——它不会接触游戏、不会重连、也不会绕过任何机制。' },
 'zh-Hant': { chest_legit: '只是被動提醒你正常的冷卻時間——它不會接觸遊戲、不會重連、也不會繞過任何機制。' },
 'ru-RU': { chest_legit: 'Просто пассивное напоминание о вашем обычном кулдауне — оно не трогает игру, не переподключается и ничего не обходит.' },
 };
 for (const l in CHESTLEGIT) { UI[l] = Object.assign(UI[l] || {}, CHESTLEGIT[l]); }

 // Chest PLANNER rework: keep the auto-open cycle, add the real shared field-drop cooldown
 // (~5 min, server-side, global — rotating stages can't earn more chests) and a save-driven
 // "best stage for chest loot" using the player's real clear time. chests_title is overridden
 // here so the tab reads "CHEST PLANNER" instead of the old "AUTO-OPEN TIMERS".
 const CHESTPLAN = {
 'en-US': { chests_title: 'CHEST PLANNER', chest_auto_title: 'AUTO-OPEN CYCLE', chest_fill: 'fills in ~{0} without auto-open', chest_slow: 'opens slower than drops — slowly stockpiles', chest_drop_title: 'FIELD-DROP COOLDOWN', chest_drop_desc: 'Chests are server-limited to about 1 every 5 min — one cooldown shared across every chest type. It’s global, not per-stage, so rotating stages can’t earn more chests (community-measured).', chest_dropped: 'chest dropped', chest_next: 'next drop in', chest_farm_title: 'BEST STAGE FOR CHEST LOOT', chest_farm_wishlist: 'top stage for your starred gear', chest_farm_rec: 'your recommended farm stage', chest_clear: 'clear ~{0}', chest_farm_window: '~{0} clears per drop window', chest_farm_note: 'The shared cooldown caps how many chests you get — so farm where the loot is best, not for more chests.', chest_farm_model: 'clear time is a rough model estimate — play a live session to calibrate it' },
 'pt-BR': { chests_title: 'PLANEJADOR DE BAÚS', chest_auto_title: 'CICLO DE AUTO-ABRIR', chest_fill: 'enche em ~{0} sem auto-abrir', chest_slow: 'abre mais devagar do que dropa — acumula aos poucos', chest_drop_title: 'COOLDOWN DE DROP', chest_drop_desc: 'Os baús são limitados pelo servidor a ~1 a cada 5 min — um único cooldown compartilhado entre todos os tipos. É global, não por-stage, então girar entre stages não rende mais baús (medido pela comunidade).', chest_dropped: 'baú dropou', chest_next: 'próximo drop em', chest_farm_title: 'MELHOR STAGE PRA LOOT DE BAÚ', chest_farm_wishlist: 'melhor stage pros itens que você favoritou', chest_farm_rec: 'sua stage de farm recomendada', chest_clear: 'clear ~{0}', chest_farm_window: '~{0} clears por janela de drop', chest_farm_note: 'O cooldown compartilhado limita quantos baús você pega — então farme onde o loot é melhor, não por mais baús.', chest_farm_model: 'o tempo de clear é uma estimativa do modelo — jogue uma sessão ao vivo pra calibrar' },
 'es-ES': { chests_title: 'PLANIFICADOR DE COFRES', chest_auto_title: 'CICLO DE AUTOAPERTURA', chest_fill: 'se llena en ~{0} sin autoapertura', chest_slow: 'se abre más lento de lo que cae — se acumula poco a poco', chest_drop_title: 'COOLDOWN DE CAÍDA', chest_drop_desc: 'Los cofres están limitados por el servidor a ~1 cada 5 min — un único cooldown compartido entre todos los tipos. Es global, no por etapa, así que rotar etapas no te da más cofres (medido por la comunidad).', chest_dropped: 'cayó un cofre', chest_next: 'próxima caída en', chest_farm_title: 'MEJOR ETAPA PARA BOTÍN DE COFRES', chest_farm_wishlist: 'mejor etapa para tu equipo marcado', chest_farm_rec: 'tu etapa de farmeo recomendada', chest_clear: 'limpieza ~{0}', chest_farm_window: '~{0} limpiezas por ventana de caída', chest_farm_note: 'El cooldown compartido limita cuántos cofres consigues — así que farmea donde el botín es mejor, no por más cofres.', chest_farm_model: 'el tiempo de limpieza es una estimación aproximada — juega una sesión en vivo para calibrarlo' },
 'fr-FR': { chests_title: 'PLANIFICATEUR DE COFFRES', chest_auto_title: 'CYCLE D’AUTO-OUVERTURE', chest_fill: 'se remplit en ~{0} sans auto-ouverture', chest_slow: 'ouvre plus lentement qu’il ne tombe — s’accumule peu à peu', chest_drop_title: 'COOLDOWN DE DROP', chest_drop_desc: 'Les coffres sont limités par le serveur à ~1 toutes les 5 min — un seul cooldown partagé entre tous les types. Il est global, pas par étape, donc changer d’étape ne donne pas plus de coffres (mesuré par la communauté).', chest_dropped: 'coffre tombé', chest_next: 'prochain drop dans', chest_farm_title: 'MEILLEURE ÉTAPE POUR LE BUTIN', chest_farm_wishlist: 'meilleure étape pour votre équipement favori', chest_farm_rec: 'votre étape de farm recommandée', chest_clear: 'clear ~{0}', chest_farm_window: '~{0} clears par fenêtre de drop', chest_farm_note: 'Le cooldown partagé plafonne le nombre de coffres — farmez donc là où le butin est le meilleur, pas pour plus de coffres.', chest_farm_model: 'le temps de clear est une estimation approximative — jouez une session en direct pour le calibrer' },
 'de-DE': { chests_title: 'TRUHEN-PLANER', chest_auto_title: 'AUTO-ÖFFNEN-ZYKLUS', chest_fill: 'füllt sich in ~{0} ohne Auto-Öffnen', chest_slow: 'öffnet langsamer als es droppt — staut sich langsam an', chest_drop_title: 'FELD-DROP-COOLDOWN', chest_drop_desc: 'Truhen sind serverseitig auf ~1 alle 5 Min begrenzt — ein einziger Cooldown, geteilt über alle Truhentypen. Er ist global, nicht pro Stufe, also bringt der Stufenwechsel keine zusätzlichen Truhen (von der Community gemessen).', chest_dropped: 'Truhe gedroppt', chest_next: 'nächster Drop in', chest_farm_title: 'BESTE STUFE FÜR TRUHEN-LOOT', chest_farm_wishlist: 'beste Stufe für deine markierte Ausrüstung', chest_farm_rec: 'deine empfohlene Farm-Stufe', chest_clear: 'Clear ~{0}', chest_farm_window: '~{0} Clears pro Drop-Fenster', chest_farm_note: 'Der geteilte Cooldown begrenzt die Truhenzahl — farme also dort, wo der Loot am besten ist, nicht für mehr Truhen.', chest_farm_model: 'die Clear-Zeit ist eine grobe Modellschätzung — spiele eine Live-Sitzung zum Kalibrieren' },
 'ja-JP': { chests_title: '宝箱プランナー', chest_auto_title: '自動開封サイクル', chest_fill: '自動開封なしで約{0}で満杯', chest_slow: 'ドロップより開封が遅い — 少しずつ溜まる', chest_drop_title: 'フィールドドロップのクールダウン', chest_drop_desc: '宝箱はサーバー側で約5分に1個に制限されています — すべての宝箱タイプで共有される1つのクールダウンです。ステージごとではなくグローバルなので、ステージを回しても宝箱は増えません（コミュニティ計測）。', chest_dropped: '宝箱ドロップ', chest_next: '次のドロップまで', chest_farm_title: '宝箱集めに最適なステージ', chest_farm_wishlist: 'お気に入り装備に最適なステージ', chest_farm_rec: 'おすすめの周回ステージ', chest_clear: 'クリア約{0}', chest_farm_window: 'ドロップ間に約{0}回クリア', chest_farm_note: '共有クールダウンで宝箱の数は頭打ちです — だから数ではなく、戦利品が一番良い場所で周回しましょう。', chest_farm_model: 'クリア時間は大まかな推定値です — ライブセッションをプレイして補正してください' },
 'ko-KR': { chests_title: '상자 플래너', chest_auto_title: '자동 개봉 주기', chest_fill: '자동 개봉 없이 약 {0}에 가득 참', chest_slow: '드롭보다 개봉이 느림 — 조금씩 쌓임', chest_drop_title: '필드 드롭 쿨다운', chest_drop_desc: '상자는 서버에서 약 5분에 1개로 제한됩니다 — 모든 상자 유형이 공유하는 단일 쿨다운입니다. 스테이지별이 아니라 전역이라 스테이지를 돌려도 상자가 더 나오지 않습니다(커뮤니티 측정).', chest_dropped: '상자 드롭됨', chest_next: '다음 드롭까지', chest_farm_title: '상자 전리품 최적 스테이지', chest_farm_wishlist: '즐겨찾기한 장비에 최적인 스테이지', chest_farm_rec: '추천 파밍 스테이지', chest_clear: '클리어 약 {0}', chest_farm_window: '드롭 주기당 약 {0}회 클리어', chest_farm_note: '공유 쿨다운이 상자 수를 제한하므로 — 더 많은 상자가 아니라 전리품이 가장 좋은 곳에서 파밍하세요.', chest_farm_model: '클리어 시간은 대략적인 모델 추정치입니다 — 라이브 세션을 플레이해 보정하세요' },
 'zh-Hans': { chests_title: '宝箱规划器', chest_auto_title: '自动开启周期', chest_fill: '无自动开启时约 {0} 装满', chest_slow: '开启比掉落慢——会慢慢堆积', chest_drop_title: '掉落冷却', chest_drop_desc: '宝箱被服务器限制为大约每 5 分钟 1 个——所有宝箱类型共享一个冷却。它是全局的，不是按关卡的，所以轮换关卡并不会获得更多宝箱（社区实测）。', chest_dropped: '宝箱已掉落', chest_next: '下次掉落', chest_farm_title: '宝箱掉落最佳关卡', chest_farm_wishlist: '你收藏装备的最佳关卡', chest_farm_rec: '你的推荐刷怪关卡', chest_clear: '清关约 {0}', chest_farm_window: '每个掉落周期约 {0} 次清关', chest_farm_note: '共享冷却限制了宝箱数量——所以去掉落最好的地方刷，而不是为了更多宝箱。', chest_farm_model: '清关时间只是粗略的模型估计——进行一次实时游戏来校准它' },
 'zh-Hant': { chests_title: '寶箱規劃器', chest_auto_title: '自動開啟週期', chest_fill: '無自動開啟時約 {0} 裝滿', chest_slow: '開啟比掉落慢——會慢慢堆積', chest_drop_title: '掉落冷卻', chest_drop_desc: '寶箱被伺服器限制為大約每 5 分鐘 1 個——所有寶箱類型共享一個冷卻。它是全域的，不是按關卡的，所以輪換關卡並不會獲得更多寶箱（社群實測）。', chest_dropped: '寶箱已掉落', chest_next: '下次掉落', chest_farm_title: '寶箱掉落最佳關卡', chest_farm_wishlist: '你收藏裝備的最佳關卡', chest_farm_rec: '你的推薦刷怪關卡', chest_clear: '清關約 {0}', chest_farm_window: '每個掉落週期約 {0} 次清關', chest_farm_note: '共享冷卻限制了寶箱數量——所以去掉落最好的地方刷，而不是為了更多寶箱。', chest_farm_model: '清關時間只是粗略的模型估計——進行一次即時遊戲來校準它' },
 'ru-RU': { chests_title: 'ПЛАНИРОВЩИК СУНДУКОВ', chest_auto_title: 'ЦИКЛ АВТООТКРЫТИЯ', chest_fill: 'заполнится за ~{0} без автооткрытия', chest_slow: 'открывает медленнее, чем выпадает — медленно накапливается', chest_drop_title: 'КУЛДАУН ВЫПАДЕНИЯ', chest_drop_desc: 'Сундуки ограничены сервером примерно до 1 раза в 5 мин — единый кулдаун, общий для всех типов сундуков. Он глобальный, а не по этапам, поэтому смена этапов не даёт больше сундуков (по замерам сообщества).', chest_dropped: 'сундук выпал', chest_next: 'следующий через', chest_farm_title: 'ЛУЧШИЙ ЭТАП ДЛЯ ЛУТА СУНДУКОВ', chest_farm_wishlist: 'лучший этап для отмеченного снаряжения', chest_farm_rec: 'ваш рекомендованный этап фарма', chest_clear: 'зачистка ~{0}', chest_farm_window: '~{0} зачисток за окно выпадения', chest_farm_note: 'Общий кулдаун ограничивает число сундуков — так что фармите там, где лучше лут, а не ради большего числа сундуков.', chest_farm_model: 'время зачистки — грубая оценка модели — сыграйте живую сессию для калибровки' },
 };
 for (const l in CHESTPLAN) { UI[l] = Object.assign(UI[l] || {}, CHESTPLAN[l]); }

 const CHESTREADY = {
 'en-US': { chest_drop_ready: 'a chest can drop now' }, 'pt-BR': { chest_drop_ready: 'um baú já pode dropar' },
 'es-ES': { chest_drop_ready: 'ya puede caer un cofre' }, 'fr-FR': { chest_drop_ready: 'un coffre peut tomber' },
 'de-DE': { chest_drop_ready: 'eine Truhe kann jetzt droppen' }, 'ja-JP': { chest_drop_ready: '宝箱がドロップ可能になりました' },
 'ko-KR': { chest_drop_ready: '이제 상자가 드롭될 수 있습니다' }, 'zh-Hans': { chest_drop_ready: '现在可以掉落宝箱了' },
 'zh-Hant': { chest_drop_ready: '現在可以掉落寶箱了' }, 'ru-RU': { chest_drop_ready: 'сундук может выпасть' },
 };
 for (const l in CHESTREADY) { UI[l] = Object.assign(UI[l] || {}, CHESTREADY[l]); }

 // Post-review refinements (adversarial pass): the per-type fill annotation goes qualitative
 // (a capacity*300s number wrongly assumed the shared drop cooldown was per-type); the
 // drop card is reframed as an OPTIONAL manual reminder (not synced to the game) with a hint
 // and a "remind me" toggle; the drop title keeps the "field" qualifier in every locale; the
 // farm card's per-window count becomes a presence reassurance (a count re-implied "more
 // clears = more chests", the misconception the section exists to kill).
 const CHESTPLAN2 = {
 'en-US': { chest_drop_title: 'FIELD-DROP COOLDOWN', chest_drop_desc: 'About 1 chest every ~5 min, shared across all chest types — so rotating stages won’t earn extra (community-measured).', chest_drop_hint: 'Optional manual reminder — tap to get a ping ~5 min later to come back and collect. Not synced to the game.', chest_remind: 'remind me', chest_next: 'next in ~', chest_fill: 'no auto-open — these pile up until you open them', chest_farm_window: 'you’ll finish a clear within each ~5 min drop window' },
 'pt-BR': { chest_drop_title: 'COOLDOWN DE DROP NO MAPA', chest_drop_desc: 'Cerca de 1 baú a cada ~5 min, compartilhado entre todos os tipos — então girar entre stages não rende baús extras (medido pela comunidade).', chest_drop_hint: 'Lembrete manual opcional — toque pra receber um ping ~5 min depois pra voltar e coletar. Não é sincronizado com o jogo.', chest_remind: 'me lembrar', chest_next: 'próximo em ~', chest_fill: 'sem auto-abrir — vão acumulando até você abrir', chest_farm_window: 'você termina um clear dentro de cada janela de ~5 min' },
 'es-ES': { chest_drop_title: 'COOLDOWN DE CAÍDA EN EL MAPA', chest_drop_desc: 'Alrededor de 1 cofre cada ~5 min, compartido entre todos los tipos — así que rotar etapas no da cofres extra (medido por la comunidad).', chest_drop_hint: 'Recordatorio manual opcional — toca para recibir un aviso ~5 min después y volver a recoger. No sincronizado con el juego.', chest_remind: 'recordarme', chest_next: 'próximo en ~', chest_fill: 'sin autoapertura — se acumulan hasta que los abras', chest_farm_window: 'terminas una limpieza dentro de cada ventana de ~5 min' },
 'fr-FR': { chest_drop_title: 'COOLDOWN DE DROP SUR LE TERRAIN', chest_drop_desc: 'Environ 1 coffre toutes les ~5 min, partagé entre tous les types — changer d’étape ne rapporte donc pas de coffres en plus (mesuré par la communauté).', chest_drop_hint: 'Rappel manuel optionnel — touchez pour un ping ~5 min plus tard et revenir récupérer. Non synchronisé au jeu.', chest_remind: 'me rappeler', chest_next: 'prochain dans ~', chest_fill: 'sans auto-ouverture — ils s’accumulent jusqu’à ce que vous les ouvriez', chest_farm_window: 'vous finissez un clear dans chaque fenêtre de ~5 min' },
 'de-DE': { chest_drop_title: 'FELD-DROP-COOLDOWN', chest_drop_desc: 'Etwa 1 Truhe alle ~5 Min, geteilt über alle Typen — Stufenwechsel bringt also keine extra Truhen (von der Community gemessen).', chest_drop_hint: 'Optionale manuelle Erinnerung — tippe für einen Ping ~5 Min später zum Einsammeln. Nicht mit dem Spiel synchronisiert.', chest_remind: 'erinnern', chest_next: 'nächster in ~', chest_fill: 'ohne Auto-Öffnen — sie häufen sich an, bis du sie öffnest', chest_farm_window: 'du schaffst einen Clear in jedem ~5-Min-Fenster' },
 'ja-JP': { chest_drop_title: 'フィールドドロップのクールダウン', chest_drop_desc: 'すべての宝箱タイプで共有され、約5分に1個ほど — だからステージを回しても宝箱は増えません（コミュニティ計測）。', chest_drop_hint: '任意の手動リマインダー — タップすると約5分後に回収を促す通知が鳴ります。ゲームとは同期しません。', chest_remind: 'リマインド', chest_next: '次まで約', chest_fill: '自動開封なし — 開けるまで溜まっていきます', chest_farm_window: '約5分ごとのドロップ窓内に1クリアが収まります' },
 'ko-KR': { chest_drop_title: '필드 드롭 쿨다운', chest_drop_desc: '모든 상자 유형이 공유하며 약 5분에 1개 정도 — 그래서 스테이지를 돌려도 상자가 더 늘지 않습니다(커뮤니티 측정).', chest_drop_hint: '선택적 수동 알림 — 누르면 약 5분 뒤에 돌아와 줍도록 알림이 울립니다. 게임과 동기화되지 않습니다.', chest_remind: '알림 설정', chest_next: '다음까지 약', chest_fill: '자동 개봉 없음 — 열 때까지 쌓입니다', chest_farm_window: '약 5분 드롭 주기마다 클리어를 끝낼 수 있습니다' },
 'zh-Hans': { chest_drop_title: '掉落冷却（场上）', chest_drop_desc: '所有宝箱类型共享，大约每 5 分钟 1 个——所以轮换关卡不会多出宝箱（社区实测）。', chest_drop_hint: '可选的手动提醒——点一下，约 5 分钟后会提醒你回来收取。不与游戏同步。', chest_remind: '提醒我', chest_next: '下次约', chest_fill: '无自动开启——会一直堆积，直到你打开', chest_farm_window: '你能在每个约 5 分钟的掉落周期内打完一次' },
 'zh-Hant': { chest_drop_title: '掉落冷卻（場上）', chest_drop_desc: '所有寶箱類型共享，大約每 5 分鐘 1 個——所以輪換關卡不會多出寶箱（社群實測）。', chest_drop_hint: '可選的手動提醒——點一下，約 5 分鐘後會提醒你回來收取。不與遊戲同步。', chest_remind: '提醒我', chest_next: '下次約', chest_fill: '無自動開啟——會一直堆積，直到你打開', chest_farm_window: '你能在每個約 5 分鐘的掉落週期內打完一次' },
 'ru-RU': { chest_drop_title: 'КУЛДАУН ВЫПАДЕНИЯ НА ПОЛЕ', chest_drop_desc: 'Около 1 сундука каждые ~5 мин, общий для всех типов — так что смена этапов не даёт лишних сундуков (по замерам сообщества).', chest_drop_hint: 'Необязательное ручное напоминание — нажмите, чтобы через ~5 мин получить пинг и вернуться за сундуком. Не синхронизировано с игрой.', chest_remind: 'напомнить', chest_next: 'следующий через ~', chest_fill: 'без автооткрытия — копятся, пока не откроете', chest_farm_window: 'вы успеваете зачистку в каждом окне ~5 мин' },
 };
 for (const l in CHESTPLAN2) { UI[l] = Object.assign(UI[l] || {}, CHESTPLAN2[l]); }

 // Backfill the UI chrome that was only authored in en + pt — panel titles, the
 // recommended-action sentences, party-comp/survival/role labels, difficulty names, the
 // farm-calibration UI, history summaries, the Shop tab filters and refresh toasts — so
 // the 10 main locales are fully covered instead of leaking English. (The 6 smaller
 // locales still fall back to English by design.) smoke.cjs enforces this going forward.
 const LOCALIZE = {
 'es-ES': { summary: 'resumen', farm_clear: 'tiempo de limpieza', farm_drops: 'mejores drops + oro aquí', tree_fit: 'ajustar', tree_reset: 'reiniciar', node_locked: 'desbloquea antes el nodo anterior', a_tank: 'Pon a {0} como tanque — tu grupo no tiene línea de frente', a_enchant: 'Encanta {0} ranuras de afijo libres — tu mayor palanca de equipo (todas vacías)', a_synthesis: 'Sintetiza equipo {1} sobrante a un grado superior', a_pet: 'Equipa una mejor mascota para tu objetivo', comp_title: 'composición del grupo', comp_notank: 'sin tanque, frente frágil', comp_hastank: 'línea de frente cubierta ', comp_solo: 'build en solitario · un héroe', surv_push: 'preparación para avanzar', surv_comfortable: 'listo ', surv_tight: 'justo', surv_risky: 'arriesgado — necesitas más EHP/DPS', role_tank: 'tanque', role_bruiser: 'peleador', role_support: 'apoyo', role_dps: 'dps', role_caster: 'mago', fielded: 'en grupo', d_normal: 'Normal', d_nightmare: 'Pesadilla', d_hell: 'Infierno', d_torment: 'Tormento', f_caledit: 'tus tiempos de limpieza', f_caltime: 'segundos', f_caladd: 'añadir', f_calmax: 'máx', f_calextra: 'afinar', f_vlevel: 'Nivel', f_vgold: 'Oro', f_projnote: 'estimación · rellena tus tiempos arriba para que sea exacto', f_calhint: 'tiempo real de limpieza en segundos · 2+ etapas', f_calman: 'calibrado con tus {0} tiempos introducidos', f_stages: 'ETAPAS', f_calneed: '1 introducido — añade otra etapa para aplicar', refresh_save: 'Releer la partida ahora', gsl_pre: 'habilitar hasta', gsl_off: 'todos', gsl_n: 'nodos', hist_power: 'HISTORIAL · PODER', hist_gold: 'HISTORIAL · ORO', hist_note: 'Se acumula mientras juegas.', hist_pow_sum: '{0} muestras · PODER {1} → {2} ({3})', hist_gold_sum: 'oro {0} → {1}', hist_collecting: 'Recopilando… déjalo abierto mientras juegas.', refreshed: 'Recargado', refresh_savedat: 'partida de {0}', refresh_nosync: '¿Desincronizado? El juego aún no ha guardado.', a_fire: '{0} (tu línea de frente) tiene poca resistencia al fuego — consigue algo antes de los mapas de fuego desde 3-6', gear_lvl: 'hasta nivel', g_have: 'tienes', g_sellonly: 'solo en Steam', rs_title: 'TIENDA · planifica y compra efectos', rs_cart: 'CARRITO', rs_none: 'Ningún material concede eso — prueba otras stats.', rs_cartempty: 'Añade materiales abajo para planear tus compras.', rs_total: 'total', rs_openall: 'abrir todo en Steam', rs_pickstat: 'elige las stats que quieres:', rs_have: 'tienes', rs_all: 'todos', rs_type: 'tipo', rs_slot: 'ranura', rs_clear: 'limpiar', rs_missing: '{0} sin precio', rs_slot_weapon: 'Arma', rs_slot_armor: 'Armadura', rs_slot_accessory: 'Accesorio', rs_allslots: 'todas las ranuras' },
 'fr-FR': { summary: 'résumé', farm_clear: 'temps de clear', farm_drops: 'meilleurs butins + or ici', tree_fit: 'ajuster', tree_reset: 'réinit.', node_locked: 'débloquez d’abord le nœud précédent', a_tank: 'Placez {0} en tank — votre groupe n’a pas de ligne de front', a_enchant: 'Enchantez {0} emplacements d’affixe libres — votre plus gros levier d’équipement (tous vides)', a_synthesis: 'Synthétisez l’équipement {1} en trop vers un grade supérieur', a_pet: 'Équipez un meilleur familier pour votre objectif', comp_title: 'composition du groupe', comp_notank: 'pas de tank, front fragile', comp_hastank: 'ligne de front assurée ', comp_solo: 'build solo · un héros', surv_push: 'prêt à avancer', surv_comfortable: 'prêt ', surv_tight: 'serré', surv_risky: 'risqué — plus d’EHP/DPS nécessaires', role_tank: 'tank', role_bruiser: 'bagarreur', role_support: 'soutien', role_dps: 'dps', role_caster: 'mage', fielded: 'dans le groupe', d_normal: 'Normal', d_nightmare: 'Cauchemar', d_hell: 'Enfer', d_torment: 'Tourment', f_caledit: 'vos temps de clear', f_caltime: 'secondes', f_caladd: 'ajouter', f_calmax: 'max', f_calextra: 'affiner', f_vlevel: 'Niveau', f_vgold: 'Or', f_projnote: 'estimation · remplissez vos temps ci-dessus pour la rendre exacte', f_calhint: 'temps réel de clear en secondes · 2+ étages', f_calman: 'calibré sur vos {0} temps saisis', f_stages: 'ÉTAGES', f_calneed: '1 saisi — ajoutez un autre étage pour appliquer', refresh_save: 'Relire la sauvegarde', gsl_pre: 'activer jusqu’à', gsl_off: 'tout', gsl_n: 'nœuds', hist_power: 'HISTORIQUE · PUISSANCE', hist_gold: 'HISTORIQUE · OR', hist_note: 'S’accumule au fil du jeu.', hist_pow_sum: '{0} échantillons · PUISSANCE {1} → {2} ({3})', hist_gold_sum: 'or {0} → {1}', hist_collecting: 'Collecte… laissez ouvert pendant que vous jouez.', refreshed: 'Rechargé', refresh_savedat: 'sauvegarde de {0}', refresh_nosync: 'Désynchronisé ? Le jeu n’a pas encore écrit sa sauvegarde.', a_fire: '{0} (votre ligne de front) a peu de résistance au feu — équipez-en avant les cartes de feu dès 3-6', gear_lvl: 'jusqu’au niveau', g_have: 'possédé', g_sellonly: 'seulement sur Steam', rs_title: 'BOUTIQUE · planifiez et achetez des effets', rs_cart: 'PANIER', rs_none: 'Aucun matériau ne donne ça — essayez d’autres stats.', rs_cartempty: 'Ajoutez des matériaux ci-dessous pour planifier vos achats.', rs_total: 'total', rs_openall: 'tout ouvrir sur Steam', rs_pickstat: 'choisissez les stats voulues :', rs_have: 'possédé', rs_all: 'tout', rs_type: 'type', rs_slot: 'emplacement', rs_clear: 'effacer', rs_missing: '{0} sans prix', rs_slot_weapon: 'Arme', rs_slot_armor: 'Armure', rs_slot_accessory: 'Accessoire', rs_allslots: 'tous les emplacements' },
 'de-DE': { summary: 'Übersicht', farm_clear: 'Clear-Zeit', farm_drops: 'beste Drops + Gold hier', tree_fit: 'einpassen', tree_reset: 'zurücksetzen', node_locked: 'schalte zuerst den vorherigen Knoten frei', a_tank: 'Setze {0} als Tank ein — deiner Gruppe fehlt die Frontlinie', a_enchant: 'Verzaubere {0} offene Affix-Slots — dein größter Ausrüstungshebel (alle leer)', a_synthesis: 'Synthetisiere überschüssige {1}-Ausrüstung zu einer höheren Stufe', a_pet: 'Rüste einen besseren Begleiter für dein Ziel aus', comp_title: 'Gruppenzusammensetzung', comp_notank: 'kein Tank, fragile Front', comp_hastank: 'Frontlinie abgedeckt ', comp_solo: 'Solo-Build · ein Held', surv_push: 'Push-Bereitschaft', surv_comfortable: 'bereit ', surv_tight: 'knapp', surv_risky: 'riskant — mehr EHP/DPS nötig', role_tank: 'Tank', role_bruiser: 'Bruiser', role_support: 'Support', role_dps: 'DPS', role_caster: 'Caster', fielded: 'in der Gruppe', d_normal: 'Normal', d_nightmare: 'Albtraum', d_hell: 'Hölle', d_torment: 'Qual', f_caledit: 'deine Clear-Zeiten', f_caltime: 'Sekunden', f_caladd: 'hinzu', f_calmax: 'max', f_calextra: 'verfeinern', f_vlevel: 'Level', f_vgold: 'Gold', f_projnote: 'Schätzung · trage oben deine Clear-Zeiten ein für Genauigkeit', f_calhint: 'echte Clear-Zeit in Sekunden · 2+ Stufen', f_calman: 'kalibriert aus deinen {0} eingegebenen Zeiten', f_stages: 'STUFEN', f_calneed: '1 eingegeben — füge eine weitere Stufe hinzu', refresh_save: 'Spielstand neu lesen', gsl_pre: 'aktivieren bis', gsl_off: 'alle', gsl_n: 'Knoten', hist_power: 'VERLAUF · MACHT', hist_gold: 'VERLAUF · GOLD', hist_note: 'Wächst, während du spielst.', hist_pow_sum: '{0} Messpunkte · MACHT {1} → {2} ({3})', hist_gold_sum: 'Gold {0} → {1}', hist_collecting: 'Sammle… lass es offen, während du spielst.', refreshed: 'Neu geladen', refresh_savedat: 'Spielstand von {0}', refresh_nosync: 'Nicht synchron? Das Spiel hat noch nicht gespeichert.', a_fire: '{0} (deine Frontlinie) hat wenig Feuerresistenz — besorg welche vor den Feuer-Maps ab 3-6', gear_lvl: 'bis Level', g_have: 'im Besitz', g_sellonly: 'nur auf Steam', rs_title: 'SHOP · Effekte planen & kaufen', rs_cart: 'WARENKORB', rs_none: 'Kein Material gibt das — probiere andere Stats.', rs_cartempty: 'Füge unten Materialien hinzu, um deine Käufe zu planen.', rs_total: 'gesamt', rs_openall: 'alle auf Steam öffnen', rs_pickstat: 'wähle die gewünschten Stats:', rs_have: 'vorhanden', rs_all: 'alle', rs_type: 'Typ', rs_slot: 'Slot', rs_clear: 'leeren', rs_missing: '{0} ohne Preis', rs_slot_weapon: 'Waffe', rs_slot_armor: 'Rüstung', rs_slot_accessory: 'Accessoire', rs_allslots: 'alle Slots' },
 'ja-JP': { summary: '概要', farm_clear: 'クリア時間', farm_drops: 'ここがドロップ+ゴールド最良', tree_fit: 'フィット', tree_reset: 'リセット', node_locked: '先に前のノードを解放してください', a_tank: '{0} をタンクとして編成 — パーティに前衛がいません', a_enchant: '空きの接尾辞スロット {0} 個をエンチャント — 最大の装備の伸びしろ（すべて空）', a_synthesis: '余った {1} 装備を上位グレードに合成', a_pet: '目的に合う良いペットを装備', comp_title: 'パーティ構成', comp_notank: 'タンクなし・前衛が脆い', comp_hastank: '前衛は確保 ', comp_solo: 'ソロ構成・ヒーロー1人', surv_push: '進攻準備', surv_comfortable: '準備OK ', surv_tight: 'ギリギリ', surv_risky: '危険 — EHP/DPSが必要', role_tank: 'タンク', role_bruiser: 'ブルーザー', role_support: 'サポート', role_dps: 'DPS', role_caster: 'キャスター', fielded: '編成中', d_normal: 'ノーマル', d_nightmare: 'ナイトメア', d_hell: 'ヘル', d_torment: 'トーメント', f_caledit: 'あなたのクリア時間', f_caltime: '秒', f_caladd: '追加', f_calmax: '最大', f_calextra: '微調整', f_vlevel: 'レベル', f_vgold: 'ゴールド', f_projnote: '推定値 · 上にクリア時間を入れると正確になります', f_calhint: '実際のクリア時間（秒）· 2ステージ以上', f_calman: '入力した {0} 件のクリア時間で較正', f_stages: 'ステージ', f_calneed: '1件入力 — もう1ステージ追加で適用', refresh_save: 'セーブを再読み込み', gsl_pre: '有効化する上限', gsl_off: 'すべて', gsl_n: 'ノード', hist_power: '履歴 · POWER', hist_gold: '履歴 · ゴールド', hist_note: 'プレイ中に蓄積されます。', hist_pow_sum: '{0} サンプル · POWER {1} → {2} ({3})', hist_gold_sum: 'ゴールド {0} → {1}', hist_collecting: '収集中… プレイ中は開いたままに。', refreshed: '再読み込み', refresh_savedat: '{0} のセーブ', refresh_nosync: 'ずれていますか？ ゲームがまだ保存していません。', a_fire: '{0}（前衛）は火耐性が低い — 3-6 以降の火マップ前に確保を', gear_lvl: 'レベル上限', g_have: '所持', g_sellonly: 'Steamのみ', rs_title: 'ショップ · 効果を計画して購入', rs_cart: 'カート', rs_none: 'それを付与する素材なし — 他のステータスを試して。', rs_cartempty: '下から素材を追加して購入を計画。', rs_total: '合計', rs_openall: 'Steamですべて開く', rs_pickstat: '欲しいステータスを選択：', rs_have: '所持', rs_all: 'すべて', rs_type: '種類', rs_slot: 'スロット', rs_clear: 'クリア', rs_missing: '{0} 価格なし', rs_slot_weapon: '武器', rs_slot_armor: '防具', rs_slot_accessory: 'アクセサリー', rs_allslots: 'すべてのスロット' },
 'ko-KR': { summary: '요약', farm_clear: '클리어 시간', farm_drops: '여기 드롭+골드 최고', tree_fit: '맞춤', tree_reset: '초기화', node_locked: '이전 노드를 먼저 해금하세요', a_tank: '{0}을(를) 탱커로 편성 — 파티에 전열이 없습니다', a_enchant: '빈 접사 슬롯 {0}개 인챈트 — 가장 큰 장비 성장 요소(전부 비어 있음)', a_synthesis: '남는 {1} 장비를 상위 등급으로 합성', a_pet: '목표에 맞는 더 좋은 펫 장착', comp_title: '파티 구성', comp_notank: '탱커 없음·전열이 약함', comp_hastank: '전열 확보됨 ', comp_solo: '솔로 빌드·영웅 1명', surv_push: '진행 준비도', surv_comfortable: '준비됨 ', surv_tight: '빠듯함', surv_risky: '위험 — EHP/DPS 필요', role_tank: '탱커', role_bruiser: '브루저', role_support: '서포터', role_dps: '딜러', role_caster: '캐스터', fielded: '편성됨', d_normal: '노멀', d_nightmare: '나이트메어', d_hell: '헬', d_torment: '토먼트', f_caledit: '내 클리어 시간', f_caltime: '초', f_caladd: '추가', f_calmax: '최대', f_calextra: '보정', f_vlevel: '레벨', f_vgold: '골드', f_projnote: '추정치 · 위에 클리어 시간을 채우면 정확해집니다', f_calhint: '실제 클리어 시간(초) · 2스테이지 이상', f_calman: '입력한 {0}개 클리어 시간으로 보정', f_stages: '스테이지', f_calneed: '1개 입력 — 스테이지 하나 더 추가하면 적용', refresh_save: '세이브 다시 읽기', gsl_pre: '활성화 상한', gsl_off: '전체', gsl_n: '노드', hist_power: '기록 · POWER', hist_gold: '기록 · 골드', hist_note: '플레이하면서 쌓입니다.', hist_pow_sum: '{0} 샘플 · POWER {1} → {2} ({3})', hist_gold_sum: '골드 {0} → {1}', hist_collecting: '수집 중… 플레이하는 동안 열어 두세요.', refreshed: '새로고침됨', refresh_savedat: '{0}의 세이브', refresh_nosync: '동기화 안 됨? 게임이 아직 저장하지 않았습니다.', a_fire: '{0}(전열)의 화염 저항이 낮음 — 3-6부터의 화염 맵 전에 확보하세요', gear_lvl: '레벨 상한', g_have: '보유', g_sellonly: 'Steam 전용', rs_title: '상점 · 효과 계획 및 구매', rs_cart: '장바구니', rs_none: '그걸 주는 재료가 없음 — 다른 스탯을 시도.', rs_cartempty: '아래에서 재료를 추가해 구매를 계획하세요.', rs_total: '합계', rs_openall: 'Steam에서 모두 열기', rs_pickstat: '원하는 스탯을 선택:', rs_have: '보유', rs_all: '전체', rs_type: '종류', rs_slot: '슬롯', rs_clear: '지우기', rs_missing: '{0} 가격 없음', rs_slot_weapon: '무기', rs_slot_armor: '방어구', rs_slot_accessory: '장신구', rs_allslots: '모든 슬롯' },
 'zh-Hans': { summary: '摘要', farm_clear: '清关时间', farm_drops: '这里掉落+金币最佳', tree_fit: '适应', tree_reset: '重置', node_locked: '请先解锁前置节点', a_tank: '将 {0} 作为坦克上场——你的队伍没有前排', a_enchant: '附魔 {0} 个空词缀槽——你最大的装备提升空间（全空）', a_synthesis: '把多余的 {1} 装备合成更高品级', a_pet: '为你的目标装备更好的宠物', comp_title: '队伍构成', comp_notank: '没有坦克，前排脆弱', comp_hastank: '前排已覆盖 ', comp_solo: '单人构筑·一个英雄', surv_push: '推进准备度', surv_comfortable: '就绪 ', surv_tight: '吃紧', surv_risky: '危险——需要更多 EHP/DPS', role_tank: '坦克', role_bruiser: '战士', role_support: '辅助', role_dps: '输出', role_caster: '法师', fielded: '已上场', d_normal: '普通', d_nightmare: '噩梦', d_hell: '地狱', d_torment: '折磨', f_caledit: '你的清关时间', f_caltime: '秒', f_caladd: '添加', f_calmax: '最大', f_calextra: '微调', f_vlevel: '等级', f_vgold: '金币', f_projnote: '估算 · 在上方填入清关时间以精确', f_calhint: '真实清关时间（秒）· 2 个以上关卡', f_calman: '用你输入的 {0} 个清关时间校准', f_stages: '关卡', f_calneed: '已输入 1 个——再加一个关卡才能应用', refresh_save: '立即重读存档', gsl_pre: '启用上限', gsl_off: '全部', gsl_n: '节点', hist_power: '历史 · POWER', hist_gold: '历史 · 金币', hist_note: '随着游玩逐渐累积。', hist_pow_sum: '{0} 个采样 · POWER {1} → {2} ({3})', hist_gold_sum: '金币 {0} → {1}', hist_collecting: '收集中…游玩时保持打开。', refreshed: '已重新加载', refresh_savedat: '{0} 的存档', refresh_nosync: '不同步？游戏还没有写入存档。', a_fire: '{0}（你的前排）火抗很低——在 3-6 起的火焰关卡前补一些', gear_lvl: '等级上限', g_have: '已拥有', g_sellonly: '仅 Steam', rs_title: '商店 · 规划并购买效果', rs_cart: '购物车', rs_none: '没有材料提供它——试试其他属性。', rs_cartempty: '在下方添加材料来规划你的购买。', rs_total: '合计', rs_openall: '在 Steam 全部打开', rs_pickstat: '选择你想要的属性：', rs_have: '拥有', rs_all: '全部', rs_type: '类型', rs_slot: '槽位', rs_clear: '清除', rs_missing: '{0} 无价格', rs_slot_weapon: '武器', rs_slot_armor: '护甲', rs_slot_accessory: '饰品', rs_allslots: '所有槽位' },
 'zh-Hant': { summary: '摘要', farm_clear: '清關時間', farm_drops: '這裡掉落+金幣最佳', tree_fit: '適應', tree_reset: '重置', node_locked: '請先解鎖前置節點', a_tank: '將 {0} 作為坦克上場——你的隊伍沒有前排', a_enchant: '附魔 {0} 個空詞綴槽——你最大的裝備提升空間（全空）', a_synthesis: '把多餘的 {1} 裝備合成更高品級', a_pet: '為你的目標裝備更好的寵物', comp_title: '隊伍構成', comp_notank: '沒有坦克，前排脆弱', comp_hastank: '前排已覆蓋 ', comp_solo: '單人構築·一個英雄', surv_push: '推進準備度', surv_comfortable: '就緒 ', surv_tight: '吃緊', surv_risky: '危險——需要更多 EHP/DPS', role_tank: '坦克', role_bruiser: '戰士', role_support: '輔助', role_dps: '輸出', role_caster: '法師', fielded: '已上場', d_normal: '普通', d_nightmare: '噩夢', d_hell: '地獄', d_torment: '折磨', f_caledit: '你的清關時間', f_caltime: '秒', f_caladd: '新增', f_calmax: '最大', f_calextra: '微調', f_vlevel: '等級', f_vgold: '金幣', f_projnote: '估算 · 在上方填入清關時間以精確', f_calhint: '真實清關時間（秒）· 2 個以上關卡', f_calman: '用你輸入的 {0} 個清關時間校準', f_stages: '關卡', f_calneed: '已輸入 1 個——再加一個關卡才能套用', refresh_save: '立即重讀存檔', gsl_pre: '啟用上限', gsl_off: '全部', gsl_n: '節點', hist_power: '歷史 · POWER', hist_gold: '歷史 · 金幣', hist_note: '隨著遊玩逐漸累積。', hist_pow_sum: '{0} 個取樣 · POWER {1} → {2} ({3})', hist_gold_sum: '金幣 {0} → {1}', hist_collecting: '收集中…遊玩時保持開啟。', refreshed: '已重新載入', refresh_savedat: '{0} 的存檔', refresh_nosync: '不同步？遊戲還沒有寫入存檔。', a_fire: '{0}（你的前排）火抗很低——在 3-6 起的火焰關卡前補一些', gear_lvl: '等級上限', g_have: '已擁有', g_sellonly: '僅 Steam', rs_title: '商店 · 規劃並購買效果', rs_cart: '購物車', rs_none: '沒有材料提供它——試試其他屬性。', rs_cartempty: '在下方新增材料來規劃你的購買。', rs_total: '合計', rs_openall: '在 Steam 全部開啟', rs_pickstat: '選擇你想要的屬性：', rs_have: '擁有', rs_all: '全部', rs_type: '類型', rs_slot: '槽位', rs_clear: '清除', rs_missing: '{0} 無價格', rs_slot_weapon: '武器', rs_slot_armor: '護甲', rs_slot_accessory: '飾品', rs_allslots: '所有槽位' },
 'ru-RU': { summary: 'сводка', farm_clear: 'время зачистки', farm_drops: 'лучший дроп + золото здесь', tree_fit: 'вписать', tree_reset: 'сброс', node_locked: 'сначала откройте предыдущий узел', a_tank: 'Поставьте {0} танком — у группы нет передней линии', a_enchant: 'Зачаруйте {0} свободных слотов аффиксов — ваш главный рычаг экипировки (все пусты)', a_synthesis: 'Синтезируйте лишнюю экипировку {1} в грейд выше', a_pet: 'Наденьте лучшего питомца под вашу цель', comp_title: 'состав группы', comp_notank: 'без танка, хрупкая передовая', comp_hastank: 'передовая прикрыта ', comp_solo: 'соло-билд · один герой', surv_push: 'готовность к пушу', surv_comfortable: 'готов ', surv_tight: 'впритык', surv_risky: 'рискованно — нужно больше EHP/DPS', role_tank: 'танк', role_bruiser: 'боец', role_support: 'поддержка', role_dps: 'дпс', role_caster: 'маг', fielded: 'в группе', d_normal: 'Нормал', d_nightmare: 'Кошмар', d_hell: 'Ад', d_torment: 'Мучение', f_caledit: 'ваше время зачистки', f_caltime: 'секунды', f_caladd: 'добавить', f_calmax: 'макс', f_calextra: 'уточнить', f_vlevel: 'Уровень', f_vgold: 'Золото', f_projnote: 'оценка · впишите время выше, чтобы было точно', f_calhint: 'реальное время зачистки в секундах · 2+ этапа', f_calman: 'откалибровано по вашим {0} введённым временам', f_stages: 'ЭТАПЫ', f_calneed: '1 введён — добавьте ещё этап для применения', refresh_save: 'Перечитать сохранение', gsl_pre: 'включить до', gsl_off: 'все', gsl_n: 'узлов', hist_power: 'ИСТОРИЯ · МОЩЬ', hist_gold: 'ИСТОРИЯ · ЗОЛОТО', hist_note: 'Накапливается, пока вы играете.', hist_pow_sum: '{0} замеров · МОЩЬ {1} → {2} ({3})', hist_gold_sum: 'золото {0} → {1}', hist_collecting: 'Сбор… оставьте открытым, пока играете.', refreshed: 'Перезагружено', refresh_savedat: 'сохранение от {0}', refresh_nosync: 'Рассинхрон? Игра ещё не записала сохранение.', a_fire: '{0} (передовая) имеет мало огнестойкости — добавьте её до огненных карт с 3-6', gear_lvl: 'до уровня', g_have: 'есть', g_sellonly: 'только в Steam', rs_title: 'МАГАЗИН · планируйте и покупайте эффекты', rs_cart: 'КОРЗИНА', rs_none: 'Ни один материал не даёт это — попробуйте другие статы.', rs_cartempty: 'Добавьте материалы ниже, чтобы спланировать покупки.', rs_total: 'итого', rs_openall: 'открыть всё в Steam', rs_pickstat: 'выберите нужные статы:', rs_have: 'есть', rs_all: 'все', rs_type: 'тип', rs_slot: 'слот', rs_clear: 'очистить', rs_missing: '{0} без цены', rs_slot_weapon: 'Оружие', rs_slot_armor: 'Броня', rs_slot_accessory: 'Аксессуар', rs_allslots: 'все слоты' },
 };
 for (const l in LOCALIZE) { UI[l] = Object.assign(UI[l] || {}, LOCALIZE[l]); }

 // Items tab — a filterable stash/inventory browser the game itself doesn't offer.
 const ITEMS = {
 'en-US': { tab_items: 'Items', items_title: 'STASH & INVENTORY', it_search: 'search by name', it_type: 'type', it_loc: 'where', it_sort: 'sort', it_gear: 'Gear', it_material: 'Material', it_box: 'Box', loc_equipped: 'equipped', loc_stash: 'stash', loc_inventory: 'backpack', loc_trading: 'trading', loc_loose: 'loose', srt_level: 'level', srt_grade: 'grade', srt_name: 'name', it_count: '{0} of {1} items', it_none: 'no items match these filters', it_onhero: 'on {0}', it_ench: '{0} enchanted' },
 'pt-BR': { tab_items: 'Itens', items_title: 'STASH E INVENTÁRIO', it_search: 'buscar por nome', it_type: 'tipo', it_loc: 'onde', it_sort: 'ordenar', it_gear: 'Equip.', it_material: 'Material', it_box: 'Baú', loc_equipped: 'equipado', loc_stash: 'stash', loc_inventory: 'mochila', loc_trading: 'troca', loc_loose: 'solto', srt_level: 'nível', srt_grade: 'grau', srt_name: 'nome', it_count: '{0} de {1} itens', it_none: 'nenhum item bate com esses filtros', it_onhero: 'em {0}', it_ench: '{0} encantado(s)' },
 'es-ES': { tab_items: 'Objetos', items_title: 'ALIJO E INVENTARIO', it_search: 'buscar por nombre', it_type: 'tipo', it_loc: 'dónde', it_sort: 'ordenar', it_gear: 'Equipo', it_material: 'Material', it_box: 'Cofre', loc_equipped: 'equipado', loc_stash: 'alijo', loc_inventory: 'mochila', loc_trading: 'comercio', loc_loose: 'suelto', srt_level: 'nivel', srt_grade: 'grado', srt_name: 'nombre', it_count: '{0} de {1} objetos', it_none: 'ningún objeto coincide con estos filtros', it_onhero: 'en {0}', it_ench: '{0} encantado(s)' },
 'fr-FR': { tab_items: 'Objets', items_title: 'RÉSERVE ET INVENTAIRE', it_search: 'rechercher par nom', it_type: 'type', it_loc: 'où', it_sort: 'trier', it_gear: 'Équip.', it_material: 'Matériau', it_box: 'Coffre', loc_equipped: 'équipé', loc_stash: 'réserve', loc_inventory: 'sac', loc_trading: 'échange', loc_loose: 'libre', srt_level: 'niveau', srt_grade: 'grade', srt_name: 'nom', it_count: '{0} sur {1} objets', it_none: 'aucun objet ne correspond à ces filtres', it_onhero: 'sur {0}', it_ench: '{0} enchanté(s)' },
 'de-DE': { tab_items: 'Gegenstände', items_title: 'LAGER & INVENTAR', it_search: 'nach Name suchen', it_type: 'Typ', it_loc: 'wo', it_sort: 'sortieren', it_gear: 'Ausr.', it_material: 'Material', it_box: 'Truhe', loc_equipped: 'angelegt', loc_stash: 'Lager', loc_inventory: 'Rucksack', loc_trading: 'Handel', loc_loose: 'lose', srt_level: 'Level', srt_grade: 'Stufe', srt_name: 'Name', it_count: '{0} von {1} Gegenständen', it_none: 'keine Gegenstände passen zu diesen Filtern', it_onhero: 'bei {0}', it_ench: '{0} verzaubert' },
 'ja-JP': { tab_items: 'アイテム', items_title: '保管庫＆インベントリ', it_search: '名前で検索', it_type: '種類', it_loc: '場所', it_sort: '並べ替え', it_gear: '装備', it_material: '素材', it_box: '宝箱', loc_equipped: '装備中', loc_stash: '保管庫', loc_inventory: 'バッグ', loc_trading: '取引', loc_loose: '未収納', srt_level: 'レベル', srt_grade: 'グレード', srt_name: '名前', it_count: '{1} 中 {0} アイテム', it_none: '条件に合うアイテムがありません', it_onhero: '{0} に装備', it_ench: '{0} 個エンチャント' },
 'ko-KR': { tab_items: '아이템', items_title: '창고 & 인벤토리', it_search: '이름으로 검색', it_type: '종류', it_loc: '위치', it_sort: '정렬', it_gear: '장비', it_material: '재료', it_box: '상자', loc_equipped: '장착', loc_stash: '창고', loc_inventory: '가방', loc_trading: '거래', loc_loose: '미보관', srt_level: '레벨', srt_grade: '등급', srt_name: '이름', it_count: '{1}개 중 {0}개', it_none: '필터에 맞는 아이템이 없습니다', it_onhero: '{0} 장착', it_ench: '{0}개 인챈트' },
 'zh-Hans': { tab_items: '物品', items_title: '仓库与背包', it_search: '按名称搜索', it_type: '类型', it_loc: '位置', it_sort: '排序', it_gear: '装备', it_material: '材料', it_box: '宝箱', loc_equipped: '已装备', loc_stash: '仓库', loc_inventory: '背包', loc_trading: '交易', loc_loose: '未放置', srt_level: '等级', srt_grade: '品级', srt_name: '名称', it_count: '{1} 件中 {0} 件', it_none: '没有符合筛选的物品', it_onhero: '装备于 {0}', it_ench: '{0} 件已附魔' },
 'zh-Hant': { tab_items: '物品', items_title: '倉庫與背包', it_search: '按名稱搜尋', it_type: '類型', it_loc: '位置', it_sort: '排序', it_gear: '裝備', it_material: '材料', it_box: '寶箱', loc_equipped: '已裝備', loc_stash: '倉庫', loc_inventory: '背包', loc_trading: '交易', loc_loose: '未放置', srt_level: '等級', srt_grade: '品級', srt_name: '名稱', it_count: '{1} 件中 {0} 件', it_none: '沒有符合篩選的物品', it_onhero: '裝備於 {0}', it_ench: '{0} 件已附魔' },
 'ru-RU': { tab_items: 'Предметы', items_title: 'ХРАНИЛИЩЕ И ИНВЕНТАРЬ', it_search: 'поиск по имени', it_type: 'тип', it_loc: 'где', it_sort: 'сортировка', it_gear: 'Снаряж.', it_material: 'Материал', it_box: 'Сундук', loc_equipped: 'надето', loc_stash: 'хранилище', loc_inventory: 'рюкзак', loc_trading: 'торговля', loc_loose: 'вне ячеек', srt_level: 'уровень', srt_grade: 'грейд', srt_name: 'имя', it_count: '{0} из {1} предметов', it_none: 'нет предметов под эти фильтры', it_onhero: 'на {0}', it_ench: '{0} зачаровано' },
 };
 for (const l in ITEMS) { UI[l] = Object.assign(UI[l] || {}, ITEMS[l]); }

 // Items tab — list vs. grid (faithful stash layout) view toggle + slot number
 const ITEMSGRID = {
 'en-US': { it_list: 'list', it_grid: 'stash grid', it_slot: 'slot {0}', it_tab: 'tab {0}', it_gridof: '{0} · {1}/{2} slots filled', it_gridhint: 'your stash laid out exactly as in-game — 7 tabs of 7×7; filters highlight matches in place' },
 'pt-BR': { it_list: 'lista', it_grid: 'grade do stash', it_slot: 'slot {0}', it_tab: 'aba {0}', it_gridof: '{0} · {1}/{2} slots ocupados', it_gridhint: 'seu stash exatamente como no jogo — 7 abas de 7×7; os filtros destacam o que bate no lugar' },
 'es-ES': { it_list: 'lista', it_grid: 'cuadrícula', it_slot: 'ranura {0}', it_tab: 'pestaña {0}', it_gridof: '{0} · {1}/{2} ranuras llenas', it_gridhint: 'tu alijo tal como en el juego — 7 pestañas de 7×7; los filtros resaltan coincidencias en su sitio' },
 'fr-FR': { it_list: 'liste', it_grid: 'grille', it_slot: 'emplacement {0}', it_tab: 'onglet {0}', it_gridof: '{0} · {1}/{2} emplacements remplis', it_gridhint: 'votre réserve telle qu’en jeu — 7 onglets de 7×7 ; les filtres surlignent les correspondances sur place' },
 'de-DE': { it_list: 'Liste', it_grid: 'Raster', it_slot: 'Platz {0}', it_tab: 'Reiter {0}', it_gridof: '{0} · {1}/{2} Plätze belegt', it_gridhint: 'dein Lager genau wie im Spiel — 7 Reiter à 7×7; Filter heben Treffer an Ort und Stelle hervor' },
 'ja-JP': { it_list: 'リスト', it_grid: 'グリッド', it_slot: 'スロット {0}', it_tab: 'タブ {0}', it_gridof: '{0} · {1}/{2} スロット使用', it_gridhint: 'ゲームと同じレイアウトの保管庫 — 7×7のタブが7枚。フィルタは一致をその場で強調します' },
 'ko-KR': { it_list: '목록', it_grid: '그리드', it_slot: '슬롯 {0}', it_tab: '탭 {0}', it_gridof: '{0} · {1}/{2} 슬롯 사용', it_gridhint: '게임과 동일한 배치의 창고 — 7×7 탭 7개. 필터가 일치 항목을 그 자리에서 강조합니다' },
 'zh-Hans': { it_list: '列表', it_grid: '网格', it_slot: '格 {0}', it_tab: '页 {0}', it_gridof: '{0} · {1}/{2} 格已用', it_gridhint: '与游戏内一致的仓库布局——7 页 7×7；筛选会就地高亮匹配项' },
 'zh-Hant': { it_list: '列表', it_grid: '網格', it_slot: '格 {0}', it_tab: '頁 {0}', it_gridof: '{0} · {1}/{2} 格已用', it_gridhint: '與遊戲內一致的倉庫佈局——7 頁 7×7；篩選會就地高亮匹配項' },
 'ru-RU': { it_list: 'список', it_grid: 'сетка', it_slot: 'ячейка {0}', it_tab: 'вкладка {0}', it_gridof: '{0} · {1}/{2} ячеек занято', it_gridhint: 'ваше хранилище как в игре — 7 вкладок по 7×7; фильтры подсвечивают совпадения на месте' },
 };
 for (const l in ITEMSGRID) { UI[l] = Object.assign(UI[l] || {}, ITEMSGRID[l]); }

 // Sell Advisor tab — rank tradeable inventory + track the 4 listing slots (8h relist interval)
 const SELL = {
 'en-US': { tab_sell: 'Sell', sell_title: 'BEST TO SELL', sell_slots_title: 'LISTING SLOTS', sell_intro: 'Ranked by estimated value per 8h listing slot — unit price × how fast that grade tends to sell. List your top picks first; a cheap item that sells fast can beat a pricey one that just sits.', sell_estnote: 'Liquidity (fast/slow) is an estimate by grade, not live Steam volume — treat it as a hint.', sell_manual: 'Steam hides your active listings, so this tracker is manual: hit “list” when you post an item and the slot counts down its 8h relist interval, then dings when it’s free.', sell_inuse: '{0}/{1} slots listed', sell_slotempty: 'free slot', sell_list: 'list', sell_relist: 'relist', sell_listed: 'listed', sell_ready: 'ready to relist', sell_freein: 'free in {0}', sell_pickfree: 'all {0} slots are listed — wait for one to free up', sell_owned: '×{0}', sell_npc: '{0} gold to NPC', sell_nolist: 'not listed', sell_rankhdr: 'best value per slot first', sell_liq_fast: 'sells fast', sell_liq_med: 'medium', sell_liq_slow: 'sells slow', sell_empty: 'no tradeable items in your inventory', sell_demo: 'connect your save to rank your real inventory', sell_ntf: '{0} slot is free — relist; next best: {1}', sell_anything: 'your top item', currency: 'Currency', sell_srt_value: 'value', sell_srt_price: 'price', sell_srt_qty: 'qty', sell_srt_npc: 'NPC', sell_estval: 'est. value', sell_hidelisted: 'hide listed', sell_count: '{0} of {1}' },
 'pt-BR': { tab_sell: 'Vender', sell_title: 'MELHOR PRA VENDER', sell_slots_title: 'SLOTS DE LISTAGEM', sell_intro: 'Ordenado por valor estimado por slot de 8h — preço unitário × quão rápido aquele grau costuma vender. Liste os melhores primeiro; um item barato que vende rápido pode render mais que um caro parado.', sell_estnote: 'A liquidez (rápido/lento) é uma estimativa por grau, não o volume real do Steam — use como dica.', sell_manual: 'O Steam esconde suas listagens ativas, então este controle é manual: clique em “listar” ao postar um item e o slot conta o intervalo de 8h pra relistar, avisando quando liberar.', sell_inuse: '{0}/{1} slots listados', sell_slotempty: 'slot livre', sell_list: 'listar', sell_relist: 'relistar', sell_listed: 'listado', sell_ready: 'pronto pra relistar', sell_freein: 'libera em {0}', sell_pickfree: 'todos os {0} slots estão listados — espere um liberar', sell_owned: '×{0}', sell_npc: '{0} de gold no NPC', sell_nolist: 'sem listagem', sell_rankhdr: 'maior valor por slot primeiro', sell_liq_fast: 'vende rápido', sell_liq_med: 'médio', sell_liq_slow: 'vende devagar', sell_empty: 'nenhum item vendável no seu inventário', sell_demo: 'conecte seu save pra ranquear seu inventário real', sell_ntf: 'slot de {0} liberou — relista; próximo melhor: {1}', sell_anything: 'seu melhor item', currency: 'Moeda', sell_srt_value: 'valor', sell_srt_price: 'preço', sell_srt_qty: 'qtd', sell_srt_npc: 'NPC', sell_estval: 'valor est.', sell_hidelisted: 'ocultar listados', sell_count: '{0} de {1}' },
 'es-ES': { tab_sell: 'Vender', sell_title: 'MEJOR PARA VENDER', sell_slots_title: 'RANURAS DE VENTA', sell_intro: 'Ordenado por valor estimado por ranura de 8h — precio unitario × lo rápido que suele venderse ese grado. Lista primero los mejores; un objeto barato que se vende rápido puede superar a uno caro que se queda parado.', sell_estnote: 'La liquidez (rápido/lento) es una estimación por grado, no el volumen real de Steam — tómalo como pista.', sell_manual: 'Steam oculta tus publicaciones activas, así que este control es manual: pulsa “listar” al publicar un objeto y la ranura cuenta el intervalo de 8h para re-publicar, y avisa cuando se libera.', sell_inuse: '{0}/{1} ranuras publicadas', sell_slotempty: 'ranura libre', sell_list: 'listar', sell_relist: 're-publicar', sell_listed: 'publicado', sell_ready: 'listo para re-publicar', sell_freein: 'libre en {0}', sell_pickfree: 'las {0} ranuras están publicadas — espera a que se libere una', sell_owned: '×{0}', sell_npc: '{0} de oro al NPC', sell_nolist: 'sin publicación', sell_rankhdr: 'mejor valor por ranura primero', sell_liq_fast: 'se vende rápido', sell_liq_med: 'medio', sell_liq_slow: 'se vende lento', sell_empty: 'no hay objetos vendibles en tu inventario', sell_demo: 'conecta tu partida para clasificar tu inventario real', sell_ntf: 'la ranura de {0} está libre — re-publica; siguiente mejor: {1}', sell_anything: 'tu mejor objeto', currency: 'Moneda', sell_srt_value: 'valor', sell_srt_price: 'precio', sell_srt_qty: 'cant.', sell_srt_npc: 'NPC', sell_estval: 'valor est.', sell_hidelisted: 'ocultar listados', sell_count: '{0} de {1}' },
 'fr-FR': { tab_sell: 'Vendre', sell_title: 'MEILLEUR À VENDRE', sell_slots_title: 'EMPLACEMENTS DE VENTE', sell_intro: 'Classé par valeur estimée par emplacement de 8h — prix unitaire × la vitesse de vente habituelle de ce grade. Mettez d’abord vos meilleurs objets ; un objet bon marché qui part vite peut rapporter plus qu’un cher qui stagne.', sell_estnote: 'La liquidité (rapide/lent) est une estimation par grade, pas le volume réel de Steam — à prendre comme indice.', sell_manual: 'Steam masque vos annonces actives, donc ce suivi est manuel : cliquez sur « lister » quand vous publiez un objet et l’emplacement décompte l’intervalle de 8h avant de relister, puis sonne quand il se libère.', sell_inuse: '{0}/{1} emplacements listés', sell_slotempty: 'emplacement libre', sell_list: 'lister', sell_relist: 'relister', sell_listed: 'listé', sell_ready: 'prêt à relister', sell_freein: 'libre dans {0}', sell_pickfree: 'les {0} emplacements sont listés — attendez qu’un se libère', sell_owned: '×{0}', sell_npc: '{0} or au PNJ', sell_nolist: 'non listé', sell_rankhdr: 'meilleure valeur par emplacement en premier', sell_liq_fast: 'se vend vite', sell_liq_med: 'moyen', sell_liq_slow: 'se vend lentement', sell_empty: 'aucun objet vendable dans votre inventaire', sell_demo: 'connectez votre sauvegarde pour classer votre vrai inventaire', sell_ntf: 'l’emplacement de {0} est libre — relistez ; meilleur suivant : {1}', sell_anything: 'votre meilleur objet', currency: 'Devise', sell_srt_value: 'valeur', sell_srt_price: 'prix', sell_srt_qty: 'qté', sell_srt_npc: 'PNJ', sell_estval: 'valeur est.', sell_hidelisted: 'masquer listés', sell_count: '{0} sur {1}' },
 'de-DE': { tab_sell: 'Verkaufen', sell_title: 'AM BESTEN VERKAUFEN', sell_slots_title: 'VERKAUFS-SLOTS', sell_intro: 'Sortiert nach geschätztem Wert pro 8h-Slot — Stückpreis × wie schnell sich diese Stufe üblicherweise verkauft. Liste zuerst die Top-Stücke; ein günstiges, schnell verkäufliches kann ein teures schlagen, das liegen bleibt.', sell_estnote: 'Liquidität (schnell/langsam) ist eine Schätzung nach Stufe, nicht das echte Steam-Volumen — als Hinweis verstehen.', sell_manual: 'Steam verbirgt deine aktiven Angebote, daher ist dieser Tracker manuell: Klicke „listen“, wenn du ein Item einstellst, und der Slot zählt das 8h-Intervall fürs Neulisten herunter und piept, wenn er frei ist.', sell_inuse: '{0}/{1} Slots gelistet', sell_slotempty: 'freier Slot', sell_list: 'listen', sell_relist: 'neu listen', sell_listed: 'gelistet', sell_ready: 'bereit zum Neulisten', sell_freein: 'frei in {0}', sell_pickfree: 'alle {0} Slots sind gelistet — warte, bis einer frei wird', sell_owned: '×{0}', sell_npc: '{0} Gold an NPC', sell_nolist: 'nicht gelistet', sell_rankhdr: 'bester Wert pro Slot zuerst', sell_liq_fast: 'verkauft sich schnell', sell_liq_med: 'mittel', sell_liq_slow: 'verkauft sich langsam', sell_empty: 'keine handelbaren Items im Inventar', sell_demo: 'verbinde deinen Spielstand, um dein echtes Inventar zu sortieren', sell_ntf: '{0}-Slot ist frei — neu listen; nächstbestes: {1}', sell_anything: 'dein Top-Item', currency: 'Währung', sell_srt_value: 'Wert', sell_srt_price: 'Preis', sell_srt_qty: 'Anz.', sell_srt_npc: 'NPC', sell_estval: 'gesch. Wert', sell_hidelisted: 'gelistete ausblenden', sell_count: '{0} von {1}' },
 'ja-JP': { tab_sell: '売却', sell_title: '売却おすすめ', sell_slots_title: '出品スロット', sell_intro: '8時間スロットあたりの推定価値順 — 単価 × その等級の売れやすさ。価値の高いものから出品を。安くても早く売れる物は、高くても売れ残る物より得なことがあります。', sell_estnote: '流動性（早い/遅い）は等級ごとの推定で、Steamの実取引量ではありません — 目安として扱ってください。', sell_manual: 'Steamは出品中の一覧を隠すため、この管理は手動です。出品時に「出品」を押すとスロットが8時間の再出品間隔をカウントし、空いたら通知します。', sell_inuse: '{0}/{1} スロット出品中', sell_slotempty: '空きスロット', sell_list: '出品', sell_relist: '再出品', sell_listed: '出品中', sell_ready: '再出品可能', sell_freein: '空きまで {0}', sell_pickfree: '{0} スロットすべて出品中 — 空くのを待ってください', sell_owned: '×{0}', sell_npc: 'NPCに {0} ゴールド', sell_nolist: '未出品', sell_rankhdr: 'スロットあたりの価値が高い順', sell_liq_fast: '早く売れる', sell_liq_med: '普通', sell_liq_slow: '売れにくい', sell_empty: '取引可能なアイテムがありません', sell_demo: 'セーブを接続すると実際の在庫を順位付けします', sell_ntf: '{0} のスロットが空きました — 再出品を。次のおすすめ: {1}', sell_anything: 'いちばん良いアイテム', currency: '通貨', sell_srt_value: '価値', sell_srt_price: '価格', sell_srt_qty: '数量', sell_srt_npc: 'NPC', sell_estval: '推定額', sell_hidelisted: '出品中を隠す', sell_count: '{1}件中{0}件' },
 'ko-KR': { tab_sell: '판매', sell_title: '판매 추천', sell_slots_title: '등록 슬롯', sell_intro: '8시간 슬롯당 예상 가치순 — 단가 × 해당 등급의 판매 속도. 가치가 높은 것부터 등록하세요. 싸도 빨리 팔리는 게 비싸도 안 팔리는 것보다 나을 수 있습니다.', sell_estnote: '유동성(빠름/느림)은 등급별 추정치이며 실제 Steam 거래량이 아닙니다 — 참고용으로 보세요.', sell_manual: 'Steam은 등록 중인 목록을 숨기므로 이 추적은 수동입니다. 등록 시 “등록”을 누르면 슬롯이 8시간 재등록 간격을 카운트하고, 비면 알립니다.', sell_inuse: '{0}/{1} 슬롯 등록됨', sell_slotempty: '빈 슬롯', sell_list: '등록', sell_relist: '재등록', sell_listed: '등록됨', sell_ready: '재등록 가능', sell_freein: '{0} 후 비움', sell_pickfree: '{0} 슬롯 모두 등록됨 — 하나 빌 때까지 기다리세요', sell_owned: '×{0}', sell_npc: 'NPC에 {0} 골드', sell_nolist: '미등록', sell_rankhdr: '슬롯당 가치 높은 순', sell_liq_fast: '빨리 팔림', sell_liq_med: '보통', sell_liq_slow: '느리게 팔림', sell_empty: '거래 가능한 아이템이 없습니다', sell_demo: '세이브를 연결하면 실제 인벤토리를 정렬합니다', sell_ntf: '{0} 슬롯이 비었습니다 — 재등록하세요; 다음 추천: {1}', sell_anything: '가장 좋은 아이템', currency: '통화', sell_srt_value: '가치', sell_srt_price: '가격', sell_srt_qty: '수량', sell_srt_npc: 'NPC', sell_estval: '예상 가치', sell_hidelisted: '등록된 항목 숨기기', sell_count: '{1}개 중 {0}개' },
 'zh-Hans': { tab_sell: '出售', sell_title: '最值得卖', sell_slots_title: '上架槽位', sell_intro: '按每个8小时槽位的预估价值排序——单价 × 该品级的售出速度。先上架最值钱的；便宜但卖得快的可能比贵却压着不动的更划算。', sell_estnote: '流动性（快/慢）是按品级的估计，并非Steam真实成交量——仅作参考。', sell_manual: 'Steam不显示你正在上架的物品，所以这里是手动跟踪：上架时点“上架”，槽位会倒数8小时的重新上架间隔，空出时提醒你。', sell_inuse: '{0}/{1} 槽位已上架', sell_slotempty: '空槽位', sell_list: '上架', sell_relist: '重新上架', sell_listed: '已上架', sell_ready: '可重新上架', sell_freein: '{0} 后空出', sell_pickfree: '{0} 个槽位都已上架——等一个空出来', sell_owned: '×{0}', sell_npc: '卖给NPC {0} 金币', sell_nolist: '未上架', sell_rankhdr: '每槽价值高的在前', sell_liq_fast: '卖得快', sell_liq_med: '中等', sell_liq_slow: '卖得慢', sell_empty: '背包里没有可交易的物品', sell_demo: '连接存档以对你的真实背包排序', sell_ntf: '{0} 槽位空了——重新上架；下一个推荐：{1}', sell_anything: '你最好的物品', currency: '货币', sell_srt_value: '价值', sell_srt_price: '价格', sell_srt_qty: '数量', sell_srt_npc: 'NPC', sell_estval: '预估价值', sell_hidelisted: '隐藏已上架', sell_count: '{0} / {1}' },
 'zh-Hant': { tab_sell: '出售', sell_title: '最值得賣', sell_slots_title: '上架欄位', sell_intro: '依每個8小時欄位的預估價值排序——單價 × 該品級的售出速度。先上架最值錢的；便宜但賣得快的可能比貴卻壓著不動的更划算。', sell_estnote: '流動性（快/慢）是依品級的估計，並非Steam真實成交量——僅供參考。', sell_manual: 'Steam不顯示你正在上架的物品，所以這裡是手動追蹤：上架時點「上架」，欄位會倒數8小時的重新上架間隔，空出時提醒你。', sell_inuse: '{0}/{1} 欄位已上架', sell_slotempty: '空欄位', sell_list: '上架', sell_relist: '重新上架', sell_listed: '已上架', sell_ready: '可重新上架', sell_freein: '{0} 後空出', sell_pickfree: '{0} 個欄位都已上架——等一個空出來', sell_owned: '×{0}', sell_npc: '賣給NPC {0} 金幣', sell_nolist: '未上架', sell_rankhdr: '每欄價值高的在前', sell_liq_fast: '賣得快', sell_liq_med: '中等', sell_liq_slow: '賣得慢', sell_empty: '背包裡沒有可交易的物品', sell_demo: '連接存檔以對你的真實背包排序', sell_ntf: '{0} 欄位空了——重新上架；下一個推薦：{1}', sell_anything: '你最好的物品', currency: '貨幣', sell_srt_value: '價值', sell_srt_price: '價格', sell_srt_qty: '數量', sell_srt_npc: 'NPC', sell_estval: '預估價值', sell_hidelisted: '隱藏已上架', sell_count: '{0} / {1}' },
 'ru-RU': { tab_sell: 'Продажа', sell_title: 'ЛУЧШЕЕ НА ПРОДАЖУ', sell_slots_title: 'СЛОТЫ ЛОТОВ', sell_intro: 'Отсортировано по оценочной ценности на 8-часовой слот — цена за штуку × как быстро обычно продаётся этот грейд. Выставляйте лучшее первым; дешёвое, но быстро продаваемое может обойти дорогое, которое залёживается.', sell_estnote: 'Ликвидность (быстро/медленно) — оценка по грейду, а не реальный объём Steam — воспринимайте как подсказку.', sell_manual: 'Steam скрывает ваши активные лоты, поэтому учёт ручной: нажмите «выставить», когда публикуете предмет, и слот отсчитает 8-часовой интервал перевыставления, а затем сообщит, что свободен.', sell_inuse: '{0}/{1} слотов выставлено', sell_slotempty: 'свободный слот', sell_list: 'выставить', sell_relist: 'перевыставить', sell_listed: 'выставлено', sell_ready: 'готов к перевыставлению', sell_freein: 'освободится через {0}', sell_pickfree: 'все {0} слотов выставлены — дождитесь, пока один освободится', sell_owned: '×{0}', sell_npc: '{0} золота NPC', sell_nolist: 'не выставлено', sell_rankhdr: 'сначала лучшая ценность на слот', sell_liq_fast: 'быстро продаётся', sell_liq_med: 'средне', sell_liq_slow: 'медленно продаётся', sell_empty: 'нет торгуемых предметов в инвентаре', sell_demo: 'подключите сохранение, чтобы ранжировать ваш реальный инвентарь', sell_ntf: 'слот {0} свободен — перевыставьте; следующее лучшее: {1}', sell_anything: 'ваш лучший предмет', currency: 'Валюта', sell_srt_value: 'ценность', sell_srt_price: 'цена', sell_srt_qty: 'кол-во', sell_srt_npc: 'NPC', sell_estval: 'оцен. стоимость', sell_hidelisted: 'скрыть выставленные', sell_count: '{0} из {1}' },
 };
 for (const l in SELL) { UI[l] = Object.assign(UI[l] || {}, SELL[l]); }

 function t(locale, key, vars) {
 const tbl = UI[locale] || UI['en-US'];
 let s = (tbl && tbl[key] != null) ? tbl[key] : (UI['en-US'][key] != null ? UI['en-US'][key] : key);
 if (vars) for (let i = 0; i < vars.length; i++) s = s.split('{' + i + '}').join(String(vars[i]));
 return s;
 }

 function entityName(nameMap, locale) {
 if (!nameMap) return '';
 return nameMap[locale] || nameMap['en-US'] || Object.values(nameMap)[0] || '';
 }

 const API = { LOCALES, UI, t, entityName, has: l => !!UI[l] };
 g.TBH_I18N = API;
 if (typeof module !== 'undefined' && module.exports) module.exports = API;
})(typeof globalThis !== 'undefined' ? globalThis : this);
