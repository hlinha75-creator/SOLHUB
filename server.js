const http = require("http");
const next = require("next");
const { parse } = require("url");

const port = Number(process.env.PORT || 8080);
const hostname = "0.0.0.0";
const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.listen(port, hostname, () => {
    console.log(`SOL HUB listening on http://${hostname}:${port}`);
  });
}).catch((error) => {
  console.error("Failed to start SOL HUB:", error);
  process.exit(1);
});
