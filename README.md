# Ted Tye Decks

Este é um protótipo simples para testar login, personagens, loja, inventário e construção de decks com persistência usando Vercel KV (ou arquivo JSON local).

## Como rodar localmente

```bash
npm install
npx vercel dev
```

Acesse `http://localhost:8000` no navegador. Sem variáveis do Vercel KV, os dados são salvos em `data/db.json`.

## Como publicar no Vercel (com banco online)

1. Crie um projeto no Vercel e conecte ao repositório.
2. No painel do Vercel, crie um banco **KV** (Storage).
3. Copie as variáveis de ambiente do KV para o projeto:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
4. Faça o deploy novamente.

Depois disso, a API `/api/state` passa a ler/gravar no KV.

## Como usar

- Faça login com qualquer nome.
- Crie personagens e selecione o personagem ativo (cada um tem carteira e cartas próprias).
- Abra a **Loja** para comprar packs usando a carteira do personagem.
- Adicione moedas fictícias usando o botão de carteira.
- Use os filtros do inventário para buscar por tipo, raridade ou classe.
- Crie decks e adicione cartas clicando em "Adicionar ao deck" nas cartas.
- O **Admin** usa a senha padrão `1234` para cadastrar cartas e packs.

Os dados ficam salvos no Vercel KV (ou no arquivo `data/db.json` em ambiente local).

> Branch marker: retry/upload-test-2
