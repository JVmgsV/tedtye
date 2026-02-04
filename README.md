# Beta de Cartas

Este é um protótipo simples para testar a ideia de login, packs, inventário e construção de decks usando apenas o navegador.

## Como rodar

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000` no navegador.

## Como usar

- Faça login com qualquer nome.
- Use o usuário `admin` para liberar o painel administrativo.
- Adicione moedas fictícias e abra packs.
- Cadastre novas cartas e packs no painel admin.
- Arraste cartas do inventário para montar decks (mínimo de 20 cartas).
- Use os filtros do inventário para buscar por tipo, raridade ou classe.

Os dados ficam salvos no `localStorage` do navegador.
