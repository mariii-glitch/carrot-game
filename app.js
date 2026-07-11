const STORAGE_KEY = "carrot-game-profile-v2";

const capColors = [
  { name: "Garden Blue", value: "#2f7fd1" },
  { name: "Tomato Red", value: "#d94141" },
  { name: "Mint Green", value: "#2e9d5b" },
  { name: "Champion Gold", value: "#ffc857" },
  { name: "Night Soil", value: "#232323" },
  { name: "Lilac Hype", value: "#7557c8" },
  { name: "Bubble Pink", value: "#e35c91" },
  { name: "Cream", value: "#f4e3b0" },
];

const shortsColors = [
  { name: "Deep Garden", value: "#226f46" },
  { name: "Denim", value: "#4776b4" },
  { name: "Tomato", value: "#d94141" },
  { name: "Violet", value: "#8657c5" },
  { name: "Cream", value: "#f4e3b0" },
  { name: "Ink", value: "#222222" },
  { name: "Sky", value: "#80bde8" },
  { name: "Sun", value: "#ffc857" },
];

const gloveColors = [
  { name: "Tomato", value: "#d94141" },
  { name: "Blue", value: "#2f7fd1" },
  { name: "Black", value: "#232323" },
  { name: "Gold", value: "#ffc857" },
  { name: "Pink", value: "#e35c91" },
  { name: "Green", value: "#2e9d5b" },
  { name: "White", value: "#f8f4e9" },
  { name: "Purple", value: "#7557c8" },
];

const defaultProfile = {
  name: "Captain Carrot",
  capColor: "#2f7fd1",
  shortsColor: "#226f46",
  gloveColor: "#d94141",
  face: "cool",
  headwear: "cap",
  leaves: "classic",
  pattern: "solid",
  wins: 0,
  losses: 0,
  fights: 0,
  points: 0,
  streak: 0,
  bestStreak: 0,
  selectedArena: "garden",
  lastReport: null,
  careerLog: [],
};

const headwearOptions = [
  { id: "cap", label: "Cap", requirement: null },
  { id: "visor", label: "Visor", requirement: null },
  { id: "beanie", label: "Beanie", requirement: null },
  { id: "crown", label: "Crown", requirement: null },
  { id: "none", label: "None", requirement: null },
  { id: "flower", label: "Flower", requirement: { points: 90, text: "90P" } },
  { id: "chef", label: "Chef", requirement: { points: 180, wins: 2, text: "180P + 2W" } },
  { id: "bucket", label: "Bucket", requirement: { points: 340, wins: 4, text: "340P + 4W" } },
  { id: "halo", label: "Halo", requirement: { points: 520, wins: 7, text: "520P + 7W" } },
];

const arenaMaps = [
  {
    id: "garden",
    name: "Classic Beet",
    shortName: "Beet",
    requirement: null,
    vibe: "ehrlicher Rasen, faire Seile",
    pointBonus: 1,
    eventBias: ["wind", "sun", "mud", "crowd"],
  },
  {
    id: "greenhouse",
    name: "Glashaus Gong",
    shortName: "Glashaus",
    requirement: { points: 90, wins: 1, text: "90P + 1W" },
    vibe: "warm, laut, Fokus lädt schneller",
    pointBonus: 1.08,
    eventBias: ["sun", "sun", "crowd", "wind"],
  },
  {
    id: "mudpit",
    name: "Matsch-Dojo",
    shortName: "Matsch",
    requirement: { points: 210, wins: 3, text: "210P + 3W" },
    vibe: "rutschig, dreckig, viel Drama",
    pointBonus: 1.16,
    eventBias: ["mud", "mud", "wind", "crowd"],
  },
  {
    id: "moonlight",
    name: "Mondlicht-Mulde",
    shortName: "Mond",
    requirement: { points: 340, wins: 5, text: "340P + 5W" },
    vibe: "Nachtduell mit extra Swagger",
    pointBonus: 1.25,
    eventBias: ["wind", "crowd", "sun", "crowd"],
  },
  {
    id: "pumpkin",
    name: "Kuerbis-Kolosseum",
    shortName: "Kuerbis",
    requirement: { points: 520, wins: 7, text: "520P + 7W" },
    vibe: "Endboss-Ring mit dicken Preisen",
    pointBonus: 1.42,
    eventBias: ["crowd", "mud", "sun", "wind"],
  },
];

const outfitPresets = [
  {
    name: "Garden Pro",
    note: "clean, sportlich",
    style: {
      capColor: "#2f7fd1",
      shortsColor: "#226f46",
      gloveColor: "#d94141",
      headwear: "cap",
      leaves: "classic",
      pattern: "stripe",
      face: "cool",
    },
  },
  {
    name: "Root Royal",
    note: "viel Ego",
    style: {
      capColor: "#ffc857",
      shortsColor: "#8657c5",
      gloveColor: "#232323",
      headwear: "crown",
      leaves: "wild",
      pattern: "dots",
      face: "focus",
    },
  },
  {
    name: "Compost Punk",
    note: "wild im Beet",
    style: {
      capColor: "#232323",
      shortsColor: "#d94141",
      gloveColor: "#e35c91",
      headwear: "beanie",
      leaves: "wild",
      pattern: "stripe",
      face: "grin",
    },
  },
  {
    name: "Sunny Sprout",
    note: "schnell und hell",
    style: {
      capColor: "#f4e3b0",
      shortsColor: "#80bde8",
      gloveColor: "#ffc857",
      headwear: "visor",
      leaves: "sprout",
      pattern: "solid",
      face: "grin",
    },
  },
];

const rooms = [
  {
    id: "basil-ring",
    host: "Basil Ben",
    corner: "Basilikum-Ecke",
    arenaId: "garden",
    record: "4-1",
    pot: 24,
    difficulty: 0.82,
    evasion: 0.14,
    guard: 0.08,
    tactic: "schnelle Jabs",
    style: {
      capColor: "#226f46",
      shortsColor: "#4776b4",
      gloveColor: "#ffc857",
      headwear: "visor",
      leaves: "classic",
      pattern: "stripe",
      face: "grin",
    },
  },
  {
    id: "tomato-turf",
    host: "Rote Rita",
    corner: "Tomatenbeet",
    arenaId: "greenhouse",
    record: "8-3",
    pot: 38,
    difficulty: 1.08,
    evasion: 0.18,
    guard: 0.11,
    tactic: "Konterboxen",
    style: {
      capColor: "#d94141",
      shortsColor: "#f4e3b0",
      gloveColor: "#232323",
      headwear: "cap",
      leaves: "wild",
      pattern: "dots",
      face: "focus",
    },
  },
  {
    id: "mint-court",
    host: "Mighty Mint",
    corner: "Minzpfad",
    arenaId: "garden",
    record: "2-0",
    pot: 22,
    difficulty: 0.72,
    evasion: 0.22,
    guard: 0.05,
    tactic: "viel Ausweichen",
    style: {
      capColor: "#ffc857",
      shortsColor: "#226f46",
      gloveColor: "#2f7fd1",
      headwear: "beanie",
      leaves: "sprout",
      pattern: "solid",
      face: "cool",
    },
  },
  {
    id: "watering-hole",
    host: "Giesskanne Gio",
    corner: "Wassertonne",
    arenaId: "mudpit",
    record: "11-6",
    pot: 46,
    difficulty: 1.2,
    evasion: 0.12,
    guard: 0.16,
    tactic: "harte Haymaker",
    style: {
      capColor: "#232323",
      shortsColor: "#8657c5",
      gloveColor: "#e35c91",
      headwear: "crown",
      leaves: "classic",
      pattern: "stripe",
      face: "focus",
    },
  },
  {
    id: "soil-gym",
    host: "Kompost Kira",
    corner: "Kompost-Gym",
    arenaId: "greenhouse",
    record: "6-6",
    pot: 30,
    difficulty: 0.96,
    evasion: 0.1,
    guard: 0.22,
    tactic: "Block & Special",
    style: {
      capColor: "#7557c8",
      shortsColor: "#222222",
      gloveColor: "#f8f4e9",
      headwear: "none",
      leaves: "wild",
      pattern: "dots",
      face: "cool",
    },
  },
  {
    id: "moon-chili",
    host: "Chili Chantal",
    corner: "Mondlicht-Mulde",
    arenaId: "moonlight",
    record: "14-4",
    pot: 58,
    difficulty: 1.28,
    evasion: 0.2,
    guard: 0.12,
    tactic: "Tempo & Taunt",
    style: {
      capColor: "#e35c91",
      shortsColor: "#222222",
      gloveColor: "#ffc857",
      headwear: "flower",
      leaves: "wild",
      pattern: "stripe",
      face: "grin",
    },
  },
  {
    id: "bucket-lauch",
    host: "Lauch Leo",
    corner: "Matsch-Dojo",
    arenaId: "mudpit",
    record: "10-9",
    pot: 48,
    difficulty: 1.14,
    evasion: 0.08,
    guard: 0.26,
    tactic: "Tank im Beet",
    style: {
      capColor: "#f4e3b0",
      shortsColor: "#4776b4",
      gloveColor: "#2e9d5b",
      headwear: "bucket",
      leaves: "classic",
      pattern: "dots",
      face: "focus",
    },
  },
  {
    id: "pumpkin-boss",
    host: "Kuerbis Kurt",
    corner: "Kolosseum",
    arenaId: "pumpkin",
    record: "22-2",
    pot: 82,
    difficulty: 1.5,
    evasion: 0.14,
    guard: 0.2,
    tactic: "Endboss-Klatscher",
    style: {
      capColor: "#ffc857",
      shortsColor: "#8657c5",
      gloveColor: "#232323",
      headwear: "halo",
      leaves: "sprout",
      pattern: "stripe",
      face: "cool",
    },
  },
];

const botNames = [
  "Radieschen Rocco",
  "Sellerie Sam",
  "Beet Bouncer",
  "Knacki Kim",
  "Pepper Pat",
  "Pak Choi Paul",
];

const gardenEvents = [
  {
    id: "wind",
    label: "Windstoss",
    log: "Ein Windstoss jagt Blätter durch den Ring.",
    duration: 3400,
  },
  {
    id: "sun",
    label: "Sonnenfleck",
    log: "Die Sonne trifft den Ring. Fokus lädt schneller.",
    duration: 3600,
  },
  {
    id: "mud",
    label: "Matschzone",
    log: "Eine Matschspur macht Ausweichen riskanter.",
    duration: 3200,
  },
  {
    id: "crowd",
    label: "Beet-Hype",
    log: "Das Gartenpublikum dreht kurz auf.",
    duration: 3000,
  },
];

const els = {
  screens: document.querySelectorAll(".screen"),
  navButtons: document.querySelectorAll("[data-screen-target]"),
  musicToggle: document.querySelector("#musicToggle"),
  musicLabel: document.querySelector("#musicLabel"),
  homeCarrot: document.querySelector("#homeCarrot"),
  homeName: document.querySelector("#homeName"),
  homeFit: document.querySelector("#homeFit"),
  featuredOpponent: document.querySelector("#featuredOpponent"),
  featuredCopy: document.querySelector("#featuredCopy"),
  styleScore: document.querySelector("#styleScore"),
  carrotName: document.querySelector("#carrotName"),
  carrotPreview: document.querySelector("#carrotPreview"),
  lockerNamePreview: document.querySelector("#lockerNamePreview"),
  lockerStylePreview: document.querySelector("#lockerStylePreview"),
  capSwatches: document.querySelector("#capSwatches"),
  shortsSwatches: document.querySelector("#shortsSwatches"),
  gloveSwatches: document.querySelector("#gloveSwatches"),
  headwearPicker: document.querySelector("#headwearPicker"),
  leafPicker: document.querySelector("#leafPicker"),
  patternPicker: document.querySelector("#patternPicker"),
  facePicker: document.querySelector("#facePicker"),
  outfitPresets: document.querySelector("#outfitPresets"),
  saveProfile: document.querySelector("#saveProfile"),
  createRoom: document.querySelector("#createRoom"),
  waitingNotice: document.querySelector("#waitingNotice"),
  waitingText: document.querySelector("#waitingText"),
  mapStrip: document.querySelector("#mapStrip"),
  yardPreview: document.querySelector("#yardPreview"),
  roomList: document.querySelector("#roomList"),
  stripPoints: document.querySelector("#stripPoints"),
  stripRecord: document.querySelector("#stripRecord"),
  stripRank: document.querySelector("#stripRank"),
  winsStat: document.querySelector("#winsStat"),
  lossesStat: document.querySelector("#lossesStat"),
  fightsStat: document.querySelector("#fightsStat"),
  streakStat: document.querySelector("#streakStat"),
  badgeList: document.querySelector("#badgeList"),
  careerLog: document.querySelector("#careerLog"),
  arenaTitle: document.querySelector("#arenaTitle"),
  leaveArena: document.querySelector("#leaveArena"),
  playerArenaName: document.querySelector("#playerArenaName"),
  opponentArenaName: document.querySelector("#opponentArenaName"),
  playerHpBar: document.querySelector("#playerHpBar"),
  opponentHpBar: document.querySelector("#opponentHpBar"),
  roundPill: document.querySelector("#roundPill"),
  comboPill: document.querySelector("#comboPill"),
  eventPill: document.querySelector("#eventPill"),
  arenaStage: document.querySelector("#arenaStage"),
  playerFighter: document.querySelector("#playerFighter"),
  opponentFighter: document.querySelector("#opponentFighter"),
  impactBurst: document.querySelector("#impactBurst"),
  jabButton: document.querySelector("#jabButton"),
  haymakerButton: document.querySelector("#haymakerButton"),
  blockButton: document.querySelector("#blockButton"),
  dodgeButton: document.querySelector("#dodgeButton"),
  specialButton: document.querySelector("#specialButton"),
  energyBar: document.querySelector("#energyBar"),
  focusBar: document.querySelector("#focusBar"),
  fightResult: document.querySelector("#fightResult"),
  winnerBanner: document.querySelector("#winnerBanner"),
  resultTitle: document.querySelector("#resultTitle"),
  resultCopy: document.querySelector("#resultCopy"),
  resultReport: document.querySelector("#resultReport"),
  rematchButton: document.querySelector("#rematchButton"),
  backToLobby: document.querySelector("#backToLobby"),
  fightLog: document.querySelector("#fightLog"),
};

let profile = loadProfile();
let fight = null;
let fightTimer = null;
let waitingTimer = null;
let activeScreen = "home";
let audioContext = null;
let musicTimer = null;
let bassTimer = null;
let musicStep = 0;
let musicEnabled = false;

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("carrot-game-profile-v1");
    if (!raw) return { ...defaultProfile };
    const parsed = JSON.parse(raw);
    return {
      ...defaultProfile,
      ...parsed,
      careerLog: Array.isArray(parsed.careerLog) ? parsed.careerLog : [],
    };
  } catch {
    return { ...defaultProfile };
  }
}

function saveProfileData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Persistence is a nice bonus, not a blocker for the game.
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choice(items) {
  return items[randomBetween(0, items.length - 1)];
}

function meetsRequirement(player, requirement) {
  if (!requirement) return true;
  const pointsReady = player.points >= (requirement.points || 0);
  const winsReady = player.wins >= (requirement.wins || 0);
  return pointsReady && winsReady;
}

function getArena(id) {
  return arenaMaps.find((arena) => arena.id === id) || arenaMaps[0];
}

function isArenaUnlocked(id, player = profile) {
  return meetsRequirement(player, getArena(id).requirement);
}

function isHeadwearUnlocked(id, player = profile) {
  const option = headwearOptions.find((item) => item.id === id);
  return !option || meetsRequirement(player, option.requirement);
}

function currentArena(player = profile) {
  return isArenaUnlocked(player.selectedArena, player) ? getArena(player.selectedArena) : arenaMaps[0];
}

function unlockNamesFor(player) {
  const headwear = headwearOptions
    .filter((item) => item.requirement && meetsRequirement(player, item.requirement))
    .map((item) => `Hut: ${item.label}`);
  const maps = arenaMaps
    .filter((arena) => arena.requirement && meetsRequirement(player, arena.requirement))
    .map((arena) => `Map: ${arena.name}`);
  return [...headwear, ...maps];
}

function newUnlocksBetween(before, after) {
  const beforeSet = new Set(unlockNamesFor(before));
  return unlockNamesFor(after).filter((name) => !beforeSet.has(name));
}

function sanitizeProfileUnlocks() {
  if (!isHeadwearUnlocked(profile.headwear)) {
    profile.headwear = "cap";
  }
  if (!isArenaUnlocked(profile.selectedArena)) {
    profile.selectedArena = "garden";
  }
}

function rankForPoints(points) {
  if (points >= 520) return "Wurzellegende";
  if (points >= 260) return "Garten-Champ";
  if (points >= 110) return "Beet Boxer";
  return "Keimling";
}

function styleScoreFor(player) {
  const headwearScores = {
    none: 3,
    cap: 14,
    visor: 14,
    beanie: 16,
    crown: 24,
    flower: 26,
    chef: 29,
    bucket: 33,
    halo: 38,
  };
  const headwear = headwearScores[player.headwear] || 14;
  const leaves = player.leaves === "wild" ? 14 : player.leaves === "sprout" ? 11 : 7;
  const pattern = player.pattern === "solid" ? 7 : 16;
  const colorMix = new Set([player.capColor, player.shortsColor, player.gloveColor]).size * 5;
  return 18 + headwear + leaves + pattern + colorMix;
}

function badgesForProfile(player) {
  return [
    { name: "Erster Treffer", unlocked: player.fights > 0 },
    { name: "Sieg im Beet", unlocked: player.wins > 0 },
    { name: "Dreier-Serie", unlocked: player.bestStreak >= 3 },
    { name: "Style-Möhre", unlocked: styleScoreFor(player) >= 70 },
    { name: "Glashaus-Gong", unlocked: isArenaUnlocked("greenhouse", player) },
    { name: "Matsch-Mut", unlocked: isArenaUnlocked("mudpit", player) },
    { name: "Root Rush Club", unlocked: player.points >= 520 },
  ];
}

function cleanName(value) {
  const trimmed = value.trim().replace(/\s+/g, " ");
  return trimmed || "Captain Carrot";
}

function cancelWaitingRoom() {
  clearTimeout(waitingTimer);
  waitingTimer = null;
  els.waitingNotice.hidden = true;
  els.createRoom.disabled = false;
}

function setScreen(name) {
  if (name !== "arena" && fight?.status === "active") {
    clearInterval(fightTimer);
    fight = null;
  }

  if (name !== "lobby") {
    cancelWaitingRoom();
  }

  activeScreen = name;
  els.screens.forEach((screen) => {
    const isActive = screen.dataset.screen === name;
    screen.hidden = !isActive;
    screen.classList.toggle("is-active", isActive);
  });

  els.navButtons.forEach((button) => {
    const isCurrent = button.dataset.screenTarget === name;
    if (isCurrent) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function renderSegmented(container, property, attr) {
  container.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset[attr] === profile[property]));
  });
}

function renderSwatches(container, colors, property) {
  container.innerHTML = "";
  colors.forEach((color) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "swatch";
    button.style.setProperty("--swatch", color.value);
    button.setAttribute("aria-label", color.name);
    button.setAttribute("aria-pressed", String(profile[property] === color.value));
    button.addEventListener("click", () => {
      profile[property] = color.value;
      saveProfileData();
      renderProfile();
    });
    container.append(button);
  });
}

function renderHeadwearOptions() {
  els.headwearPicker.innerHTML = "";
  headwearOptions.forEach((option) => {
    const unlocked = isHeadwearUnlocked(option.id);
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.headwear = option.id;
    button.disabled = !unlocked;
    button.classList.toggle("is-locked", !unlocked);
    button.setAttribute("aria-pressed", String(profile.headwear === option.id));
    button.innerHTML = unlocked
      ? `<span>${option.label}</span>`
      : `<span>${option.label}</span><small>${option.requirement.text}</small>`;
    els.headwearPicker.append(button);
  });
}

function renderMaps() {
  const selectedArena = currentArena();
  profile.selectedArena = selectedArena.id;
  els.mapStrip.innerHTML = "";
  els.yardPreview.dataset.map = selectedArena.id;

  arenaMaps.forEach((arena) => {
    const unlocked = isArenaUnlocked(arena.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "map-card";
    button.classList.toggle("is-active", selectedArena.id === arena.id);
    button.classList.toggle("is-locked", !unlocked);
    button.disabled = !unlocked;
    button.dataset.map = arena.id;
    button.innerHTML = `
      <strong>${arena.shortName}</strong>
      <span>${unlocked ? arena.vibe : arena.requirement.text}</span>
    `;
    button.addEventListener("click", () => {
      profile.selectedArena = arena.id;
      saveProfileData();
      renderProfile({ syncInput: false });
      playSfx("event");
    });
    els.mapStrip.append(button);
  });
}

function leavesSvg(type) {
  if (type === "wild") {
    return `
      <path d="M72 42c-20-22-17-37-5-46 16 5 23 22 15 45" fill="#6cc765"/>
      <path d="M92 38c-7-29 5-43 20-45 12 14 8 34-9 51" fill="#3f9e54"/>
      <path d="M107 42c8-24 23-32 39-27 3 18-11 31-35 38" fill="#7ed26e"/>
      <path d="M81 39c-9-16-5-29 8-35 12 8 12 21 2 36" fill="#92d672"/>
    `;
  }
  if (type === "sprout") {
    return `
      <path d="M88 42c-7-24 1-38 16-43 9 13 7 27-7 44" fill="#45a85a"/>
      <path d="M99 35c10-14 23-18 35-10-1 15-15 22-34 19" fill="#7ed26e"/>
      <circle cx="131" cy="23" r="5" fill="#fff4d8"/>
    `;
  }
  return `
    <path d="M76 42c-12-20-8-32 1-40 13 6 17 19 12 36" fill="#63b95c"/>
    <path d="M92 37c-2-23 8-34 20-36 8 12 5 27-9 42" fill="#4ca553"/>
    <path d="M105 42c6-20 18-27 31-24 2 15-9 26-29 31" fill="#75c66d"/>
  `;
}

function headwearSvg(type, color) {
  if (type === "none") return "";
  if (type === "visor") {
    return `
      <path d="M57 60c15-9 44-9 67 0" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round"/>
      <path d="M101 55c24 0 39 5 47 13-17 5-35 4-54-3" fill="${color}"/>
    `;
  }
  if (type === "beanie") {
    return `
      <path d="M59 58c2-24 18-38 36-38 18 0 32 14 35 38-19 8-49 8-71 0z" fill="${color}"/>
      <path d="M67 56c12 5 37 6 55 0" stroke="rgba(0,0,0,0.22)" stroke-width="4" stroke-linecap="round"/>
      <circle cx="95" cy="18" r="10" fill="${color}"/>
    `;
  }
  if (type === "crown") {
    return `
      <path d="M58 60l8-29 20 19 12-28 14 28 20-19 6 29c-22 8-56 8-80 0z" fill="${color}"/>
      <path d="M63 58c17 6 47 7 70 0" stroke="rgba(0,0,0,0.2)" stroke-width="4" stroke-linecap="round"/>
      <circle cx="66" cy="30" r="4" fill="#fff8bd"/><circle cx="99" cy="22" r="4" fill="#fff8bd"/><circle cx="132" cy="30" r="4" fill="#fff8bd"/>
    `;
  }
  if (type === "flower") {
    return `
      <path d="M58 56c21-9 53-9 76 0" fill="none" stroke="#2e9d5b" stroke-width="8" stroke-linecap="round"/>
      <circle cx="66" cy="47" r="8" fill="#e35c91"/><circle cx="66" cy="47" r="3" fill="#ffc857"/>
      <circle cx="93" cy="41" r="8" fill="#fff8bd"/><circle cx="93" cy="41" r="3" fill="#ffc857"/>
      <circle cx="121" cy="47" r="8" fill="#80bde8"/><circle cx="121" cy="47" r="3" fill="#ffc857"/>
    `;
  }
  if (type === "chef") {
    return `
      <path d="M63 58c6-15 19-20 33-15 13-8 30-2 35 15-19 8-48 8-68 0z" fill="#fff8e5"/>
      <circle cx="72" cy="43" r="15" fill="#fff8e5"/>
      <circle cx="96" cy="35" r="18" fill="#fff8e5"/>
      <circle cx="121" cy="43" r="15" fill="#fff8e5"/>
      <path d="M66 58c16 6 42 6 61 0" stroke="rgba(0,0,0,0.16)" stroke-width="4" stroke-linecap="round"/>
    `;
  }
  if (type === "bucket") {
    return `
      <path d="M62 32h70l-8 32c-19 7-39 7-57 0z" fill="${color}"/>
      <path d="M68 34c8-15 47-15 57 0" fill="none" stroke="#f8f4e9" stroke-width="5" stroke-linecap="round"/>
      <path d="M65 46h63" stroke="rgba(0,0,0,0.18)" stroke-width="4" stroke-linecap="round"/>
      <circle cx="72" cy="39" r="4" fill="#f8f4e9"/><circle cx="122" cy="39" r="4" fill="#f8f4e9"/>
    `;
  }
  if (type === "halo") {
    return `
      <ellipse cx="97" cy="30" rx="34" ry="10" fill="none" stroke="#ffc857" stroke-width="7"/>
      <path d="M63 61c19 8 50 8 69 0" fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round"/>
      <path d="M75 53c10 4 32 5 43 0" stroke="rgba(255,255,255,0.48)" stroke-width="4" stroke-linecap="round"/>
    `;
  }
  return `
    <path d="M61 59c12-10 43-11 62 0" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round"/>
    <path d="M96 52c22 0 37 6 42 15-15 4-31 3-47-4" fill="${color}"/>
  `;
}

function shortsPatternSvg(type, color) {
  if (type === "stripe") {
    return `
      <path d="M66 148h52M62 160h59" stroke="rgba(255,255,255,0.62)" stroke-width="4" stroke-linecap="round"/>
      <path d="M91 144v35" stroke="rgba(0,0,0,0.22)" stroke-width="4" stroke-linecap="round"/>
    `;
  }
  if (type === "dots") {
    return `
      <circle cx="72" cy="153" r="3" fill="rgba(255,255,255,0.7)"/>
      <circle cx="87" cy="164" r="3" fill="rgba(255,255,255,0.7)"/>
      <circle cx="108" cy="153" r="3" fill="rgba(255,255,255,0.7)"/>
      <path d="M91 144v35" stroke="rgba(0,0,0,0.22)" stroke-width="4" stroke-linecap="round"/>
    `;
  }
  return `<path d="M91 144v35" stroke="rgba(0,0,0,0.22)" stroke-width="4" stroke-linecap="round"/>`;
}

function carrotSvg(style = {}, options = {}) {
  const merged = { ...defaultProfile, ...style };
  const classes = ["carrot-avatar"];
  if (options.small) classes.push("small");
  if (options.arena) classes.push("arena-size");

  const face = merged.face || "cool";
  const eyes =
    face === "cool"
      ? `<path d="M62 91h25v12H62zM96 91h25v12H96z" fill="#20252a"/><path d="M87 96h9" stroke="#20252a" stroke-width="4" stroke-linecap="round"/>`
      : face === "focus"
        ? `<path d="M65 86l20 6" stroke="#20252a" stroke-width="5" stroke-linecap="round"/><path d="M116 86l-20 6" stroke="#20252a" stroke-width="5" stroke-linecap="round"/><circle cx="76" cy="101" r="4" fill="#20252a"/><circle cx="106" cy="101" r="4" fill="#20252a"/>`
        : `<circle cx="76" cy="96" r="5" fill="#20252a"/><circle cx="106" cy="96" r="5" fill="#20252a"/>`;

  const mouth =
    face === "focus"
      ? `<path d="M77 121h28" stroke="#733013" stroke-width="5" stroke-linecap="round"/>`
      : face === "grin"
        ? `<path d="M72 116c11 16 28 16 39 0" fill="none" stroke="#733013" stroke-width="5" stroke-linecap="round"/><path d="M80 119h22" stroke="#fff7e8" stroke-width="4" stroke-linecap="round"/>`
        : `<path d="M77 116c8 9 21 9 29 0" fill="none" stroke="#733013" stroke-width="5" stroke-linecap="round"/>`;

  const mirror = options.mirror ? ` transform="translate(180 0) scale(-1 1)"` : "";
  const lean = options.pose === "special" ? "rotate(6 91 118)" : options.pose === "block" ? "rotate(-3 91 118)" : "";

  return `
    <svg class="${classes.join(" ")}" viewBox="0 0 180 230" role="img" aria-label="Karottenfighter">
      <g${mirror}>
        <ellipse cx="91" cy="207" rx="48" ry="10" fill="rgba(37, 55, 29, 0.18)"/>
        <g transform="${lean}">
          <path d="M62 46c8-11 19-19 30-19 12 0 24 8 31 20 17 28 8 98-29 151-3 5-7 5-10 0C50 146 42 76 62 46z" fill="#f47a24"/>
          <path d="M93 28c12 14 14 63 4 105-6 27-18 55-34 76 8 11 20 17 24 17 3 0 7-2 10-7 37-53 46-123 29-151-7-13-20-22-33-40z" fill="#c95518" opacity="0.45"/>
          <path d="M71 72h38M66 105h47M68 137h36" stroke="#d45e1c" stroke-width="5" stroke-linecap="round" opacity="0.55"/>
          ${leavesSvg(merged.leaves)}
          ${headwearSvg(merged.headwear, merged.capColor)}
          <path d="M56 142c19 9 50 10 70 0l-8 32c-17 7-39 7-55 0z" fill="${merged.shortsColor}"/>
          ${shortsPatternSvg(merged.pattern, merged.shortsColor)}
          <path d="M64 127c-22 4-34-6-39-19" fill="none" stroke="#67a14d" stroke-width="11" stroke-linecap="round"/>
          <path d="M121 127c21 5 34-4 41-17" fill="none" stroke="#67a14d" stroke-width="11" stroke-linecap="round"/>
          <circle cx="24" cy="106" r="16" fill="${merged.gloveColor}"/>
          <circle cx="160" cy="107" r="17" fill="${merged.gloveColor}"/>
          <path d="M24 98c6 3 9 8 9 16M160 98c-7 4-10 9-10 18" stroke="rgba(255,255,255,0.4)" stroke-width="4" stroke-linecap="round"/>
          ${eyes}
          ${mouth}
          <path d="M70 184l-10 22M111 184l12 22" stroke="#7b3f19" stroke-width="7" stroke-linecap="round"/>
          <path d="M55 207h17M114 207h18" stroke="${merged.gloveColor}" stroke-width="8" stroke-linecap="round"/>
        </g>
      </g>
    </svg>
  `;
}

function outfitLabel(player) {
  const option = headwearOptions.find((item) => item.id === player.headwear);
  const head = player.headwear === "none" ? "No hat" : option?.label || player.headwear;
  return `${head} · ${player.pattern} shorts · ${player.leaves}`;
}

function renderProfile(options = {}) {
  const { syncInput = true } = options;
  sanitizeProfileUnlocks();
  if (syncInput) {
    els.carrotName.value = profile.name;
  }

  const avatar = carrotSvg(profile);
  els.homeCarrot.innerHTML = avatar;
  els.carrotPreview.innerHTML = avatar;
  els.homeName.textContent = profile.name;
  els.homeFit.textContent = outfitLabel(profile);
  els.lockerNamePreview.textContent = profile.name;
  els.lockerStylePreview.textContent = outfitLabel(profile);
  els.styleScore.textContent = String(styleScoreFor(profile));

  renderSwatches(els.capSwatches, capColors, "capColor");
  renderSwatches(els.shortsSwatches, shortsColors, "shortsColor");
  renderSwatches(els.gloveSwatches, gloveColors, "gloveColor");
  renderHeadwearOptions();
  renderSegmented(els.headwearPicker, "headwear", "headwear");
  renderSegmented(els.leafPicker, "leaves", "leaves");
  renderSegmented(els.patternPicker, "pattern", "pattern");
  renderSegmented(els.facePicker, "face", "face");
  renderMaps();
  renderRooms();
  renderFeaturedFight();

  els.stripPoints.textContent = String(profile.points);
  els.stripRecord.textContent = `${profile.wins}-${profile.losses}`;
  els.stripRank.textContent = rankForPoints(profile.points);
  els.winsStat.textContent = String(profile.wins);
  els.lossesStat.textContent = String(profile.losses);
  els.fightsStat.textContent = String(profile.fights);
  els.streakStat.textContent = String(profile.streak);

  els.badgeList.innerHTML = "";
  badgesForProfile(profile).forEach((badge) => {
    const item = document.createElement("span");
    item.className = badge.unlocked ? "badge" : "badge locked";
    item.textContent = badge.name;
    els.badgeList.append(item);
  });

  els.careerLog.innerHTML = "";
  const logItems = profile.careerLog.length
    ? profile.careerLog
    : ["Noch kein Kampf. Der Garten wartet."];
  logItems.slice(0, 8).forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = entry;
    els.careerLog.append(item);
  });
}

function renderPresets() {
  els.outfitPresets.innerHTML = "";
  outfitPresets.forEach((preset) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "preset-card";
    button.innerHTML = `<strong>${preset.name}</strong><span>${preset.note}</span>`;
    button.addEventListener("click", () => {
      profile = { ...profile, ...preset.style };
      saveProfileData();
      renderProfile();
      playSfx("dodge");
    });
    els.outfitPresets.append(button);
  });
}

function renderRooms() {
  els.roomList.innerHTML = "";
  rooms.forEach((room) => {
    const arena = getArena(room.arenaId);
    const locked = !isArenaUnlocked(arena.id);
    const pot = Math.round(room.pot * arena.pointBonus);
    const card = document.createElement("article");
    card.className = "room-card";
    card.classList.toggle("is-locked", locked);
    card.innerHTML = `
      <div class="room-avatar">${carrotSvg(room.style, { small: true, mirror: true })}</div>
      <div class="room-copy">
        <h2>${room.host}</h2>
        <div class="room-meta">
          <span>${room.corner}</span>
          <span>${arena.shortName}</span>
          <span>${room.record}</span>
          <span>${pot} Punkte</span>
          <span>${room.tactic}</span>
        </div>
        <button class="join-button" type="button" ${locked ? "disabled" : ""}>
          ${locked ? `Gesperrt: ${arena.requirement.text}` : "Beitreten"}
        </button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => {
      if (!locked) startFight(room);
    });
    els.roomList.append(card);
  });
}

function renderFeaturedFight() {
  const featured = rooms.find((room) => isArenaUnlocked(room.arenaId)) || rooms[0];
  const arena = getArena(featured.arenaId);
  els.featuredOpponent.textContent = `${featured.host} wartet`;
  els.featuredCopy.textContent = `${arena.shortName}, ${Math.round(featured.pot * arena.pointBonus)} Punkte, ${featured.tactic}.`;
}

function makeRandomOpponent() {
  const cap = choice(capColors).value;
  const shorts = choice(shortsColors).value;
  const gloves = choice(gloveColors).value;
  return {
    id: `guest-${Date.now()}`,
    host: choice(botNames),
    corner: currentArena().name,
    arenaId: currentArena().id,
    record: `${randomBetween(0, 9)}-${randomBetween(0, 6)}`,
    pot: randomBetween(18, 42),
    difficulty: Math.random() > 0.55 ? 1.05 : 0.86,
    evasion: Math.random() > 0.5 ? 0.2 : 0.12,
    guard: Math.random() > 0.5 ? 0.16 : 0.08,
    tactic: "unberechenbar",
    style: {
      capColor: cap,
      shortsColor: shorts,
      gloveColor: gloves,
      headwear: choice(["cap", "visor", "beanie", "crown", "none", "flower", "chef"]),
      leaves: choice(["classic", "wild", "sprout"]),
      pattern: choice(["solid", "stripe", "dots"]),
      face: choice(["cool", "grin", "focus"]),
    },
  };
}

function openRoom() {
  cancelWaitingRoom();
  els.waitingNotice.hidden = false;
  els.waitingText.textContent = "Dein Gartenring ist offen. Ein Gegner kommt gleich.";
  els.createRoom.disabled = true;
  waitingTimer = setTimeout(() => {
    els.waitingText.textContent = "Gegner gefunden.";
    waitingTimer = setTimeout(() => {
      els.waitingNotice.hidden = true;
      els.createRoom.disabled = false;
      waitingTimer = null;
      startFight(makeRandomOpponent());
    }, 500);
  }, 1250);
}

function startFight(room) {
  clearInterval(fightTimer);
  cancelWaitingRoom();

  const arena = isArenaUnlocked(room.arenaId) ? getArena(room.arenaId) : currentArena();
  const pot = Math.round(room.pot * arena.pointBonus);
  const opponent = {
    name: room.host,
    pot,
    difficulty: room.difficulty,
    evasion: room.evasion,
    guard: room.guard,
    style: room.style,
  };

  fight = {
    lastRoom: room,
    opponent,
    arena,
    playerHp: 100,
    opponentHp: 100,
    energy: 82,
    focus: 0,
    enemyEnergy: 76,
    enemyFocus: 0,
    round: 1,
    tick: 0,
    dodgeUntil: 0,
    guardUntil: 0,
    opponentDodgeUntil: 0,
    opponentGuardUntil: 0,
    stunnedUntil: 0,
    status: "active",
    combo: 0,
    event: null,
    eventUntil: 0,
    stats: {
      playerSwings: 0,
      playerHits: 0,
      playerMisses: 0,
      opponentHits: 0,
      damageDealt: 0,
      damageTaken: 0,
      biggestHit: 0,
      biggestMove: "Jab",
      maxCombo: 0,
      blocks: 0,
      dodges: 0,
      specials: 0,
      events: 0,
    },
    report: null,
    log: [`${profile.name} betritt ${arena.name} gegen ${opponent.name}.`],
  };

  els.fightResult.hidden = true;
  els.winnerBanner.textContent = "";
  els.winnerBanner.classList.remove("is-showing");
  els.resultReport.innerHTML = "";
  setFightButtonsEnabled(true);
  setScreen("arena");
  renderArena();
  fightTimer = setInterval(fightTick, 920);
}

function closeArena() {
  clearInterval(fightTimer);
  fight = null;
  setScreen("lobby");
}

function fightTick() {
  if (!fight || fight.status !== "active") return;

  const now = Date.now();
  const focusBonus = ["greenhouse", "moonlight"].includes(fight.arena.id) ? 2 : 0;
  const energyBonus = fight.arena.id === "pumpkin" ? 2 : 0;
  fight.tick += 1;
  fight.round = Math.floor(fight.tick / 18) + 1;
  fight.energy = clamp(fight.energy + (fight.event?.id === "crowd" ? 9 : 7) + energyBonus, 0, 100);
  fight.focus = clamp(fight.focus + (fight.event?.id === "sun" ? 4 : 1) + focusBonus, 0, 100);
  fight.enemyEnergy = clamp(fight.enemyEnergy + 8, 0, 100);
  fight.enemyFocus = clamp(fight.enemyFocus + 2, 0, 100);

  if (fight.event && now > fight.eventUntil) {
    fight.event = null;
    addFightLog("Der Garten beruhigt sich wieder.");
  }

  if (!fight.event && fight.tick > 3 && fight.tick % 9 === 0) {
    triggerGardenEvent();
  }

  if (fight.tick % 3 === 0 || Math.random() > 0.78) {
    opponentAction();
  }

  renderArena();
}

function triggerGardenEvent() {
  if (!fight) return;
  const pool = fight.arena?.eventBias?.length ? fight.arena.eventBias : gardenEvents.map((event) => event.id);
  const eventId = choice(pool);
  const event = gardenEvents.find((item) => item.id === eventId) || choice(gardenEvents);
  fight.event = event;
  fight.eventUntil = Date.now() + event.duration;
  fight.stats.events += 1;
  addFightLog(event.log);
  playSfx("event");
}

function addFightLog(message) {
  if (!fight) return;
  fight.log.unshift(message);
  fight.log = fight.log.slice(0, 9);
}

function accuracyModifier() {
  if (!fight?.event) return 0;
  if (fight.event.id === "wind") return -0.13;
  if (fight.event.id === "crowd") return 0.05;
  return 0;
}

function playerStrike(kind) {
  if (!fight || fight.status !== "active") return;

  const moves = {
    jab: { name: "Jab", cost: 10, min: 7, max: 12, accuracy: 0.92, focus: 8, flash: "is-punching" },
    haymaker: { name: "Haymaker", cost: 26, min: 18, max: 27, accuracy: 0.68, focus: 16, flash: "is-haymaker" },
    special: { name: "Root Rush", cost: 18, min: 34, max: 46, accuracy: 0.98, focus: 0, flash: "is-special" },
  };
  const move = moves[kind];

  if (kind === "special" && fight.focus < 100) {
    addFightLog("Root Rush ist noch nicht bereit.");
    renderArena();
    return;
  }
  if (fight.energy < move.cost) {
    addFightLog(`${profile.name} braucht kurz Luft.`);
    renderArena();
    return;
  }

  fight.energy -= move.cost;
  fight.stats.playerSwings += 1;
  if (kind === "special") fight.stats.specials += 1;
  fight.combo = kind === "haymaker" ? Math.max(0, fight.combo - 1) : fight.combo + 1;
  if (kind === "special") {
    fight.focus = 0;
    fight.combo += 2;
  } else {
    fight.focus = clamp(fight.focus + move.focus, 0, 100);
  }

  flash(els.playerFighter, move.flash, kind === "special" ? 520 : 290);
  playSfx(kind === "special" ? "special" : "swing");

  const opponentDodged = Date.now() < fight.opponentDodgeUntil;
  const hitRoll = Math.random();
  const accuracy = clamp(move.accuracy + accuracyModifier() - fight.opponent.evasion * 0.3, 0.35, 0.99);

  if (opponentDodged || hitRoll > accuracy) {
    addFightLog(`${fight.opponent.name} lässt ${move.name} durchs Gras rauschen.`);
    fight.stats.playerMisses += 1;
    fight.combo = 0;
    renderArena();
    return;
  }

  let damage = randomBetween(move.min, move.max) + Math.min(fight.combo * 2, 10);
  if (Date.now() < fight.opponentGuardUntil) {
    damage = Math.round(damage * (0.44 - fight.opponent.guard * 0.2));
    addFightLog(`${fight.opponent.name} blockt viel weg.`);
  } else {
    damage = Math.round(damage * (1 - fight.opponent.guard));
  }

  fight.opponentHp = clamp(fight.opponentHp - damage, 0, 100);
  fight.stats.playerHits += 1;
  fight.stats.damageDealt += damage;
  fight.stats.maxCombo = Math.max(fight.stats.maxCombo, fight.combo);
  if (damage > fight.stats.biggestHit) {
    fight.stats.biggestHit = damage;
    fight.stats.biggestMove = move.name;
  }
  if (kind === "special") {
    fight.stunnedUntil = Date.now() + 900;
    addFightLog(`Root Rush trifft brutal: -${damage} HP.`);
  } else {
    addFightLog(`${profile.name} landet ${move.name}: -${damage} HP.`);
  }
  flash(els.opponentFighter, "is-hit");
  showImpact("opponent");
  playSfx("hit");

  if (fight.opponentHp <= 0) {
    endFight("win");
    return;
  }
  renderArena();
}

function playerBlock() {
  if (!fight || fight.status !== "active") return;
  if (fight.energy < 8) {
    addFightLog("Zu wenig Energie fürs Blocken.");
    renderArena();
    return;
  }
  fight.energy -= 8;
  fight.focus = clamp(fight.focus + 7, 0, 100);
  fight.combo = 0;
  fight.guardUntil = Date.now() + 1250;
  fight.stats.blocks += 1;
  addFightLog(`${profile.name} zieht die Handschuhe hoch.`);
  flash(els.playerFighter, "is-blocking", 1200);
  playSfx("block");
  renderArena();
}

function playerDodge() {
  if (!fight || fight.status !== "active") return;
  const cost = fight.event?.id === "mud" || fight.arena.id === "mudpit" ? 22 : 15;
  if (fight.energy < cost) {
    addFightLog("Zu wenig Energie fürs Ausweichen.");
    renderArena();
    return;
  }

  fight.energy -= cost;
  fight.combo = 0;
  fight.focus = clamp(fight.focus + 5, 0, 100);
  fight.stats.dodges += 1;
  fight.dodgeUntil = Date.now() + (fight.event?.id === "mud" || fight.arena.id === "mudpit" ? 650 : 900);
  addFightLog(`${profile.name} slidet am Beet-Rand vorbei.`);
  flash(els.playerFighter, "is-dodging", 860);
  playSfx("dodge");
  renderArena();
}

function opponentAction() {
  if (!fight || fight.status !== "active") return;
  const now = Date.now();
  if (now < fight.stunnedUntil) {
    addFightLog(`${fight.opponent.name} wackelt kurz auf der Stelle.`);
    return;
  }

  if (fight.enemyFocus >= 100 && fight.enemyEnergy >= 18 && Math.random() > 0.46) {
    opponentStrike("special");
    return;
  }

  if (Math.random() < 0.2 && fight.enemyEnergy >= 11) {
    fight.enemyEnergy -= 11;
    fight.opponentGuardUntil = now + 980;
    fight.enemyFocus = clamp(fight.enemyFocus + 8, 0, 100);
    addFightLog(`${fight.opponent.name} macht dicht.`);
    flash(els.opponentFighter, "is-blocking", 940);
    return;
  }

  if (Math.random() < 0.24 && fight.enemyEnergy >= 13) {
    fight.enemyEnergy -= 13;
    fight.opponentDodgeUntil = now + 720;
    addFightLog(`${fight.opponent.name} tänzelt durch den Ring.`);
    flash(els.opponentFighter, "is-dodging", 700);
    return;
  }

  opponentStrike(Math.random() > 0.72 ? "haymaker" : "jab");
}

function opponentStrike(kind) {
  const moves = {
    jab: { name: "Jab", cost: 10, min: 5, max: 9, accuracy: 0.86, flash: "is-punching" },
    haymaker: { name: "Haymaker", cost: 25, min: 10, max: 18, accuracy: 0.62, flash: "is-haymaker" },
    special: { name: "Root Rush", cost: 18, min: 22, max: 31, accuracy: 0.9, flash: "is-special" },
  };
  const move = moves[kind];
  if (!fight || fight.enemyEnergy < move.cost) return;

  fight.enemyEnergy -= move.cost;
  if (kind === "special") {
    fight.enemyFocus = 0;
  } else {
    fight.enemyFocus = clamp(fight.enemyFocus + 10, 0, 100);
  }
  flash(els.opponentFighter, move.flash, kind === "special" ? 520 : 290);

  const playerDodged = Date.now() < fight.dodgeUntil;
  const hitRoll = Math.random();
  const accuracy = clamp(move.accuracy + accuracyModifier() - 0.02, 0.32, 0.98);

  if (playerDodged || hitRoll > accuracy) {
    addFightLog(`${fight.opponent.name} verfehlt mit ${move.name}.`);
    playSfx("swing");
    return;
  }

  let damage = Math.round(randomBetween(move.min, move.max) * fight.opponent.difficulty);
  if (Date.now() < fight.guardUntil) {
    damage = Math.max(2, Math.round(damage * 0.36));
    fight.focus = clamp(fight.focus + 10, 0, 100);
    addFightLog(`${profile.name} blockt den Treffer ab.`);
  } else {
    fight.combo = 0;
  }

  fight.playerHp = clamp(fight.playerHp - damage, 0, 100);
  fight.stats.opponentHits += 1;
  fight.stats.damageTaken += damage;
  addFightLog(`${fight.opponent.name} trifft mit ${move.name}: -${damage} HP.`);
  flash(els.playerFighter, "is-hit");
  showImpact("player");
  playSfx(kind === "special" ? "special" : "hit");

  if (fight.playerHp <= 0) {
    endFight("loss");
  }
}

function buildFightReport(won, pointDelta, unlocks) {
  const stats = fight.stats;
  const swings = Math.max(1, stats.playerSwings);
  const accuracy = Math.round((stats.playerHits / swings) * 100);
  const combo = Math.max(stats.maxCombo, fight.combo);
  const defenseBits = [];
  if (stats.blocks) defenseBits.push(`${stats.blocks} Blocks`);
  if (stats.dodges) defenseBits.push(`${stats.dodges} Slides`);
  const defense = defenseBits.length ? defenseBits.join(" und ") : "kein Sicherheitsnetz";

  const highlights = [
    `${stats.playerHits}/${stats.playerSwings} Treffer (${accuracy}%) und ${stats.damageDealt} Schaden verteilt.`,
    stats.biggestHit
      ? `Highlight: ${stats.biggestMove} fuer ${stats.biggestHit} HP, beste Combo x${combo}.`
      : "Highlight: Viel Schattenboxen, aber die Karotte blieb mutig.",
    `${fight.arena.name}: ${stats.events} Gartenmoment(e), ${defense}, ${pointDelta} Punkte.`,
  ];

  if (unlocks.length) {
    highlights.unshift(`Freigeschaltet: ${unlocks.slice(0, 3).join(" · ")}${unlocks.length > 3 ? " · mehr" : ""}.`);
  }

  if (!won) {
    highlights.push(`${fight.opponent.name} landete ${stats.opponentHits} Treffer. Revanche riecht nach frischer Erde.`);
  }

  return {
    title: won ? "K.O. im Karottenstil" : "Runde verloren",
    copy: won
      ? `+${pointDelta} Punkte. Der Garten hat deinen Namen gehoert.`
      : `+${pointDelta} Punkte. Deine Karotte ist nicht erledigt, nur kurz geduenstet.`,
    highlights,
  };
}

function endFight(result) {
  if (!fight || fight.status !== "active") return;

  clearInterval(fightTimer);
  fight.status = "ended";
  setFightButtonsEnabled(false);

  const won = result === "win";
  const previousProfile = { ...profile };
  const styleBonus = Math.round(styleScoreFor(profile) / 18);
  const pointDelta = won
    ? fight.opponent.pot + 18 + fight.round * 3 + styleBonus
    : Math.max(7, Math.round(fight.opponent.pot / 4) + styleBonus);
  profile.fights += 1;
  profile.points += pointDelta;

  if (won) {
    profile.wins += 1;
    profile.streak += 1;
    profile.bestStreak = Math.max(profile.bestStreak, profile.streak);
    addFightLog(`${profile.name} gewinnt den Gartenkampf.`);
  } else {
    profile.losses += 1;
    profile.streak = 0;
    addFightLog(`${fight.opponent.name} gewinnt diese Runde.`);
  }

  const unlocks = newUnlocksBetween(previousProfile, profile);
  const report = buildFightReport(won, pointDelta, unlocks);
  fight.report = report;
  profile.lastReport = report.highlights[0];
  profile.careerLog.unshift(
    `${won ? "Sieg" : "Niederlage"} gegen ${fight.opponent.name}: +${pointDelta} Punkte · ${fight.arena.shortName}`
  );
  if (unlocks.length) {
    profile.careerLog.unshift(`Freigeschaltet: ${unlocks.slice(0, 3).join(" · ")}`);
  }
  profile.careerLog = profile.careerLog.slice(0, 10);
  saveProfileData();
  renderProfile();

  els.winnerBanner.textContent = won
    ? `And the winner iiiis... ${profile.name}!`
    : `And the comeback iiiis... ${profile.name}.`;
  els.winnerBanner.classList.remove("is-showing");
  void els.winnerBanner.offsetWidth;
  els.winnerBanner.classList.add("is-showing");
  els.resultTitle.textContent = report.title;
  els.resultCopy.textContent = report.copy;
  els.resultReport.innerHTML = "";
  report.highlights.forEach((highlight) => {
    const item = document.createElement("li");
    item.textContent = highlight;
    els.resultReport.append(item);
  });
  els.fightResult.hidden = false;
  if (won) playSfx("applause");
  renderArena();
}

function setFightButtonsEnabled(enabled) {
  [els.jabButton, els.haymakerButton, els.blockButton, els.dodgeButton, els.specialButton].forEach((button) => {
    button.disabled = !enabled;
  });
}

function renderArena() {
  if (!fight) return;

  const guardActive = Date.now() < fight.guardUntil;
  const dodgeActive = Date.now() < fight.dodgeUntil;
  const opponentGuardActive = Date.now() < fight.opponentGuardUntil;
  const opponentDodgeActive = Date.now() < fight.opponentDodgeUntil;

  els.arenaTitle.textContent = `${fight.arena.name}: ${profile.name} vs ${fight.opponent.name}`;
  els.playerArenaName.textContent = profile.name;
  els.opponentArenaName.textContent = fight.opponent.name;
  els.roundPill.textContent = `Runde ${fight.round}`;
  els.comboPill.textContent = `Combo x${fight.combo}`;
  els.eventPill.textContent = fight.event ? fight.event.label : fight.arena.shortName;
  els.playerHpBar.style.width = `${fight.playerHp}%`;
  els.opponentHpBar.style.width = `${fight.opponentHp}%`;
  els.energyBar.style.width = `${fight.energy}%`;
  els.focusBar.style.width = `${fight.focus}%`;
  els.arenaStage.dataset.map = fight.arena.id;
  els.specialButton.disabled = fight.status !== "active" || fight.focus < 100 || fight.energy < 18;

  els.playerFighter.innerHTML = carrotSvg(profile, {
    arena: true,
    pose: guardActive ? "block" : "idle",
  });
  els.opponentFighter.innerHTML = carrotSvg(fight.opponent.style, {
    arena: true,
    mirror: true,
    pose: opponentGuardActive ? "block" : "idle",
  });

  els.playerFighter.style.left = dodgeActive ? "25%" : guardActive ? "29%" : "32%";
  els.opponentFighter.style.left = opponentDodgeActive ? "75%" : opponentGuardActive ? "71%" : "68%";
  els.arenaStage.classList.toggle("event-wind", fight.event?.id === "wind");

  els.fightLog.innerHTML = "";
  fight.log.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = entry;
    els.fightLog.append(item);
  });
}

function flash(node, className, duration = 260) {
  node.classList.remove(className);
  void node.offsetWidth;
  node.classList.add(className);
  setTimeout(() => node.classList.remove(className), duration);
}

function showImpact(target) {
  const positions = target === "opponent" ? { left: "67%", top: "46%" } : { left: "33%", top: "56%" };
  els.impactBurst.style.left = positions.left;
  els.impactBurst.style.top = positions.top;
  els.impactBurst.classList.remove("show");
  void els.impactBurst.offsetWidth;
  els.impactBurst.classList.add("show");
}

function ensureAudioContext() {
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

function playTone(frequency, duration = 0.12, type = "triangle", volume = 0.04) {
  try {
    const ctx = ensureAudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(55, frequency * 0.72), now + duration);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  } catch {
    // Audio is decorative and must never block the UI.
  }
}

function playMusicTone(frequency, duration = 0.2, type = "sine", volume = 0.018) {
  try {
    const ctx = ensureAudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.frequency.setValueAtTime(frequency * 1.005, now + duration * 0.35);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  } catch {
    // Background music is optional.
  }
}

function playChord(root, minor = false) {
  const third = minor ? 1.2 : 1.25;
  [1, third, 1.5].forEach((ratio, index) => {
    playMusicTone(root * ratio, 0.42, index === 0 ? "triangle" : "sine", index === 0 ? 0.012 : 0.008);
  });
}

function playPercussion(kind) {
  try {
    const ctx = ensureAudioContext();
    const now = ctx.currentTime;

    if (kind === "kick") {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(128, now);
      oscillator.frequency.exponentialRampToValueAtTime(48, now + 0.16);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.2);
      return;
    }

    const length = kind === "snare" ? 0.13 : kind === "clap" ? 0.065 : 0.045;
    const buffer = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * length)), ctx.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < channel.length; i += 1) {
      channel[i] = Math.random() * 2 - 1;
    }
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = buffer;
    filter.type = kind === "snare" || kind === "clap" ? "bandpass" : "highpass";
    filter.frequency.setValueAtTime(kind === "snare" ? 1700 : kind === "clap" ? 2200 : 6200, now);
    gain.gain.setValueAtTime(kind === "snare" ? 0.025 : kind === "clap" ? 0.038 : 0.012, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + length);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(now);
    source.stop(now + length);
  } catch {
    // Percussion is optional.
  }
}

function playApplause() {
  for (let i = 0; i < 18; i += 1) {
    setTimeout(() => {
      playPercussion("clap");
      if (i % 5 === 0) {
        playTone(randomBetween(520, 760), 0.08, "triangle", 0.018);
      }
    }, i * 48 + randomBetween(0, 32));
  }
  setTimeout(() => {
    playTone(392, 0.18, "triangle", 0.032);
    playTone(523, 0.18, "triangle", 0.024);
  }, 760);
}

function playSfx(type) {
  if (type === "applause") {
    playApplause();
    return;
  }
  const map = {
    hit: [142, 0.1, "square", 0.055],
    swing: [230, 0.08, "triangle", 0.038],
    dodge: [330, 0.09, "sine", 0.035],
    block: [188, 0.12, "square", 0.034],
    special: [96, 0.22, "sawtooth", 0.05],
    event: [510, 0.18, "triangle", 0.028],
  };
  playTone(...(map[type] || map.swing));
}

function startMusic() {
  if (musicEnabled) return;
  try {
    ensureAudioContext();
  } catch {
    return;
  }

  musicEnabled = true;
  musicStep = 0;
  els.musicToggle.setAttribute("aria-pressed", "true");
  els.musicLabel.textContent = "Musik an";
  const melody = [
    392, null, 440, 523, null, 587, 523, null,
    440, null, 392, 330, 392, null, 440, null,
    523, null, 587, 659, null, 587, 523, null,
    440, 392, null, 330, 349, null, 392, null,
  ];
  const bassRoots = [98, 123.47, 110, 82.41];
  const chordRoots = [196, 246.94, 220, 164.81];

  const playGrooveStep = () => {
    const step = musicStep % 32;
    const bar = Math.floor(step / 8) % 4;

    if (step % 4 === 0) playPercussion("kick");
    if (step % 8 === 4) playPercussion("snare");
    if (step % 2 === 1) playPercussion("hat");
    if (step % 8 === 0) playChord(chordRoots[bar], bar === 2);
    if (step % 4 === 0 || step % 8 === 6) {
      playMusicTone(bassRoots[bar] * (step % 8 === 6 ? 1.5 : 1), 0.2, "triangle", 0.016);
    }

    const note = melody[step];
    if (note) {
      playMusicTone(note, step % 8 === 3 ? 0.24 : 0.16, step % 4 === 0 ? "triangle" : "sine", 0.018);
      if (step % 8 === 3 || step % 8 === 6) {
        playMusicTone(note * 2, 0.11, "sine", 0.007);
      }
    }

    musicStep += 1;
  };

  playGrooveStep();
  musicTimer = setInterval(playGrooveStep, 145);
}

function stopMusic() {
  musicEnabled = false;
  clearInterval(musicTimer);
  clearInterval(bassTimer);
  musicTimer = null;
  bassTimer = null;
  els.musicToggle.setAttribute("aria-pressed", "false");
  els.musicLabel.textContent = "Musik";
}

function toggleMusic() {
  if (musicEnabled) {
    stopMusic();
  } else {
    startMusic();
  }
}

els.navButtons.forEach((button) => {
  button.addEventListener("click", () => setScreen(button.dataset.screenTarget));
});

document.addEventListener("click", (event) => {
  const quickFight = event.target.closest("[data-quick-fight]");
  if (!quickFight) return;
  event.preventDefault();
  startFight(rooms[0]);
});

els.musicToggle.addEventListener("click", toggleMusic);

els.carrotName.addEventListener("input", (event) => {
  profile.name = cleanName(event.target.value);
  renderProfile({ syncInput: false });
});

els.carrotName.addEventListener("blur", () => {
  profile.name = cleanName(els.carrotName.value);
  saveProfileData();
  renderProfile();
});

[
  [els.headwearPicker, "headwear", "headwear"],
  [els.leafPicker, "leaves", "leaves"],
  [els.patternPicker, "pattern", "pattern"],
  [els.facePicker, "face", "face"],
].forEach(([container, property, dataKey]) => {
  container.addEventListener("click", (event) => {
    const button = event.target.closest(`button[data-${dataKey}]`);
    if (!button || button.disabled) return;
    profile[property] = button.dataset[dataKey];
    saveProfileData();
    renderProfile();
    playSfx("dodge");
  });
});

els.saveProfile.addEventListener("click", () => {
  profile.name = cleanName(els.carrotName.value);
  saveProfileData();
  renderProfile();
  els.saveProfile.textContent = "Fit gespeichert";
  playSfx("event");
  setTimeout(() => {
    els.saveProfile.textContent = "Fit speichern";
  }, 950);
});

els.createRoom.addEventListener("click", openRoom);
els.leaveArena.addEventListener("click", closeArena);
els.backToLobby.addEventListener("click", closeArena);
els.rematchButton.addEventListener("click", () => {
  const room = fight?.lastRoom || rooms[0];
  startFight(room);
});
els.jabButton.addEventListener("click", () => playerStrike("jab"));
els.haymakerButton.addEventListener("click", () => playerStrike("haymaker"));
els.blockButton.addEventListener("click", playerBlock);
els.dodgeButton.addEventListener("click", playerDodge);
els.specialButton.addEventListener("click", () => playerStrike("special"));

document.addEventListener("keydown", (event) => {
  if (!fight || activeScreen !== "arena") return;
  const key = event.key.toLowerCase();
  if (event.code === "Space" || key === "j") {
    event.preventDefault();
    playerStrike("jab");
  }
  if (key === "h") {
    event.preventDefault();
    playerStrike("haymaker");
  }
  if (key === "b") {
    event.preventDefault();
    playerBlock();
  }
  if (key === "a" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    playerDodge();
  }
  if (key === "s") {
    event.preventDefault();
    playerStrike("special");
  }
});

renderFeaturedFight();
renderPresets();
renderRooms();
renderProfile();
setScreen("home");
