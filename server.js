const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;
const dataDir = path.join(__dirname, "data");
const dataFile = path.join(dataDir, "db.json");

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

const ensureDataFile = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(defaultState, null, 2));
  }
};

const readState = () => {
  ensureDataFile();
  const raw = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(raw);
};

const writeState = (payload) => {
  ensureDataFile();
  fs.writeFileSync(dataFile, JSON.stringify(payload, null, 2));
};

app.use(express.json({ limit: "2mb" }));
app.use(express.static(__dirname));

app.get("/api/state", (req, res) => {
  const state = readState();
  res.json(state);
});

app.post("/api/state", (req, res) => {
  const payload = req.body;
  if (!payload || typeof payload !== "object") {
    res.status(400).json({ error: "Payload inválido" });
    return;
  }
  writeState(payload);
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
