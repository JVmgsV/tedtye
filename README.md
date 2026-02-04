# Beta de Cartas

Este é um protótipo simples para testar login, personagens, loja, inventário e construção de decks usando apenas o navegador.

## Como rodar

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000` no navegador.

## Como usar

- Faça login com qualquer nome.
- Crie personagens e selecione o personagem ativo (cada um tem carteira e cartas próprias).
- Abra a **Loja** para comprar packs usando a carteira do personagem.
- Adicione moedas fictícias usando o botão de carteira.
- Use os filtros do inventário para buscar por tipo, raridade ou classe.
- Crie decks e adicione cartas clicando em "Adicionar ao deck" nas cartas.
- Clique em **Jogar** após selecionar um deck para abrir a tela de jogo (placeholder).
- O **Admin** usa a senha padrão `1234` para cadastrar cartas e packs.

Os dados ficam salvos no `localStorage` do navegador.
