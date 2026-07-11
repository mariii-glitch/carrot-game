const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");

const PORT = Number(process.env.PORT || 8100);
const HOST = process.env.HOST || "0.0.0.0";
const PUBLIC_DIR = __dirname;
const ROOM_TTL = 30 * 60 * 1000;
const SERVER_TICK_MS = 650;

const rooms = new Map();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function json(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 200_000) {
        req.destroy();
        reject(new Error("Body too large"));
      }
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function cleanText(value, fallback, max = 32) {
  const text = String(value || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
  return text || fallback;
}

function sanitizeStyle(style = {}) {
  return {
    capColor: cleanText(style.capColor, "#2f7fd1", 12),
    shortsColor: cleanText(style.shortsColor, "#226f46", 12),
    gloveColor: cleanText(style.gloveColor, "#d94141", 12),
    headwear: cleanText(style.headwear, "cap", 16),
    leaves: cleanText(style.leaves, "classic", 16),
    pattern: cleanText(style.pattern, "solid", 16),
    face: cleanText(style.face, "cool", 16),
  };
}

function sanitizeProfile(profile = {}) {
  return {
    name: cleanText(profile.name, "Captain Carrot", 18),
    style: sanitizeStyle(profile),
    points: Number.isFinite(Number(profile.points)) ? clamp(Number(profile.points), 0, 99999) : 0,
    rank: cleanText(profile.rank, "Keimling", 24),
  };
}

function sanitizeArena(arena = {}) {
  return {
    id: cleanText(arena.id, "garden", 24),
    name: cleanText(arena.name, "Classic Beet", 40),
    shortName: cleanText(arena.shortName, "Beet", 18),
    pointBonus: Number.isFinite(Number(arena.pointBonus)) ? clamp(Number(arena.pointBonus), 0.7, 2) : 1,
  };
}

function makePlayer(playerId, profile, role) {
  const safe = sanitizeProfile(profile);
  return {
    id: playerId,
    role,
    name: safe.name,
    style: safe.style,
    points: safe.points,
    rank: safe.rank,
    hp: 100,
    energy: 84,
    focus: 0,
    combo: 0,
    guardUntil: 0,
    dodgeUntil: 0,
    actionCooldownUntil: 0,
    stats: {
      swings: 0,
      hits: 0,
      misses: 0,
      damageDealt: 0,
      damageTaken: 0,
      biggestHit: 0,
      blocks: 0,
      dodges: 0,
      specials: 0,
      maxCombo: 0,
    },
  };
}

function publicRoom(room) {
  return {
    id: room.id,
    status: room.status,
    arena: room.arena,
    pot: room.pot,
    round: room.round,
    hostId: room.hostId,
    guestId: room.guestId,
    players: Object.values(room.players).map((player) => ({
      id: player.id,
      role: player.role,
      name: player.name,
      style: player.style,
      points: player.points,
      rank: player.rank,
      hp: player.hp,
      energy: player.energy,
      focus: player.focus,
      combo: player.combo,
      guardUntil: player.guardUntil,
      dodgeUntil: player.dodgeUntil,
      actionCooldownUntil: player.actionCooldownUntil,
      stats: player.stats,
    })),
    log: room.log.slice(0, 10),
    result: room.result,
    updatedAt: room.updatedAt,
  };
}

function cleanRooms() {
  const now = Date.now();
  for (const [id, room] of rooms) {
    if (now - room.updatedAt > ROOM_TTL) {
      rooms.delete(id);
    }
  }
}

function advanceRoom(room) {
  if (room.status !== "active") return;
  const now = Date.now();
  const ticks = Math.min(12, Math.floor((now - room.lastTick) / SERVER_TICK_MS));
  if (ticks <= 0) return;
  room.lastTick += ticks * SERVER_TICK_MS;
  room.round = Math.floor((now - room.startedAt) / 14500) + 1;
  Object.values(room.players).forEach((player) => {
    player.energy = clamp(player.energy + ticks * (room.arena.id === "pumpkin" ? 7 : 5), 0, 100);
    player.focus = clamp(player.focus + ticks * (room.arena.id === "greenhouse" ? 3 : 1.4), 0, 100);
  });
  if (now - room.lastEventAt > 10500) {
    room.lastEventAt = now;
    room.log.unshift("Online-Publikum raschelt im Salatblock.");
    room.log = room.log.slice(0, 10);
  }
  room.updatedAt = now;
}

function finishRoom(room, winnerId) {
  if (room.status === "ended" || room.result) return;
  const loserId = Object.keys(room.players).find((id) => id !== winnerId);
  const winner = room.players[winnerId];
  const loser = loserId ? room.players[loserId] : null;
  const winPoints = Math.round(room.pot + 24 + room.round * 3);
  const lossPoints = Math.max(9, Math.round(room.pot / 4));

  room.status = "ended";
  room.winnerId = winnerId;
  room.result = {
    winnerId,
    winnerName: winner.name,
    pointDeltas: {
      [winnerId]: winPoints,
      ...(loser ? { [loser.id]: lossPoints } : {}),
    },
    reports: {
      [winnerId]: [
        `Online-Sieg gegen ${loser?.name || "den Gegner"}: +${winPoints} Punkte.`,
        `${winner.stats.hits}/${winner.stats.swings} Treffer, ${winner.stats.damageDealt} Schaden, Combo x${winner.stats.maxCombo}.`,
        `${room.arena.name}: echter Spieler bezwungen, keine Bot-Ausrede im Beet.`,
      ],
      ...(loser
        ? {
            [loser.id]: [
              `Niederlage gegen ${winner.name}: +${lossPoints} Trostpunkte.`,
              `${loser.stats.hits}/${loser.stats.swings} Treffer, ${loser.stats.damageDealt} Schaden, beste Combo x${loser.stats.maxCombo}.`,
              `${room.arena.name}: Revanche liegt schon im Gartenhandschuh.`,
            ],
          }
        : {}),
    },
  };
  room.log.unshift(`${winner.name} gewinnt den Online-Gartenkampf.`);
  room.updatedAt = Date.now();
}

function applyAction(room, playerId, type) {
  advanceRoom(room);
  if (room.status !== "active") return;
  const player = room.players[playerId];
  const targetId = Object.keys(room.players).find((id) => id !== playerId);
  const target = targetId ? room.players[targetId] : null;
  if (!player || !target) return;

  const now = Date.now();
  const moves = {
    jab: { name: "Jab", cost: 10, min: 8, max: 13, accuracy: 0.92, focus: 8, cooldown: 380 },
    haymaker: { name: "Haymaker", cost: 28, min: 19, max: 30, accuracy: 0.7, focus: 15, cooldown: 780 },
    special: { name: "Root Rush", cost: 20, min: 34, max: 46, accuracy: 0.96, focus: 0, cooldown: 960 },
  };

  if (now < player.actionCooldownUntil) {
    room.updatedAt = now;
    return;
  }

  if (type === "block") {
    if (player.energy < 8) {
      room.log.unshift(`${player.name} hat zu wenig Energie fürs Blocken.`);
      player.actionCooldownUntil = now + 260;
      room.updatedAt = now;
      return;
    }
    player.energy -= 8;
    player.focus = clamp(player.focus + 7, 0, 100);
    player.combo = 0;
    player.guardUntil = now + 1250;
    player.actionCooldownUntil = now + 540;
    player.stats.blocks += 1;
    room.log.unshift(`${player.name} macht die Gartenmauer dicht.`);
    room.updatedAt = now;
    return;
  }

  if (type === "dodge") {
    if (player.energy < 15) {
      room.log.unshift(`${player.name} klebt kurz im Beet fest.`);
      player.actionCooldownUntil = now + 260;
      room.updatedAt = now;
      return;
    }
    player.energy -= 15;
    player.focus = clamp(player.focus + 5, 0, 100);
    player.combo = 0;
    player.dodgeUntil = now + 880;
    player.actionCooldownUntil = now + 660;
    player.stats.dodges += 1;
    room.log.unshift(`${player.name} slidet online am Seil vorbei.`);
    room.updatedAt = now;
    return;
  }

  const move = moves[type];
  if (!move) return;
  if (type === "special" && player.focus < 100) {
    room.log.unshift(`${player.name} will Root Rush, aber der Fokus fehlt.`);
    player.actionCooldownUntil = now + 260;
    room.updatedAt = now;
    return;
  }
  if (player.energy < move.cost) {
    room.log.unshift(`${player.name} braucht online kurz Luft.`);
    player.actionCooldownUntil = now + 260;
    room.updatedAt = now;
    return;
  }

  player.energy -= move.cost;
  player.actionCooldownUntil = now + move.cooldown;
  player.stats.swings += 1;
  player.combo = type === "haymaker" ? Math.max(0, player.combo - 1) : player.combo + 1;
  if (type === "special") {
    player.focus = 0;
    player.combo += 2;
    player.stats.specials += 1;
  } else {
    player.focus = clamp(player.focus + move.focus, 0, 100);
  }

  if (now < target.dodgeUntil || Math.random() > move.accuracy) {
    player.combo = 0;
    player.stats.misses += 1;
    room.log.unshift(`${target.name} lässt ${move.name} online ins Gras rauschen.`);
    room.updatedAt = now;
    return;
  }

  let damage = Math.floor(Math.random() * (move.max - move.min + 1)) + move.min + Math.min(player.combo * 2, 10);
  if (now < target.guardUntil) {
    damage = Math.max(2, Math.round(damage * 0.36));
    room.log.unshift(`${target.name} blockt viel weg.`);
  }

  target.hp = clamp(target.hp - damage, 0, 100);
  target.stats.damageTaken += damage;
  player.stats.hits += 1;
  player.stats.damageDealt += damage;
  player.stats.biggestHit = Math.max(player.stats.biggestHit, damage);
  player.stats.maxCombo = Math.max(player.stats.maxCombo, player.combo);
  room.log.unshift(`${player.name} trifft ${move.name}: -${damage} HP.`);
  room.updatedAt = now;

  if (target.hp <= 0) {
    finishRoom(room, playerId);
    return;
  }
}

async function handleApi(req, res, url) {
  cleanRooms();

  if (req.method === "GET" && url.pathname === "/api/health") {
    json(res, 200, { ok: true, mode: "online", rooms: rooms.size });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/online/rooms") {
    [...rooms.values()].forEach(advanceRoom);
    const roomList = [...rooms.values()]
      .filter((room) => room.status !== "ended")
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .map(publicRoom);
    json(res, 200, { rooms: roomList });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/online/rooms") {
    const body = await readBody(req);
    const playerId = cleanText(body.playerId, crypto.randomUUID(), 64);
    const profile = sanitizeProfile(body.profile);
    const arena = sanitizeArena(body.arena);
    const id = crypto.randomUUID().slice(0, 8);
    const room = {
      id,
      status: "waiting",
      arena,
      pot: Math.round(36 * arena.pointBonus + Math.min(profile.points / 28, 34)),
      round: 1,
      hostId: playerId,
      guestId: null,
      players: {
        [playerId]: makePlayer(playerId, profile, "host"),
      },
      log: [`${profile.name} wartet online im ${arena.name}.`],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      startedAt: null,
      lastTick: Date.now(),
      lastEventAt: Date.now(),
      result: null,
    };
    rooms.set(id, room);
    json(res, 201, { room: publicRoom(room), playerId, role: "host" });
    return;
  }

  const match = url.pathname.match(/^\/api\/online\/rooms\/([^/]+)(?:\/(join|action))?$/);
  if (!match) {
    json(res, 404, { error: "Not found" });
    return;
  }

  const room = rooms.get(match[1]);
  if (!room) {
    json(res, 404, { error: "Room not found" });
    return;
  }

  if (req.method === "GET" && !match[2]) {
    advanceRoom(room);
    json(res, 200, { room: publicRoom(room) });
    return;
  }

  if (req.method === "POST" && match[2] === "join") {
    const body = await readBody(req);
    const playerId = cleanText(body.playerId, crypto.randomUUID(), 64);
    const profile = sanitizeProfile(body.profile);
    if (room.hostId === playerId) {
      json(res, 200, { room: publicRoom(room), playerId, role: "host" });
      return;
    }
    if (room.status !== "waiting" || (room.guestId && room.guestId !== playerId)) {
      json(res, 409, { error: "Room is already busy" });
      return;
    }
    room.guestId = playerId;
    room.players[playerId] = makePlayer(playerId, profile, "guest");
    room.status = "active";
    room.startedAt = Date.now();
    room.lastTick = Date.now();
    room.lastEventAt = Date.now();
    room.log.unshift(`${profile.name} ist beigetreten. Online-Gong!`);
    room.updatedAt = Date.now();
    json(res, 200, { room: publicRoom(room), playerId, role: "guest" });
    return;
  }

  if (req.method === "POST" && match[2] === "action") {
    const body = await readBody(req);
    const playerId = cleanText(body.playerId, "", 64);
    if (!room.players[playerId]) {
      json(res, 403, { error: "Unknown player" });
      return;
    }
    applyAction(room, playerId, cleanText(body.type, "", 20));
    json(res, 200, { room: publicRoom(room) });
    return;
  }

  json(res, 405, { error: "Method not allowed" });
}

function serveStatic(req, res, url) {
  const pathname = decodeURIComponent(url.pathname);
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(PUBLIC_DIR, safePath));
  if (!filePath.startsWith(PUBLIC_DIR) || filePath === __filename) {
    json(res, 403, { error: "Forbidden" });
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      fs.readFile(path.join(PUBLIC_DIR, "index.html"), (fallbackError, fallbackData) => {
        if (fallbackError) {
          json(res, 404, { error: "Not found" });
          return;
        }
        res.writeHead(200, {
          "Content-Type": mimeTypes[".html"],
          "Cache-Control": "no-store",
        });
        res.end(fallbackData);
      });
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-store" : "public, max-age=60",
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (url.pathname.startsWith("/api/")) {
    handleApi(req, res, url).catch((error) => {
      json(res, 400, { error: error.message || "Bad request" });
    });
    return;
  }
  serveStatic(req, res, url);
});

server.listen(PORT, HOST, () => {
  console.log(`Carrot Game online server running on ${HOST}:${PORT}`);
});
