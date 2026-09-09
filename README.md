# ☀️ SOL HUB

Albion Online Europe market toolkit, preparado para deploy na Vercel e Discloud.

## Local
```bash
npm install
npm run dev
```


## Deploy — Discloud
Esta versão inclui `discloud.config` e `server.js` preparados para alojamento persistente na Discloud.
Consulta `README_DISCLOUD.md` antes do primeiro upload.

## Deploy — GitHub → Vercel
1. Cria um repositório GitHub vazio.
2. Coloca o conteúdo desta pasta no repositório.
3. Faz commit/push.
4. Na Vercel escolhe **Add New → Project** e importa o repositório.
5. Framework: **Next.js** (detetado automaticamente).
6. Deploy.

O HUB funciona sem variáveis obrigatórias; o Feedback via Discord requer `DISCORD_FEEDBACK_WEBHOOK_URL` configurado no ambiente de produção.

## Produção
- Região Vercel preferida: Frankfurt (`fra1`), adequada ao servidor Europe.
- Route Handlers executam em Node.js.
- Limite de execução configurado para 30 s.
- `.gitignore` exclui builds, dependências e ficheiros locais.
- Páginas globais de erro e 404 incluídas.
- Dados externos continuam a depender do Albion Online Data Project e ao-bin-dumps.

## Nota
Antes de divulgar amplamente, é recomendável acrescentar rate limiting persistente. Esta V7.1 é adequada para uso pessoal/pequeno grupo; uma proteção distribuída (por exemplo, KV/Redis) é preferível para tráfego público elevado.
