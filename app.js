const storageKeys = {
  users: "beta_users",
  cards: "beta_cards",
  packs: "beta_packs",
  inventory: "beta_inventory",
  balances: "beta_balances",
  currentUser: "beta_current_user",
  decks: "beta_decks",
};

const ui = {
  usernameInput: document.getElementById("username-input"),
  loginButton: document.getElementById("login-button"),
  logoutButton: document.getElementById("logout-button"),
  loginStatus: document.getElementById("login-status"),
  walletBalance: document.getElementById("wallet-balance"),
  addFunds: document.getElementById("add-funds"),
  packsList: document.getElementById("packs-list"),
  inventoryList: document.getElementById("inventory-list"),
  adminCard: document.getElementById("admin-card"),
  adminStatus: document.getElementById("admin-status"),
  cardName: document.getElementById("card-name"),
  cardType: document.getElementById("card-type"),
  cardMove: document.getElementById("card-move"),
  cardMana: document.getElementById("card-mana"),
  cardClass: document.getElementById("card-class"),
  cardRarity: document.getElementById("card-rarity"),
  cardDescription: document.getElementById("card-description"),
  addCard: document.getElementById("add-card"),
  packName: document.getElementById("pack-name"),
  packPrice: document.getElementById("pack-price"),
  packSlots: document.getElementById("pack-slots"),
  chanceCommon: document.getElementById("chance-common"),
  chanceUncommon: document.getElementById("chance-uncommon"),
  chanceRare: document.getElementById("chance-rare"),
  chanceEpic: document.getElementById("chance-epic"),
  addPack: document.getElementById("add-pack"),
  filterType: document.getElementById("filter-type"),
  filterRarity: document.getElementById("filter-rarity"),
  filterClass: document.getElementById("filter-class"),
  clearFilters: document.getElementById("clear-filters"),
  deckName: document.getElementById("deck-name"),
  createDeck: document.getElementById("create-deck"),
  deckList: document.getElementById("deck-list"),
  deckTitle: document.getElementById("deck-title"),
  deckCount: document.getElementById("deck-count"),
  deckDropzone: document.getElementById("deck-dropzone"),
  deckCards: document.getElementById("deck-cards"),
  deckStatus: document.getElementById("deck-status"),
};

const defaultCards = [
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
];

const defaultPacks = [
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
];

const state = {
  currentUser: null,
  users: [],
  cards: [],
  packs: [],
  inventory: {},
  balances: {},
  decks: {},
  selectedDeckId: null,
};

const storage = {
  load(key, fallback) {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    try {
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  },
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

const formatCardTitle = (card) => `${card.name} • ${card.rarity}`;

const loadState = () => {
  state.users = storage.load(storageKeys.users, []);
  state.cards = storage.load(storageKeys.cards, defaultCards);
  state.packs = storage.load(storageKeys.packs, defaultPacks);
  state.inventory = storage.load(storageKeys.inventory, {});
  Object.keys(state.inventory).forEach((username) => {
    state.inventory[username] = state.inventory[username].map((item) => ({
      id: item.id || crypto.randomUUID(),
      cardId: item.cardId,
      acquiredAt: item.acquiredAt || new Date().toISOString(),
    }));
  });
  state.balances = storage.load(storageKeys.balances, {});
  state.decks = storage.load(storageKeys.decks, {});
  state.currentUser = localStorage.getItem(storageKeys.currentUser);
};

const saveState = () => {
  storage.save(storageKeys.users, state.users);
  storage.save(storageKeys.cards, state.cards);
  storage.save(storageKeys.packs, state.packs);
  storage.save(storageKeys.inventory, state.inventory);
  storage.save(storageKeys.balances, state.balances);
  storage.save(storageKeys.decks, state.decks);
  if (state.currentUser) {
    localStorage.setItem(storageKeys.currentUser, state.currentUser);
  } else {
    localStorage.removeItem(storageKeys.currentUser);
  }
};

const ensureUser = (username) => {
  if (!state.users.includes(username)) {
    state.users.push(username);
  }
  if (!state.balances[username]) {
    state.balances[username] = 0;
  }
  if (!state.inventory[username]) {
    state.inventory[username] = [];
  }
  if (!state.decks[username]) {
    state.decks[username] = [];
  }
};

const setStatus = (message) => {
  ui.loginStatus.textContent = message;
};

const updateWallet = () => {
  if (!state.currentUser) {
    ui.walletBalance.textContent = "Saldo: 0";
    return;
  }
  ui.walletBalance.textContent = `Saldo: ${state.balances[state.currentUser]}`;
};

const buildFilterOptions = () => {
  const types = new Set();
  const rarities = new Set();
  const classes = new Set();
  state.cards.forEach((card) => {
    types.add(card.type);
    rarities.add(card.rarity);
    classes.add(card.class);
  });

  const updateSelect = (select, values, label) => {
    const current = select.value;
    select.innerHTML = `<option value="">${label}</option>`;
    [...values]
      .sort((a, b) => a.localeCompare(b))
      .forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
      });
    select.value = current;
  };

  updateSelect(ui.filterType, types, "Tipo (todos)");
  updateSelect(ui.filterRarity, rarities, "Raridade (todas)");
  updateSelect(ui.filterClass, classes, "Classe (todas)");
};

const passesFilters = (card) => {
  const typeFilter = ui.filterType.value;
  const rarityFilter = ui.filterRarity.value;
  const classFilter = ui.filterClass.value;
  if (typeFilter && card.type !== typeFilter) {
    return false;
  }
  if (rarityFilter && card.rarity !== rarityFilter) {
    return false;
  }
  if (classFilter && card.class !== classFilter) {
    return false;
  }
  return true;
};

const renderPacks = () => {
  ui.packsList.innerHTML = "";
  if (!state.packs.length) {
    ui.packsList.textContent = "Nenhum pack cadastrado.";
    return;
  }
  state.packs.forEach((pack) => {
    const container = document.createElement("div");
    container.className = "pack";
    const title = document.createElement("h4");
    title.textContent = pack.name;
    const price = document.createElement("p");
    price.textContent = `Preço: ${pack.price} moedas`;
    const slots = document.createElement("p");
    slots.textContent = `Cartas por pack: ${pack.slots}`;
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = `Common ${pack.chances.Common || 0}% • Uncommon ${pack.chances.Uncommon || 0}%`;
    const openButton = document.createElement("button");
    openButton.textContent = "Comprar e abrir";
    openButton.addEventListener("click", () => openPack(pack.id));

    container.append(title, price, slots, badge, openButton);
    ui.packsList.appendChild(container);
  });
};

const createInventoryCard = (card, inventoryId) => {
  const container = document.createElement("div");
  container.className = "inventory-card";
  container.draggable = true;
  container.dataset.inventoryId = inventoryId;
  container.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", inventoryId);
  });

  const title = document.createElement("h4");
  title.textContent = formatCardTitle(card);
  const meta = document.createElement("p");
  meta.className = "tiny";
  meta.textContent = `${card.type} • MOV ${card.move} • Mana ${card.mana} • ${card.class}`;
  const desc = document.createElement("p");
  desc.textContent = card.description;
  const chips = document.createElement("div");
  chips.className = "chip-row";
  [card.type, card.rarity, card.class].forEach((label) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = label;
    chips.appendChild(chip);
  });

  container.append(title, meta, desc, chips);
  return container;
};

const renderInventory = () => {
  ui.inventoryList.innerHTML = "";
  if (!state.currentUser) {
    ui.inventoryList.textContent = "Faça login para ver o inventário.";
    return;
  }
  const items = state.inventory[state.currentUser] || [];
  if (!items.length) {
    ui.inventoryList.textContent = "Nenhuma carta ainda.";
    return;
  }
  const visibleItems = items.filter((item) => {
    const card = state.cards.find((entry) => entry.id === item.cardId);
    return card && passesFilters(card);
  });

  if (!visibleItems.length) {
    ui.inventoryList.textContent = "Nenhuma carta corresponde ao filtro.";
    return;
  }

  visibleItems.forEach((item) => {
    const card = state.cards.find((entry) => entry.id === item.cardId);
    if (!card) {
      return;
    }
    ui.inventoryList.appendChild(createInventoryCard(card, item.id));
  });
};

const updateAdminVisibility = () => {
  ui.adminCard.classList.toggle("hidden", state.currentUser !== "admin");
};

const login = () => {
  const username = ui.usernameInput.value.trim();
  if (!username) {
    setStatus("Digite um usuário válido.");
    return;
  }
  ensureUser(username);
  state.currentUser = username;
  ui.logoutButton.classList.remove("hidden");
  setStatus(`Logado como ${username}.`);
  saveState();
  updateWallet();
  renderInventory();
  renderDecks();
  updateAdminVisibility();
};

const logout = () => {
  state.currentUser = null;
  state.selectedDeckId = null;
  ui.logoutButton.classList.add("hidden");
  setStatus("Nenhum usuário autenticado.");
  saveState();
  updateWallet();
  renderInventory();
  renderDecks();
  updateAdminVisibility();
};

const addFunds = () => {
  if (!state.currentUser) {
    setStatus("Faça login para adicionar moedas.");
    return;
  }
  state.balances[state.currentUser] += 100;
  saveState();
  updateWallet();
};

const openPack = (packId) => {
  if (!state.currentUser) {
    setStatus("Faça login para abrir packs.");
    return;
  }
  const pack = state.packs.find((entry) => entry.id === packId);
  if (!pack) {
    return;
  }
  if (state.balances[state.currentUser] < pack.price) {
    setStatus("Saldo insuficiente.");
    return;
  }
  state.balances[state.currentUser] -= pack.price;
  const pulls = [];
  for (let i = 0; i < pack.slots; i += 1) {
    const rarity = rollRarity(pack.chances);
    const candidates = state.cards.filter((card) => card.rarity === rarity);
    const fallback = state.cards;
    const pool = candidates.length ? candidates : fallback;
    const card = pool[Math.floor(Math.random() * pool.length)];
    pulls.push(card);
    state.inventory[state.currentUser].push({
      id: crypto.randomUUID(),
      cardId: card.id,
      acquiredAt: new Date().toISOString(),
    });
  }
  saveState();
  updateWallet();
  buildFilterOptions();
  renderInventory();
  setStatus(`Você abriu ${pack.name} e recebeu ${pulls.map(formatCardTitle).join(", ")}.`);
};

const rollRarity = (chances) => {
  const entries = Object.entries(chances);
  const total = entries.reduce((sum, [, value]) => sum + Number(value || 0), 0);
  const roll = Math.random() * (total || 100);
  let cumulative = 0;
  for (const [rarity, value] of entries) {
    cumulative += Number(value || 0);
    if (roll <= cumulative) {
      return rarity;
    }
  }
  return "Common";
};

const addCard = () => {
  const name = ui.cardName.value.trim();
  const type = ui.cardType.value.trim();
  const move = Number(ui.cardMove.value || 0);
  const mana = Number(ui.cardMana.value || 0);
  const cardClass = ui.cardClass.value.trim();
  const rarity = ui.cardRarity.value;
  const description = ui.cardDescription.value.trim();

  if (!name || !type || !cardClass || !description) {
    ui.adminStatus.textContent = "Preencha todos os campos da carta.";
    return;
  }

  const id = state.cards.length ? Math.max(...state.cards.map((card) => card.id)) + 1 : 1;
  state.cards.push({
    id,
    name,
    type,
    move,
    mana,
    rarity,
    class: cardClass,
    description,
  });
  saveState();
  buildFilterOptions();
  ui.adminStatus.textContent = `Carta ${name} salva.`;
  ui.cardName.value = "";
  ui.cardType.value = "";
  ui.cardMove.value = "";
  ui.cardMana.value = "";
  ui.cardClass.value = "";
  ui.cardDescription.value = "";
};

const addPack = () => {
  const name = ui.packName.value.trim();
  const price = Number(ui.packPrice.value || 0);
  const slots = Number(ui.packSlots.value || 1);
  const chances = {
    Common: Number(ui.chanceCommon.value || 0),
    Uncommon: Number(ui.chanceUncommon.value || 0),
    Rare: Number(ui.chanceRare.value || 0),
    Epic: Number(ui.chanceEpic.value || 0),
  };

  if (!name || price <= 0 || slots <= 0) {
    ui.adminStatus.textContent = "Preencha nome, preço e slots corretamente.";
    return;
  }

  const id = state.packs.length ? Math.max(...state.packs.map((pack) => pack.id)) + 1 : 1;
  state.packs.push({ id, name, price, slots, chances });
  saveState();
  renderPacks();
  ui.adminStatus.textContent = `Pack ${name} salvo.`;
  ui.packName.value = "";
  ui.packPrice.value = "";
  ui.packSlots.value = "3";
};

const createDeck = () => {
  if (!state.currentUser) {
    ui.deckStatus.textContent = "Faça login para criar um deck.";
    return;
  }
  const name = ui.deckName.value.trim();
  if (!name) {
    ui.deckStatus.textContent = "Digite um nome para o deck.";
    return;
  }
  const decks = state.decks[state.currentUser] || [];
  const deck = {
    id: crypto.randomUUID(),
    name,
    cardIds: [],
  };
  decks.push(deck);
  state.decks[state.currentUser] = decks;
  state.selectedDeckId = deck.id;
  ui.deckName.value = "";
  saveState();
  renderDecks();
  ui.deckStatus.textContent = `Deck ${name} criado.`;
};

const getSelectedDeck = () => {
  const decks = state.decks[state.currentUser] || [];
  return decks.find((deck) => deck.id === state.selectedDeckId) || null;
};

const renderDecks = () => {
  ui.deckList.innerHTML = "";
  ui.deckCards.innerHTML = "";
  ui.deckDropzone.classList.remove("hidden");
  if (!state.currentUser) {
    ui.deckTitle.textContent = "Faça login para criar decks";
    ui.deckCount.textContent = "0 cartas";
    ui.deckDropzone.classList.add("hidden");
    return;
  }
  const decks = state.decks[state.currentUser] || [];
  if (!decks.length) {
    ui.deckTitle.textContent = "Crie seu primeiro deck";
    ui.deckCount.textContent = "0 cartas";
  }

  decks.forEach((deck) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = `${deck.name} (${deck.cardIds.length})`;
    button.classList.toggle("active", deck.id === state.selectedDeckId);
    button.addEventListener("click", () => {
      state.selectedDeckId = deck.id;
      renderDecks();
    });
    item.appendChild(button);
    ui.deckList.appendChild(item);
  });

  const selectedDeck = getSelectedDeck();
  if (!selectedDeck) {
    ui.deckTitle.textContent = "Selecione um deck";
    ui.deckCount.textContent = "0 cartas";
    return;
  }
  ui.deckTitle.textContent = selectedDeck.name;
  ui.deckCount.textContent = `${selectedDeck.cardIds.length} cartas`;

  if (selectedDeck.cardIds.length < 20) {
    ui.deckStatus.textContent = `Deck precisa de mais ${20 - selectedDeck.cardIds.length} cartas para o mínimo.`;
  } else {
    ui.deckStatus.textContent = "Deck pronto para uso.";
  }

  selectedDeck.cardIds.forEach((inventoryId) => {
    const item = (state.inventory[state.currentUser] || []).find((entry) => entry.id === inventoryId);
    if (!item) {
      return;
    }
    const card = state.cards.find((entry) => entry.id === item.cardId);
    if (!card) {
      return;
    }
    const container = document.createElement("div");
    container.className = "deck-card";
    const title = document.createElement("h4");
    title.textContent = formatCardTitle(card);
    const meta = document.createElement("p");
    meta.className = "tiny";
    meta.textContent = `${card.type} • MOV ${card.move} • Mana ${card.mana} • ${card.class}`;
    const desc = document.createElement("p");
    desc.textContent = card.description;
    const remove = document.createElement("button");
    remove.className = "secondary";
    remove.textContent = "Remover do deck";
    remove.addEventListener("click", () => removeFromDeck(inventoryId));

    container.append(title, meta, desc, remove);
    ui.deckCards.appendChild(container);
  });
};

const addToDeck = (inventoryId) => {
  if (!state.currentUser) {
    return;
  }
  const selectedDeck = getSelectedDeck();
  if (!selectedDeck) {
    ui.deckStatus.textContent = "Selecione um deck antes de adicionar cartas.";
    return;
  }
  if (!selectedDeck.cardIds.includes(inventoryId)) {
    selectedDeck.cardIds.push(inventoryId);
    saveState();
    renderDecks();
  }
};

const removeFromDeck = (inventoryId) => {
  const selectedDeck = getSelectedDeck();
  if (!selectedDeck) {
    return;
  }
  selectedDeck.cardIds = selectedDeck.cardIds.filter((id) => id !== inventoryId);
  saveState();
  renderDecks();
};

const initDragAndDrop = () => {
  ui.deckDropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
    ui.deckDropzone.classList.add("dragover");
  });
  ui.deckDropzone.addEventListener("dragleave", () => {
    ui.deckDropzone.classList.remove("dragover");
  });
  ui.deckDropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    ui.deckDropzone.classList.remove("dragover");
    const inventoryId = event.dataTransfer.getData("text/plain");
    if (inventoryId) {
      addToDeck(inventoryId);
    }
  });
};

const clearFilters = () => {
  ui.filterType.value = "";
  ui.filterRarity.value = "";
  ui.filterClass.value = "";
  renderInventory();
};

const init = () => {
  loadState();
  if (state.currentUser) {
    ui.usernameInput.value = state.currentUser;
    ui.logoutButton.classList.remove("hidden");
    setStatus(`Logado como ${state.currentUser}.`);
  }
  buildFilterOptions();
  updateWallet();
  renderPacks();
  renderInventory();
  renderDecks();
  updateAdminVisibility();
  initDragAndDrop();
};

ui.loginButton.addEventListener("click", login);
ui.logoutButton.addEventListener("click", logout);
ui.addFunds.addEventListener("click", addFunds);
ui.addCard.addEventListener("click", addCard);
ui.addPack.addEventListener("click", addPack);
ui.createDeck.addEventListener("click", createDeck);
ui.filterType.addEventListener("change", renderInventory);
ui.filterRarity.addEventListener("change", renderInventory);
ui.filterClass.addEventListener("change", renderInventory);
ui.clearFilters.addEventListener("click", clearFilters);

init();
