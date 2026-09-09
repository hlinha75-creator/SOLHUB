# ☀️ SOL HUB — Discloud deployment

This package is prepared to run SOL HUB as a persistent Next.js website on Discloud.

## Before uploading

1. Open `discloud.config`.
2. Change `ID=sol-hub` if that subdomain is not available on your Discloud account.
3. Keep `TYPE=site`, `MAIN=server.js`, `BUILD=npm run build` and `START=npm run start` unchanged.
4. The configuration requests `1024 MB` RAM. Discloud requires at least `512 MB` for websites; 1024 MB is intentionally used to give the Next.js build/runtime more headroom.

## Discord Feedback webhook

Do **not** put a real webhook in the source files.

For production, configure this environment variable in Discloud:

```env
DISCORD_FEEDBACK_WEBHOOK_URL=https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN
```

The supplied `.env.example` contains only a placeholder. No `.env` or `.env.local` file with secrets is included in this ZIP.

## Upload

Upload the ZIP/project to Discloud using `discloud.config` at the project root. The deployment process will:

1. install the Node.js dependencies using Discloud's normal JavaScript deployment flow;
2. run the Next.js production build via `BUILD=npm run build`;
3. start `server.js`;
4. listen on port `8080` (or `PORT` when provided) using `0.0.0.0`;
5. automatically restart the process after a crash when supported by the account plan.

## Local production test

```bash
npm install
npm run build
npm start
```

Without a `PORT` environment variable, the production server listens on port `8080`.

## Vercel compatibility

`vercel.json` has been kept. The same source tree can still be deployed to Vercel; `server.js` and `discloud.config` are only used by the Discloud deployment flow.
