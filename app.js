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
  filterText: document.getElementById("filter-text"),
  sortInventory: document.getElementById("sort-inventory"),
  clearFilters: document.getElementById("clear-filters"),
  deckFilterType: document.getElementById("deck-filter-type"),
  deckFilterRarity: document.getElementById("deck-filter-rarity"),
  deckFilterClass: document.getElementById("deck-filter-class"),
  deckFilterText: document.getElementById("deck-filter-text"),
  deckSort: document.getElementById("deck-sort"),
  deckClearFilters: document.getElementById("deck-clear-filters"),
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
  chanceLegendary: document.getElementById("chance-legendary"),
  chanceSuperRare: document.getElementById("chance-super-rare"),
  chanceSecretRare: document.getElementById("chance-secret-rare"),
  addPack: document.getElementById("add-pack"),
  adminStatus: document.getElementById("admin-status"),
  cardModal: document.getElementById("card-modal"),
  closeCardModal: document.getElementById("close-card-modal"),
  cardModalBody: document.getElementById("card-modal-body"),
  packModal: document.getElementById("pack-modal"),
  closePackModal: document.getElementById("close-pack-modal"),
  packRollResult: document.getElementById("pack-roll-result"),
  packRollStatus: document.getElementById("pack-roll-status"),
  packRollRarities: document.getElementById("pack-roll-rarities"),
  packResultCards: document.getElementById("pack-result-cards"),
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
  {
    id: 4,
    name: "Pointy Kunai",
    type: "Arma",
    move: 0,
    mana: 0,
    rarity: "Uncommon",
    class: "Ninja",
    description: "Sua ponta afiada fere inimigos em curta distância. +3 aFor.",
  },
  {
    id: 5,
    name: "Ninja Tabis",
    type: "Passiva",
    move: 0,
    mana: 0,
    rarity: "Uncommon",
    class: "Acessorio",
    description:
      "Botas clássicas que trocam o visual de seus sapatos. Enquanto estiver se movimentando, se for atacado ganha +5 de Arm e Def.",
  },
  {
    id: 6,
    name: "3 Count Bout",
    type: "Ninjutsu",
    move: 0,
    mana: 0,
    rarity: "Ultra Rare",
    class: "Pon",
    description:
      "Se o inimigo usar uma skill que gasta 3 ações você pode ganhar 1 das ações dele.",
  },
  {
    id: 7,
    name: "Light Tracker",
    type: "Skill",
    move: 0,
    mana: 1,
    rarity: "Common",
    class: "Ninja",
    description: "Marca pegadas com uma luz brilhante.",
  },
  {
    id: 8,
    name: "Eye of Karado",
    type: "Skill",
    move: 0,
    mana: 1,
    rarity: "Common",
    class: "Ninja",
    description:
      "Você pode ver o Archelus do inimigo. Gaste 10 de Mp para tornar público para todos em sua party.",
  },
  {
    id: 9,
    name: "Sharp and Swift Combo",
    type: "Skill",
    move: 1,
    mana: 5,
    rarity: "Common",
    class: "Ninja",
    description:
      "Você ataca o inimigo com um combo de 3 ataques bem rápidos. Vel + 1D4, Vel + 1D8, Força + 1D12.",
  },
  {
    id: 10,
    name: "Sounds of the Rain",
    type: "Passiva",
    move: 0,
    mana: 0,
    rarity: "Common",
    class: "Ninja",
    description:
      "Se chover no campo você ganha um aumento de velocidade de +1 para cada nível.",
  },
  {
    id: 11,
    name: "We do the Trade then",
    type: "Skill Defesa",
    move: 2,
    mana: 5,
    rarity: "Uncommon",
    class: "Ninja",
    description:
      "Troca a sua arma com a do inimigo por 1 turno quando você for atacado.",
  },
  {
    id: 12,
    name: "Transversal Slash",
    type: "Skill",
    move: 0,
    mana: 8,
    rarity: "Rare",
    class: "Ninja",
    description:
      "Se você estiver no ar você dá um giro de 360 graus com o seu corpo virando para a terra e dando um corte no inimigo almejado. Use 1 contador para o segundo corte.",
  },
  {
    id: 13,
    name: "Ninja Essentials",
    type: "Acessorio",
    move: 1,
    mana: 0,
    rarity: "Rare",
    class: "Ninja",
    description:
      "Você ganha os essenciais de um ninja. Inclui Smoke Bomb, Throwing Kunai e Iron Dagger.",
  },
  {
    id: 14,
    name: "Smoke Bomb",
    type: "Skill",
    move: 0,
    mana: 0,
    rarity: "Common",
    class: "Ninja",
    description: "Cria uma fumaça que faz um turno passar mais rápido.",
  },
  {
    id: 15,
    name: "Throwing Kunai",
    type: "Skill",
    move: 1,
    mana: 0,
    rarity: "Common",
    class: "Ninja",
    description:
      "Joga uma Kunai básica. Teste de Percepção entre 4 e 13. Dano PDF + Des + 1D10.",
  },
  {
    id: 16,
    name: "Ninja Robe",
    type: "Ninjutsu",
    move: 0,
    mana: 0,
    rarity: "Rare",
    class: "Richi",
    description:
      "Se o inimigo chamar uma arma ou equipamento do deck você pode chamar esta Ninja Robe por 3 Ninjutsu. Permanente enquanto Richi.",
  },
  {
    id: 17,
    name: "Ninja Robe (Armor)",
    type: "Armor",
    move: 0,
    mana: 0,
    rarity: "Rare",
    class: "Ninja",
    description:
      "Toma os atributos da armadura ou da arma como resistência ou armadura. +5 Velocidade e +3 Armadura.",
  },
  {
    id: 18,
    name: "Ninjerf +3",
    type: "Arma",
    move: 0,
    mana: 0,
    rarity: "Common",
    class: "Ninja",
    description:
      "Cuidados devem ser tomados antes de usar o produto. Contém partes pequenas que podem ser ingeridas. +1 aFor e +1 aVel.",
  },
  {
    id: 19,
    name: "Caffeine Pills",
    type: "Item",
    move: 0,
    mana: 0,
    rarity: "Common",
    class: "Uso 1",
    description:
      "Você não precisa dormir por 14 horas e fica com o dobro da velocidade.",
  },
  {
    id: 20,
    name: "Illusionist Cape",
    type: "Armor",
    move: 0,
    mana: 0,
    rarity: "Uncommon",
    class: "Ninja",
    description:
      "Cria uma ilusão que fica parada no seu lugar caso você fique invisível com um ninjutsu. +2 Armadura e +2 Resistência.",
  },
  {
    id: 21,
    name: "Star Kick",
    type: "Ron",
    move: 0,
    mana: 0,
    rarity: "Rare",
    class: "Ext",
    description:
      "Quando um aliado der um golpe com as mãos você pode dar um chute que estende o combo. Vel + Des + 2D10.",
  },
  {
    id: 22,
    name: "Red Tattoo Pack",
    type: "Passiva",
    move: 0,
    mana: 0,
    rarity: "Rare",
    class: "Ninja",
    description:
      "Você marca outros ninjas com uma tatuagem vermelha e para cada ninja com tatuagem vermelha você ganha +2 de Velocidade.",
  },
  {
    id: 23,
    name: "Confirmation Slash",
    type: "Ron",
    move: 0,
    mana: 0,
    rarity: "Common",
    class: "Ninjutsu",
    description:
      "Se o inimigo estiver marcado de algum jeito por você, corre e passa como um raio de luz pelo inimigo cortando ele e removendo o rastreamento colocado.",
  },
  {
    id: 24,
    name: "Astec Day Trap",
    type: "Ninjutsu",
    move: 0,
    mana: 0,
    rarity: "Common",
    class: "Richi",
    description:
      "Por 1 contador, se o inimigo alvo ficar sem ações você acerta um dardo de veneno na perna dele causando dano médio.",
  },
  {
    id: 25,
    name: "Death Bed Grip",
    type: "Skill Defesa",
    move: 1,
    mana: 12,
    rarity: "Rare",
    class: "Ninja",
    description:
      "Se o inimigo te atacar corpo a corpo faça um teste de Velocidade contra o teste de ataque dele. Se ele perder você quebra o ataque dele com um mata leão.",
  },
  {
    id: 26,
    name: "Intruder Trap",
    type: "Richi",
    move: 0,
    mana: 0,
    rarity: "Uncommon",
    class: "Ninja",
    description:
      "Marque um aliado e na frente dele será criada uma armadilha mágica de corda invisível que qualquer pessoa que não seja você ou ele que pisar será levada para cima.",
  },
  {
    id: 27,
    name: "Rope-ken",
    type: "Skill",
    move: 2,
    mana: 8,
    rarity: "Common",
    class: "Ron",
    description:
      "Uma shuriken com um fio de nylon quase invisível que você pode puxar de volta.",
  },
  {
    id: 28,
    name: "Chinese Gun Trap",
    type: "Ninjutsu",
    move: 2,
    mana: 0,
    rarity: "Common",
    class: "Pon",
    description:
      "Por 1 contador quando o inimigo for atacar um aliado corpo a corpo você pode atirar com esta arma de dedo chinesa que atira feijões.",
  },
  {
    id: 29,
    name: "Repetition Key",
    type: "Skill",
    move: 0,
    mana: 8,
    rarity: "Rare",
    class: "Ninja",
    description:
      "Você dá um chute lua cheia no inimigo. Se ainda tiver ação você ganha esta carta de volta em sua mão com menos 1 de mana.",
  },
  {
    id: 30,
    name: "Needle-bouquet",
    type: "Skill",
    move: 0,
    mana: 0,
    rarity: "Uncommon",
    class: "Ron",
    description:
      "Joga um buquê de alfinetes para o céu e acerta uma pessoa no campo.",
  },
  {
    id: 31,
    name: "Nilon-Filled",
    type: "Passiva",
    move: 0,
    mana: 0,
    rarity: "Secret Rare",
    class: "Ninja",
    description:
      "Toda vez que jogar uma kunai ou shuriken jogue 1D6 escolhendo par ou ímpar.",
  },
  {
    id: 32,
    name: "Zipper Nilon",
    type: "Skill",
    move: 0,
    mana: 10,
    rarity: "Uncommon",
    class: "Ron",
    description:
      "Traz de volta a adaga ligada a este zipper de nylon cortando o inimigo novamente caso tenha acertado antes.",
  },
  {
    id: 33,
    name: "Punch Line",
    type: "Richi",
    move: 0,
    mana: 35,
    rarity: "Super Rare",
    class: "Ninja",
    description:
      "Este Richi dura 3 turnos. Toda vez que alguém passar pela armadilha você faz um teste de Percepção.",
  },
  {
    id: 34,
    name: "Maian Night Trap",
    type: "Ninjutsu",
    move: 0,
    mana: 0,
    rarity: "Common",
    class: "Richi",
    description:
      "Por 1 contador, se o inimigo alvo ficar parado você acerta a perna dele com um dardo de veneno.",
  },
  {
    id: 35,
    name: "Frappatino Pills",
    type: "Item",
    move: 0,
    mana: 0,
    rarity: "Uncommon",
    class: "Uso 1",
    description:
      "Pode parar sangramentos. Role 1D6 escolhendo par ou ímpar. Aumenta o tempo de reação do consumidor.",
  },
  {
    id: 36,
    name: "How About a Trick",
    type: "Richi",
    move: 0,
    mana: 0,
    rarity: "Rare",
    class: "Ninjutsu",
    description:
      "Este é um Richi infinito. Jogue 1D X sendo X o tamanho do deck do inimigo.",
  },
  {
    id: 37,
    name: "Blue Cyclops Dagger",
    type: "Arma",
    move: 0,
    mana: 0,
    rarity: "Uncommon",
    class: "Ron",
    description:
      "Pode usar durabilidade para quebrar uma passiva do inimigo. Quando equipada você vê os Archelus de um inimigo aleatório.",
  },
  {
    id: 38,
    name: "Iron Dagger",
    type: "Arma",
    move: 1,
    mana: 0,
    rarity: "Common",
    class: "Ninja",
    description: "Isso dói com certeza. +2 aFor.",
  },
  {
    id: 39,
    name: "Fuma Giant Star",
    type: "Arma",
    move: 0,
    mana: 0,
    rarity: "Legendary",
    class: "Ninja",
    description:
      "Se você marcou o inimigo de alguma forma o ataque desta shuriken dará um crítico em forma de explosão após o golpe.",
  },
  {
    id: 40,
    name: "Ninkro",
    type: "Acessorio",
    move: 0,
    mana: 0,
    rarity: "Legendary",
    class: "Ninja",
    description:
      "Você pode gastar 3 Ninjutsus e ficar invisível. Toda vez que se mover o nível de invisibilidade cai.",
  },
  {
    id: 41,
    name: "Mornin Rice Season",
    type: "Skill",
    move: 0,
    mana: 10,
    rarity: "Ultra Rare",
    class: "Ninja",
    description:
      "Teste de Des maior que 10. Você joga sua arma para suas costas, segura no fio e desce a Kisarigama na cabeça do inimigo.",
  },
];

const ninjaRollTable = [
  { rarities: ["Common", "Common", "Uncommon", "Rare", "Rare", "Super Rare"] },
  { rarities: ["Ultra Rare", "Common", "Common", "Rare", "Uncommon", "Common"] },
  { rarities: ["Uncommon", "Common", "Common", "Rare", "Uncommon"] },
  { rarities: ["Ultra Rare", "Common", "Common", "Rare", "Rare", "Uncommon"], foil: true },
  { rarities: ["Uncommon", "Uncommon", "Common", "Uncommon", "Super Rare"] },
  { rarities: ["Common", "Common", "Super Rare", "Uncommon", "Rare"] },
  { rarities: ["Legendary", "Common", "Common", "Rare", "Common", "Uncommon"], foil: true },
  { rarities: ["Uncommon", "Common", "Common", "Rare", "Uncommon"] },
  { rarities: ["Uncommon", "Common", "Common", "Rare", "Uncommon", "Common"] },
  { rarities: ["Rare", "Rare", "Rare", "Common", "Common", "Uncommon"] },
  { rarities: ["Common", "Uncommon", "Common", "Rare", "Rare", "Uncommon"] },
  { rarities: ["Uncommon", "Common", "Common", "Rare", "Uncommon", "Common", "Common"] },
  { rarities: ["Common", "Common", "Common", "Common", "Common"] },
  { rarities: ["Common", "Uncommon", "Common", "Rare", "Rare"] },
  { rarities: ["Common", "Uncommon", "Common", "Rare", "Uncommon"] },
  { rarities: ["Super Rare", "Common", "Common", "Rare", "Uncommon"] },
  { rarities: ["Common", "Common", "Uncommon", "Rare", "Rare"] },
  { rarities: ["Uncommon", "Super Rare", "Common", "Rare", "Uncommon", "Common"] },
  { rarities: ["Ultra Rare", "Uncommon", "Common", "Rare", "Rare", "Common"] },
  { rarities: ["Super Rare", "Common", "Common", "Rare", "Rare"] },
  { rarities: ["Common", "Common", "Rare", "Rare", "Uncommon", "Ultra Rare"] },
  { rarities: ["Common", "Common", "Common", "Common", "Common"] },
  { rarities: ["Secret Rare", "Super Rare", "Common", "Uncommon", "Uncommon", "Common"] },
  { rarities: ["Common", "Common", "Common", "Common", "Common"] },
  { rarities: ["Uncommon", "Common", "Common", "Rare", "Uncommon"] },
  { rarities: ["Common", "Common", "Uncommon", "Rare", "Rare", "Uncommon"] },
  { rarities: ["Super Rare", "Common", "Common", "Rare", "Uncommon"] },
  { rarities: ["Super Rare", "Super Rare", "Common", "Common", "Common"], foil: true },
  { rarities: ["Common", "Common", "Ultra Rare", "Rare", "Rare"] },
  { rarities: ["Common", "Common", "Uncommon", "Rare", "Rare", "Super Rare"] },
  { rarities: ["Common", "Uncommon", "Rare", "Uncommon", "Common"] },
  { rarities: ["Ultra Rare", "Common", "Common", "Common", "Common"], foil: true },
  { rarities: ["Common", "Common", "Rare", "Uncommon", "Super Rare"] },
  { rarities: ["Uncommon", "Uncommon", "Uncommon", "Rare", "Rare"] },
  { rarities: ["Uncommon", "Common", "Common", "Rare", "Uncommon"] },
  { rarities: ["Super Rare", "Common", "Common", "Rare", "Uncommon"] },
  { rarities: ["Common", "Super Rare", "Uncommon", "Rare", "Rare", "Common"] },
  { rarities: ["Legendary", "Common", "Uncommon", "Common", "Rare"] },
  { rarities: ["Common", "Common", "Common", "Common", "Common"] },
  { rarities: ["Common", "Common", "Common", "Uncommon", "Rare", "Common"] },
  { rarities: ["Uncommon", "Common", "Uncommon", "Common", "Super Rare"] },
  { rarities: ["Uncommon", "Uncommon", "Uncommon", "Common", "Rare", "Rare"] },
  { rarities: ["Common", "Uncommon", "Common", "Common", "Uncommon", "Common"] },
  { rarities: ["Common", "Super Rare", "Common", "Rare", "Uncommon"] },
  { rarities: ["Common", "Common", "Rare", "Uncommon", "Super Rare", "Uncommon"] },
  { rarities: ["Super Rare", "Common", "Rare", "Uncommon", "Uncommon"] },
  { rarities: ["Common", "Ultra Rare", "Common", "Rare", "Uncommon", "Common"] },
  { rarities: ["Common", "Common", "Rare", "Uncommon", "Uncommon", "Common"] },
  { rarities: ["Common", "Common", "Ultra Rare", "Uncommon", "Common", "Uncommon"] },
  { rarities: ["Legendary", "Rare", "Uncommon", "Uncommon", "Common"] },
  { rarities: ["Secret Rare", "Super Rare", "Ultra Rare", "Uncommon", "Rare"], foil: true },
  { rarities: ["Super Rare", "Common", "Super Rare", "Rare", "Uncommon", "Uncommon"] },
  { rarities: ["Uncommon", "Common", "Common", "Rare", "Ultra Rare", "Uncommon"] },
  { rarities: ["Uncommon", "Ultra Rare", "Common", "Rare", "Super Rare", "Uncommon"] },
  { rarities: ["Common", "Common", "Rare", "Ultra Rare", "Legendary", "Rare"] },
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
      "Ultra Rare": 0,
      Legendary: 0,
      "Super Rare": 0,
      "Secret Rare": 0,
    },
  },
  {
    id: 2,
    name: "Pack de Ninja",
    price: 90,
    slots: 6,
    rollTable: ninjaRollTable,
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
  isOpeningPack: false,
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

const api = {
  available: null,
  async loadState() {
    try {
      const response = await fetch("/api/state", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("API indisponível");
      }
      this.available = true;
      return await response.json();
    } catch (error) {
      this.available = false;
      return null;
    }
  },
  async saveState(payload) {
    if (!this.available) {
      return;
    }
    await fetch("/api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
};

const formatCardTitle = (card) => `${card.name} • ${card.rarity}`;

const getRarityClass = (rarity) => {
  const value = String(rarity || "").toLowerCase();
  if (value.includes("secret")) {
    return "rarity-secret-rare";
  }
  if (value.includes("super")) {
    return "rarity-super-rare";
  }
  if (value.includes("legend")) {
    return "rarity-legendary";
  }
  if (value.includes("ultra") || value.includes("epic")) {
    return "rarity-ultra-rare";
  }
  if (value.includes("rare")) {
    return "rarity-rare";
  }
  if (value.includes("uncommon")) {
    return "rarity-uncommon";
  }
  return "rarity-common";
};

const normalizeInventory = () => {
  Object.keys(state.inventory).forEach((ownerId) => {
    state.inventory[ownerId] = state.inventory[ownerId].map((item) => ({
      id: item.id || crypto.randomUUID(),
      cardId: item.cardId,
      acquiredAt: item.acquiredAt || new Date().toISOString(),
      foil: item.foil || false,
    }));
  });
};

const loadStateFromStorage = () => {
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
  normalizeInventory();
};

const assignState = (payload) => {
  state.users = payload.users || [];
  state.cards = payload.cards || defaultCards;
  state.packs = payload.packs || defaultPacks;
  state.inventory = payload.inventory || {};
  state.balances = payload.balances || {};
  state.decks = payload.decks || {};
  state.characters = payload.characters || {};
  state.adminPassword = payload.adminPassword || "1234";
  state.currentUser = payload.currentUser || null;
  state.selectedCharacter = payload.selectedCharacter || null;
  state.selectedDeck = payload.selectedDeck || null;
  normalizeInventory();
};

const buildSnapshot = () => ({
  users: state.users,
  cards: state.cards,
  packs: state.packs,
  inventory: state.inventory,
  balances: state.balances,
  decks: state.decks,
  characters: state.characters,
  currentUser: state.currentUser,
  selectedCharacter: state.selectedCharacter,
  selectedDeck: state.selectedDeck,
  adminPassword: state.adminPassword,
});

const loadState = async () => {
  const payload = await api.loadState();
  if (payload) {
    assignState(payload);
    return;
  }
  loadStateFromStorage();
};

const saveStateToStorage = () => {
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

const saveState = () => {
  const payload = buildSnapshot();
  if (api.available) {
    api.saveState(payload);
  } else {
    saveStateToStorage();
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
  updateSelect(ui.deckFilterType, types, "Tipo (todos)");
  updateSelect(ui.deckFilterRarity, rarities, "Raridade (todas)");
  updateSelect(ui.deckFilterClass, classes, "Classe (todas)");
};

const passesFilters = (card, filters) => {
  const typeFilter = filters.type;
  const rarityFilter = filters.rarity;
  const classFilter = filters.class;
  const textFilter = filters.text;
  if (typeFilter && card.type !== typeFilter) {
    return false;
  }
  if (rarityFilter && card.rarity !== rarityFilter) {
    return false;
  }
  if (classFilter && card.class !== classFilter) {
    return false;
  }
  if (textFilter) {
    const haystack = `${card.name} ${card.description} ${card.type} ${card.rarity} ${card.class}`
      .toLowerCase()
      .trim();
    if (!haystack.includes(textFilter)) {
      return false;
    }
  }
  return true;
};

const getInventoryFilters = () => ({
  type: ui.filterType.value,
  rarity: ui.filterRarity.value,
  class: ui.filterClass.value,
  text: ui.filterText.value.trim().toLowerCase(),
});

const getDeckFilters = () => ({
  type: ui.deckFilterType.value,
  rarity: ui.deckFilterRarity.value,
  class: ui.deckFilterClass.value,
  text: ui.deckFilterText.value.trim().toLowerCase(),
});

const sortItems = (items, sortKey) => {
  const sort = sortKey || "recent";
  if (sort === "manual") {
    return [...items];
  }
  if (sort === "az" || sort === "za") {
    return [...items].sort((a, b) => {
      const nameA = a.card.name.toLowerCase();
      const nameB = b.card.name.toLowerCase();
      return sort === "az" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  }
  return [...items].sort((a, b) => {
    const timeA = new Date(a.item.acquiredAt).getTime();
    const timeB = new Date(b.item.acquiredAt).getTime();
    return sort === "oldest" ? timeA - timeB : timeB - timeA;
  });
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
    if (pack.rollTable) {
      badge.textContent = `Tabela especial: 1d${pack.rollTable.length}`;
    } else {
      const chanceLabels = Object.entries(pack.chances || {})
        .filter(([, value]) => Number(value || 0) > 0)
        .map(([rarity, value]) => `${rarity} ${value}%`);
      badge.textContent = chanceLabels.length ? chanceLabels.join(" • ") : "Sem chances configuradas";
    }
    const openButton = document.createElement("button");
    openButton.textContent = state.isOpeningPack ? "Abrindo..." : "Comprar e abrir";
    openButton.disabled = state.isOpeningPack;
    openButton.addEventListener("click", () => openPack(pack.id));

    container.append(title, price, slots, badge, openButton);
    ui.packsList.appendChild(container);
  });
};

const buildCardElement = (card, options = {}) => {
  const container = document.createElement("div");
  container.className = `${options.className || "inventory-card"} ${getRarityClass(card.rarity)}`;
  if (options.foil) {
    container.classList.add("foil");
  }
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
  if (options.foil) {
    const foilChip = document.createElement("span");
    foilChip.className = "chip";
    foilChip.textContent = "Foil";
    chips.appendChild(foilChip);
  }

  container.append(title, meta, desc, chips);
  if (options.actions) {
    container.appendChild(options.actions);
  }
  if (options.onClick) {
    container.addEventListener("click", (event) => {
      if (event.target.closest("button")) {
        return;
      }
      options.onClick();
    });
  }
  if (options.draggable) {
    container.setAttribute("draggable", "true");
  }
  if (options.dataId) {
    container.dataset.inventoryId = options.dataId;
  }
  return container;
};

const createInventoryCard = (card, inventoryId, options = {}) => {
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
  return buildCardElement(card, {
    className: "inventory-card",
    actions,
    foil: options.foil,
    onClick: () => openCardModal(card, { foil: options.foil }),
  });
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
  const filters = getInventoryFilters();
  const visibleItems = items
    .map((item) => ({ item, card: state.cards.find((entry) => entry.id === item.cardId) }))
    .filter((entry) => entry.card && passesFilters(entry.card, filters));

  if (!visibleItems.length) {
    ui.inventoryList.textContent = "Nenhuma carta corresponde ao filtro.";
    return;
  }

  sortItems(visibleItems, ui.sortInventory.value).forEach(({ item, card }) => {
    ui.inventoryList.appendChild(createInventoryCard(card, item.id, { foil: item.foil }));
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

const rollDice = (sides) => Math.floor(Math.random() * sides) + 1;

const animateRoll = async (sides, duration = 900) =>
  new Promise((resolve) => {
    let elapsed = 0;
    const interval = 90;
    const ticker = setInterval(() => {
      elapsed += interval;
      const value = rollDice(sides);
      setStatus(`Rolando 1d${sides}... ${value}`);
      ui.packRollResult.textContent = value;
      ui.packRollStatus.textContent = `Rolando 1d${sides}...`;
      if (elapsed >= duration) {
        clearInterval(ticker);
        resolve();
      }
    }, interval);
  });

const rollPackWithTable = (pack) => {
  const roll = rollDice(pack.rollTable.length);
  const entry = pack.rollTable[roll - 1];
  const foilRoll = entry.foil ? rollDice(100) : null;
  return {
    roll,
    rarities: entry.rarities,
    foil: entry.foil && foilRoll >= 66,
  };
};

const pickCardByRarity = (rarity) => {
  const candidates = state.cards.filter((card) => card.rarity === rarity);
  const pool = candidates.length ? candidates : state.cards;
  return pool[Math.floor(Math.random() * pool.length)];
};

const openPack = async (packId) => {
  if (state.isOpeningPack) {
    return;
  }
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
  state.isOpeningPack = true;
  renderPacks();
  ui.packResultCards.innerHTML = "";
  ui.packRollResult.textContent = "-";
  ui.packRollStatus.textContent = "";
  ui.packRollRarities.innerHTML = "";
  openOverlay(ui.packModal);
  const pulls = [];
  let resultInfo = "";
  let foilApplied = false;
  if (pack.rollTable) {
    await animateRoll(pack.rollTable.length);
    const rollResult = rollPackWithTable(pack);
    resultInfo = ` (1d${pack.rollTable.length} = ${rollResult.roll})`;
    foilApplied = rollResult.foil;
    ui.packRollResult.textContent = rollResult.roll;
    ui.packRollStatus.textContent = `Resultado do dado${foilApplied ? " • Foil!" : ""}`;
    ui.packRollRarities.innerHTML = "";
    rollResult.rarities.forEach((rarity) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = rarity;
      ui.packRollRarities.appendChild(chip);
    });
    rollResult.rarities.forEach((rarity) => {
      const card = pickCardByRarity(rarity);
      pulls.push(card);
      state.inventory[ownerKey].push({
        id: crypto.randomUUID(),
        cardId: card.id,
        acquiredAt: new Date().toISOString(),
        foil: rollResult.foil,
      });
    });
  } else {
    for (let i = 0; i < pack.slots; i += 1) {
      const rarity = rollRarity(pack.chances);
      const card = pickCardByRarity(rarity);
      pulls.push(card);
      state.inventory[ownerKey].push({
        id: crypto.randomUUID(),
        cardId: card.id,
        acquiredAt: new Date().toISOString(),
        foil: false,
      });
    }
    ui.packRollRarities.innerHTML = "";
    pulls.forEach((card) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = card.rarity;
      ui.packRollRarities.appendChild(chip);
    });
  }
  saveState();
  updateWallet();
  renderInventory();
  ui.packResultCards.innerHTML = "";
  pulls.forEach((card) => {
    const cardEl = buildCardElement(card, {
      className: "inventory-card pack-result-card",
      foil: foilApplied,
    });
    ui.packResultCards.appendChild(cardEl);
  });
  const foilNote = foilApplied ? " (Foil!)" : "";
  setStatus(
    `Você abriu ${pack.name}${resultInfo}${foilNote} e recebeu ${pulls
      .map(formatCardTitle)
      .join(", ")}.`,
  );
  setTimeout(() => {
    state.isOpeningPack = false;
    renderPacks();
  }, 400);
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
    "Ultra Rare": Number(ui.chanceEpic.value || 0),
    Legendary: Number(ui.chanceLegendary.value || 0),
    "Super Rare": Number(ui.chanceSuperRare.value || 0),
    "Secret Rare": Number(ui.chanceSecretRare.value || 0),
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
  ui.deckCards.onDragOver = null;
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

  const deckItems = selectedDeck.cardIds
    .map((inventoryId) => {
      const item = (state.inventory[ownerKey] || []).find((entry) => entry.id === inventoryId);
      if (!item) {
        return null;
      }
      const card = state.cards.find((entry) => entry.id === item.cardId);
      return card ? { item, card } : null;
    })
    .filter(Boolean);

  const deckFilters = getDeckFilters();
  const visibleDeckItems = deckItems.filter((entry) => passesFilters(entry.card, deckFilters));

  if (!visibleDeckItems.length) {
    ui.deckCards.innerHTML = "";
    ui.deckCards.textContent = "Nenhuma carta corresponde ao filtro.";
    return;
  }

  let draggedId = null;
  let dragTargetId = null;
  let dragActive = false;
  const startDrag = (target) => {
    draggedId = target.dataset.inventoryId;
    dragTargetId = null;
    dragActive = true;
    target.classList.add("dragging");
  };
  const endDrag = () => {
    dragActive = false;
    ui.deckCards.querySelectorAll(".deck-card.dragging").forEach((card) => {
      card.classList.remove("dragging");
    });
  };
  const finalizeDrag = () => {
    if (!draggedId || !dragTargetId || dragTargetId === draggedId) {
      endDrag();
      return;
    }
    const ids = [...selectedDeck.cardIds];
    const fromIndex = ids.indexOf(draggedId);
    const toIndex = ids.indexOf(dragTargetId);
    if (fromIndex === -1 || toIndex === -1) {
      endDrag();
      return;
    }
    ids.splice(fromIndex, 1);
    ids.splice(toIndex, 0, draggedId);
    selectedDeck.cardIds = ids;
    ui.deckSort.value = "manual";
    saveState();
    renderDecks();
  };

  ui.deckCards.ondragstart = (event) => {
    const target = event.target.closest(".deck-card");
    if (!target) {
      return;
    }
    startDrag(target);
    event.dataTransfer.effectAllowed = "move";
  };
  ui.deckCards.ondragover = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    const target = event.target.closest(".deck-card");
    if (target) {
      dragTargetId = target.dataset.inventoryId;
    }
  };
  ui.deckCards.ondrop = (event) => {
    event.preventDefault();
    const targetCard = event.target.closest(".deck-card");
    if (targetCard) {
      dragTargetId = targetCard.dataset.inventoryId;
    }
    finalizeDrag();
  };
  ui.deckCards.ondragend = () => {
    endDrag();
  };
  ui.deckCards.onpointerdown = (event) => {
    const target = event.target.closest(".deck-card");
    if (!target) {
      return;
    }
    startDrag(target);
  };
  ui.deckCards.onpointermove = (event) => {
    if (!dragActive) {
      return;
    }
    const hovered = document.elementFromPoint(event.clientX, event.clientY);
    const target = hovered ? hovered.closest(".deck-card") : null;
    if (target) {
      dragTargetId = target.dataset.inventoryId;
    }
  };
  ui.deckCards.onpointerup = () => {
    if (!dragActive) {
      return;
    }
    finalizeDrag();
    endDrag();
  };

  sortItems(visibleDeckItems, ui.deckSort.value).forEach(({ item, card }) => {
    const remove = document.createElement("button");
    remove.className = "secondary";
    remove.textContent = "Remover do deck";
    remove.addEventListener("click", () => removeFromDeck(selectedDeck.id, item.id));
    const actions = document.createElement("div");
    actions.className = "inventory-actions";
    actions.appendChild(remove);
    ui.deckCards.appendChild(
      buildCardElement(card, {
        className: "deck-card",
        actions,
        foil: item.foil,
        draggable: true,
        dataId: item.id,
        onClick: () => openCardModal(card, { foil: item.foil }),
      }),
    );
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
  ui.filterText.value = "";
  ui.sortInventory.value = "recent";
  renderInventory();
};

const clearDeckFilters = () => {
  ui.deckFilterType.value = "";
  ui.deckFilterRarity.value = "";
  ui.deckFilterClass.value = "";
  ui.deckFilterText.value = "";
  ui.deckSort.value = "manual";
  renderDecks();
};

const openOverlay = (overlay) => {
  overlay.classList.remove("hidden");
  overlay.hidden = false;
};

const closeOverlay = (overlay) => {
  overlay.classList.add("hidden");
  overlay.hidden = true;
};

const openCardModal = (card, options = {}) => {
  ui.cardModalBody.innerHTML = "";
  ui.cardModalBody.appendChild(
    buildCardElement(card, {
      className: "inventory-card card-modal-card",
      foil: options.foil,
    }),
  );
  openOverlay(ui.cardModal);
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

const init = async () => {
  await loadState();
  if (state.currentUser) {
    ui.usernameInput.value = state.currentUser;
    ui.logoutButton.classList.remove("hidden");
    setStatus(`Logado como ${state.currentUser}.`);
  }
  closeOverlay(ui.storeOverlay);
  closeOverlay(ui.adminOverlay);
  closeOverlay(ui.cardModal);
  closeOverlay(ui.packModal);
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
ui.closeCardModal.addEventListener("click", () => closeOverlay(ui.cardModal));
ui.cardModal.addEventListener("click", (event) => {
  if (event.target === ui.cardModal) {
    closeOverlay(ui.cardModal);
  }
});
ui.closePackModal.addEventListener("click", () => closeOverlay(ui.packModal));
ui.packModal.addEventListener("click", (event) => {
  if (event.target === ui.packModal) {
    closeOverlay(ui.packModal);
  }
});
ui.addCard.addEventListener("click", addCard);
ui.addPack.addEventListener("click", addPack);
ui.createDeck.addEventListener("click", createDeck);
ui.filterType.addEventListener("change", renderInventory);
ui.filterRarity.addEventListener("change", renderInventory);
ui.filterClass.addEventListener("change", renderInventory);
ui.filterText.addEventListener("input", renderInventory);
ui.clearFilters.addEventListener("click", clearFilters);
ui.sortInventory.addEventListener("change", renderInventory);
ui.deckFilterType.addEventListener("change", renderDecks);
ui.deckFilterRarity.addEventListener("change", renderDecks);
ui.deckFilterClass.addEventListener("change", renderDecks);
ui.deckFilterText.addEventListener("input", renderDecks);
ui.deckSort.addEventListener("change", renderDecks);
ui.deckClearFilters.addEventListener("click", clearDeckFilters);

init();
