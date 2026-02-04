const storageKeys = {
  users: "beta_users",
  cards: "beta_cards",
  packs: "beta_packs",
  inventory: "beta_inventory",
  balances: "beta_balances",
  currentUser: "beta_current_user",
  decks: "beta_decks",
  characters: "beta_characters",
  selectedCharacter: "beta_selected_character",
  selectedDeck: "beta_selected_deck",
  adminPassword: "beta_admin_password",
};

const ui = {
  usernameInput: document.getElementById("username-input"),
  loginButton: document.getElementById("login-button"),
  logoutButton: document.getElementById("logout-button"),
  loginStatus: document.getElementById("login-status"),
  walletBalance: document.getElementById("wallet-balance"),
  addFunds: document.getElementById("add-funds"),
  openStore: document.getElementById("open-store"),
  openAdmin: document.getElementById("open-admin"),
  storeOverlay: document.getElementById("store-overlay"),
  closeStore: document.getElementById("close-store"),
  adminOverlay: document.getElementById("admin-overlay"),
  closeAdmin: document.getElementById("close-admin"),
  adminLogin: document.getElementById("admin-login"),
  adminPanel: document.getElementById("admin-panel"),
  adminPasswordInput: document.getElementById("admin-password"),
  adminLoginButton: document.getElementById("admin-login-button"),
  adminLoginStatus: document.getElementById("admin-login-status"),
  packsList: document.getElementById("packs-list"),
  inventoryList: document.getElementById("inventory-list"),
  filterType: document.getElementById("filter-type"),
  filterRarity: document.getElementById("filter-rarity"),
  filterClass: document.getElementById("filter-class"),
  clearFilters: document.getElementById("clear-filters"),
  characterName: document.getElementById("character-name"),
  createCharacter: document.getElementById("create-character"),
  characterList: document.getElementById("character-list"),
  deckName: document.getElementById("deck-name"),
  createDeck: document.getElementById("create-deck"),
  deckList: document.getElementById("deck-list"),
  deckTitle: document.getElementById("deck-title"),
  deckCount: document.getElementById("deck-count"),
  deckCards: document.getElementById("deck-cards"),
  deckStatus: document.getElementById("deck-status"),
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
  adminStatus: document.getElementById("admin-status"),
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
  characters: {},
  selectedCharacter: null,
  selectedDeck: null,
  adminPassword: "1234",
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
  state.balances = storage.load(storageKeys.balances, {});
  state.decks = storage.load(storageKeys.decks, {});
  state.characters = storage.load(storageKeys.characters, {});
  state.currentUser = localStorage.getItem(storageKeys.currentUser);
  state.selectedCharacter = storage.load(storageKeys.selectedCharacter, null);
  state.selectedDeck = storage.load(storageKeys.selectedDeck, null);
  state.adminPassword = storage.load(storageKeys.adminPassword, "1234");

  Object.keys(state.inventory).forEach((ownerId) => {
    state.inventory[ownerId] = state.inventory[ownerId].map((item) => ({
      id: item.id || crypto.randomUUID(),
      cardId: item.cardId,
      acquiredAt: item.acquiredAt || new Date().toISOString(),
    }));
  });
};

const saveState = () => {
  storage.save(storageKeys.users, state.users);
  storage.save(storageKeys.cards, state.cards);
  storage.save(storageKeys.packs, state.packs);
  storage.save(storageKeys.inventory, state.inventory);
  storage.save(storageKeys.balances, state.balances);
  storage.save(storageKeys.decks, state.decks);
  storage.save(storageKeys.characters, state.characters);
  storage.save(storageKeys.selectedCharacter, state.selectedCharacter);
  storage.save(storageKeys.selectedDeck, state.selectedDeck);
  storage.save(storageKeys.adminPassword, state.adminPassword);
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
  if (!state.characters[username]) {
    state.characters[username] = [];
  }
};

const getSelectedCharacter = () => {
  if (!state.currentUser || !state.selectedCharacter) {
    return null;
  }
  const characters = state.characters[state.currentUser] || [];
  return characters.find((character) => character.id === state.selectedCharacter) || null;
};

const getOwnerKey = () => {
  const character = getSelectedCharacter();
  return character ? character.id : null;
};

const updateWallet = () => {
  const ownerKey = getOwnerKey();
  if (!ownerKey) {
    ui.walletBalance.textContent = "Saldo: 0";
    return;
  }
  ui.walletBalance.textContent = `Saldo: ${state.balances[ownerKey] || 0}`;
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

const setStatus = (message) => {
  ui.loginStatus.textContent = message;
};

const renderCharacters = () => {
  ui.characterList.innerHTML = "";
  if (!state.currentUser) {
    ui.characterList.innerHTML = "<li class=\"status\">Faça login para criar personagens.</li>";
    return;
  }
  const characters = state.characters[state.currentUser] || [];
  if (!characters.length) {
    ui.characterList.innerHTML = "<li class=\"status\">Nenhum personagem criado.</li>";
    return;
  }
  characters.forEach((character) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = character.name;
    button.classList.toggle("active", character.id === state.selectedCharacter);
    button.addEventListener("click", () => {
      state.selectedCharacter = character.id;
      state.selectedDeck = null;
      saveState();
      refreshForCharacter();
    });
    item.appendChild(button);
    ui.characterList.appendChild(item);
  });
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

  const actions = document.createElement("div");
  actions.className = "inventory-actions";
  const decks = getDecksForCharacter();
  if (!decks.length) {
    const hint = document.createElement("span");
    hint.className = "status";
    hint.textContent = "Crie um deck para adicionar cartas.";
    actions.appendChild(hint);
  } else {
    decks.forEach((deck) => {
      const button = document.createElement("button");
      button.className = "secondary";
      button.textContent = `Adicionar ao ${deck.name}`;
      button.addEventListener("click", () => addToDeck(deck.id, inventoryId));
      actions.appendChild(button);
    });
  }

  container.append(title, meta, desc, chips, actions);
  return container;
};

const renderInventory = () => {
  ui.inventoryList.innerHTML = "";
  const ownerKey = getOwnerKey();
  if (!ownerKey) {
    ui.inventoryList.textContent = "Selecione um personagem para ver as cartas.";
    return;
  }
  const items = state.inventory[ownerKey] || [];
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

const login = () => {
  const username = ui.usernameInput.value.trim();
  if (!username) {
    setStatus("Digite um usuário válido.");
    return;
  }
  ensureUser(username);
  state.currentUser = username;
  const characters = state.characters[username] || [];
  if (!characters.find((character) => character.id === state.selectedCharacter)) {
    state.selectedCharacter = null;
  }
  ui.logoutButton.classList.remove("hidden");
  setStatus(`Logado como ${username}.`);
  saveState();
  renderCharacters();
  refreshForCharacter();
};

const logout = () => {
  state.currentUser = null;
  state.selectedCharacter = null;
  ui.logoutButton.classList.add("hidden");
  setStatus("Nenhum usuário autenticado.");
  saveState();
  renderCharacters();
  refreshForCharacter();
};

const createCharacter = () => {
  if (!state.currentUser) {
    setStatus("Faça login para criar personagens.");
    return;
  }
  const name = ui.characterName.value.trim();
  if (!name) {
    setStatus("Digite um nome para o personagem.");
    return;
  }
  const characters = state.characters[state.currentUser] || [];
  const character = {
    id: crypto.randomUUID(),
    name,
  };
  characters.push(character);
  state.characters[state.currentUser] = characters;
  state.selectedCharacter = character.id;
  state.selectedDeck = null;
  ui.characterName.value = "";
  const legacyKey = state.currentUser;
  state.balances[character.id] = state.balances[legacyKey] || 0;
  state.inventory[character.id] = state.inventory[legacyKey] || [];
  state.decks[character.id] = state.decks[legacyKey] || [];
  delete state.balances[legacyKey];
  delete state.inventory[legacyKey];
  delete state.decks[legacyKey];
  saveState();
  renderCharacters();
  refreshForCharacter();
};

const updateBalance = () => {
  const ownerKey = getOwnerKey();
  if (!ownerKey) {
    setStatus("Selecione um personagem para usar a carteira.");
    return;
  }
  state.balances[ownerKey] = (state.balances[ownerKey] || 0) + 100;
  saveState();
  updateWallet();
};

const openPack = (packId) => {
  const ownerKey = getOwnerKey();
  if (!ownerKey) {
    setStatus("Selecione um personagem para comprar packs.");
    return;
  }
  const pack = state.packs.find((entry) => entry.id === packId);
  if (!pack) {
    return;
  }
  if ((state.balances[ownerKey] || 0) < pack.price) {
    setStatus("Saldo insuficiente.");
    return;
  }
  state.balances[ownerKey] -= pack.price;
  const pulls = [];
  for (let i = 0; i < pack.slots; i += 1) {
    const rarity = rollRarity(pack.chances);
    const candidates = state.cards.filter((card) => card.rarity === rarity);
    const fallback = state.cards;
    const pool = candidates.length ? candidates : fallback;
    const card = pool[Math.floor(Math.random() * pool.length)];
    pulls.push(card);
    state.inventory[ownerKey].push({
      id: crypto.randomUUID(),
      cardId: card.id,
      acquiredAt: new Date().toISOString(),
    });
  }
  saveState();
  updateWallet();
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

const getDecksForCharacter = () => {
  const ownerKey = getOwnerKey();
  if (!ownerKey) {
    return [];
  }
  return state.decks[ownerKey] || [];
};

const getSelectedDeck = () => {
  const decks = getDecksForCharacter();
  return decks.find((deck) => deck.id === state.selectedDeck) || null;
};

const renderDecks = () => {
  ui.deckList.innerHTML = "";
  ui.deckCards.innerHTML = "";
  const ownerKey = getOwnerKey();
  if (!ownerKey) {
    ui.deckTitle.textContent = "Selecione um personagem";
    ui.deckCount.textContent = "0 cartas";
    ui.deckStatus.textContent = "";
    return;
  }
  const decks = getDecksForCharacter();
  if (!decks.length) {
    ui.deckTitle.textContent = "Crie seu primeiro deck";
    ui.deckCount.textContent = "0 cartas";
  }

  decks.forEach((deck) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = `${deck.name} (${deck.cardIds.length})`;
    button.classList.toggle("active", deck.id === state.selectedDeck);
    button.addEventListener("click", () => {
      state.selectedDeck = deck.id;
      saveState();
      renderDecks();
    });
    item.appendChild(button);
    ui.deckList.appendChild(item);
  });

  const selectedDeck = getSelectedDeck();
  if (!selectedDeck) {
    ui.deckTitle.textContent = "Selecione um deck";
    ui.deckCount.textContent = "0 cartas";
    ui.deckStatus.textContent = "";
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
    const item = (state.inventory[ownerKey] || []).find((entry) => entry.id === inventoryId);
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
    remove.addEventListener("click", () => removeFromDeck(selectedDeck.id, inventoryId));

    container.append(title, meta, desc, remove);
    ui.deckCards.appendChild(container);
  });
};

const addToDeck = (deckId, inventoryId) => {
  const ownerKey = getOwnerKey();
  if (!ownerKey) {
    return;
  }
  const decks = getDecksForCharacter();
  const deck = decks.find((entry) => entry.id === deckId);
  if (!deck) {
    return;
  }
  if (!deck.cardIds.includes(inventoryId)) {
    deck.cardIds.push(inventoryId);
    state.selectedDeck = deck.id;
    saveState();
    renderDecks();
  }
};

const removeFromDeck = (deckId, inventoryId) => {
  const decks = getDecksForCharacter();
  const deck = decks.find((entry) => entry.id === deckId);
  if (!deck) {
    return;
  }
  deck.cardIds = deck.cardIds.filter((id) => id !== inventoryId);
  saveState();
  renderDecks();
};

const createDeck = () => {
  const ownerKey = getOwnerKey();
  if (!ownerKey) {
    ui.deckStatus.textContent = "Selecione um personagem para criar deck.";
    return;
  }
  const name = ui.deckName.value.trim();
  if (!name) {
    ui.deckStatus.textContent = "Digite um nome para o deck.";
    return;
  }
  const decks = state.decks[ownerKey] || [];
  const deck = {
    id: crypto.randomUUID(),
    name,
    cardIds: [],
  };
  decks.push(deck);
  state.decks[ownerKey] = decks;
  state.selectedDeck = deck.id;
  ui.deckName.value = "";
  saveState();
  renderDecks();
  renderInventory();
  ui.deckStatus.textContent = `Deck ${name} criado.`;
};

const refreshForCharacter = () => {
  const ownerKey = getOwnerKey();
  const decks = ownerKey ? state.decks[ownerKey] || [] : [];
  if (!decks.find((deck) => deck.id === state.selectedDeck)) {
    state.selectedDeck = null;
  }
  updateWallet();
  renderInventory();
  renderDecks();
};

const clearFilters = () => {
  ui.filterType.value = "";
  ui.filterRarity.value = "";
  ui.filterClass.value = "";
  renderInventory();
};

const openOverlay = (overlay) => {
  overlay.classList.remove("hidden");
  overlay.hidden = false;
};

const closeOverlay = (overlay) => {
  overlay.classList.add("hidden");
  overlay.hidden = true;
};

const handleAdminLogin = () => {
  const password = ui.adminPasswordInput.value.trim();
  if (!password) {
    ui.adminLoginStatus.textContent = "Digite a senha do admin.";
    return;
  }
  if (password !== state.adminPassword) {
    ui.adminLoginStatus.textContent = "Senha incorreta.";
    return;
  }
  ui.adminLoginStatus.textContent = "";
  ui.adminLogin.classList.add("hidden");
  ui.adminPanel.classList.remove("hidden");
};

const init = () => {
  loadState();
  if (state.currentUser) {
    ui.usernameInput.value = state.currentUser;
    ui.logoutButton.classList.remove("hidden");
    setStatus(`Logado como ${state.currentUser}.`);
  }
  closeOverlay(ui.storeOverlay);
  closeOverlay(ui.adminOverlay);
  buildFilterOptions();
  renderCharacters();
  renderPacks();
  refreshForCharacter();
};

ui.loginButton.addEventListener("click", login);
ui.logoutButton.addEventListener("click", logout);
ui.createCharacter.addEventListener("click", createCharacter);
ui.addFunds.addEventListener("click", updateBalance);
ui.openStore.addEventListener("click", () => openOverlay(ui.storeOverlay));
ui.closeStore.addEventListener("click", () => closeOverlay(ui.storeOverlay));
ui.openAdmin.addEventListener("click", () => {
  if (!state.currentUser) {
    setStatus("Faça login para acessar o admin.");
    return;
  }
  ui.adminLoginStatus.textContent = "";
  ui.adminPasswordInput.value = "";
  ui.adminLogin.classList.remove("hidden");
  ui.adminPanel.classList.add("hidden");
  openOverlay(ui.adminOverlay);
});
ui.closeAdmin.addEventListener("click", () => closeOverlay(ui.adminOverlay));
ui.adminLoginButton.addEventListener("click", handleAdminLogin);
ui.addCard.addEventListener("click", addCard);
ui.addPack.addEventListener("click", addPack);
ui.createDeck.addEventListener("click", createDeck);
ui.filterType.addEventListener("change", renderInventory);
ui.filterRarity.addEventListener("change", renderInventory);
ui.filterClass.addEventListener("change", renderInventory);
ui.clearFilters.addEventListener("click", clearFilters);

init();
