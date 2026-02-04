# Beta de Cartas

Este é um protótipo simples para testar login, personagens, loja, inventário e construção de decks com persistência em um arquivo JSON.

## Como rodar

```bash
npm install
npm start
```

Acesse `http://localhost:8000` no navegador. O servidor salva os dados em `data/db.json`.

## Como usar

- Faça login com qualquer nome.
- Crie personagens e selecione o personagem ativo (cada um tem carteira e cartas próprias).
- Abra a **Loja** para comprar packs usando a carteira do personagem.
- Adicione moedas fictícias usando o botão de carteira.
- Use os filtros do inventário para buscar por tipo, raridade ou classe.
- Crie decks e adicione cartas clicando em "Adicionar ao deck" nas cartas.
- O **Admin** usa a senha padrão `1234` para cadastrar cartas e packs.

Os dados ficam salvos no arquivo `data/db.json` no servidor.
