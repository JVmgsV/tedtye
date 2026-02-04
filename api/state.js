const fs = require("fs");
const path = require("path");
const { kv } = require("@vercel/kv");

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "db.json");
const kvKey = "beta_cartas_state";

const defaultState = {
  users: [],
  cards: [
    {
      id: 1,
      name: "Bullseye",
      type: "Token",
      move: 1,
      mana: 10,
      rarity: "Uncommon",
      class: "Arqueiro",
      description:
        "Um desenho de um alvo em uma folha de papel, aparece aleatoriamente em qualquer pessoa. Quem estiver com esse alvo tem sua esquiva reduzida para 0,9.",
    },
    {
      id: 2,
      name: "Brisa Curativa",
      type: "Magia",
      move: 0,
      mana: 6,
      rarity: "Common",
      class: "Suporte",
      description: "Uma brisa suave recupera 3 pontos de vida do aliado escolhido.",
    },
    {
      id: 3,
      name: "Lâmina Relâmpago",
      type: "Ataque",
      move: 2,
      mana: 12,
      rarity: "Rare",
      class: "Espadachim",
      description: "Ataque rápido que causa dano extra se o alvo estiver marcado.",
    },
  ],
  packs: [
    {
      id: 1,
      name: "Pack de Início",
      price: 50,
      slots: 3,
      chances: {
        Common: 70,
        Uncommon: 25,
        Rare: 5,
        Epic: 0,
      },
    },
  ],
  inventory: {},
  balances: {},
  decks: {},
  characters: {},
  currentUser: null,
  selectedCharacter: null,
  selectedDeck: null,
  adminPassword: "1234",
};

const hasKV =
  process.env.KV_REST_API_URL &&
  process.env.KV_REST_API_TOKEN &&
  process.env.KV_REST_API_READ_ONLY_TOKEN;

const ensureDataFile = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(defaultState, null, 2));
  }
};

const readStateFromFile = () => {
  ensureDataFile();
  const raw = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(raw);
};

const writeStateToFile = (payload) => {
  ensureDataFile();
  fs.writeFileSync(dataFile, JSON.stringify(payload, null, 2));
};

const readState = async () => {
  if (hasKV) {
    const stored = await kv.get(kvKey);
    return stored || defaultState;
  }
  return readStateFromFile();
};

const writeState = async (payload) => {
  if (hasKV) {
    await kv.set(kvKey, payload);
    return;
  }
  writeStateToFile(payload);
};

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const state = await readState();
    res.status(200).json(state);
    return;
  }

  if (req.method === "POST") {
    const payload = req.body;
    if (!payload || typeof payload !== "object") {
      res.status(400).json({ error: "Payload inválido" });
      return;
    }
    await writeState(payload);
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "Método não permitido" });
};
