import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "../../dist");
const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
};

export async function startSite() {
  let generation = 1;
  let stopped = false;
  const headerText = await readFile(resolve(root, "_headers"), "utf8");
  const headers = Object.fromEntries(
    headerText
      .split("\n\n")[0]
      ?.split("\n")
      .slice(1)
      .filter(Boolean)
      .map((line) => {
        const separator = line.indexOf(":");
        return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
      }) || [],
  );
  const server = createServer(async (request, response) => {
    const pathname = new URL(request.url || "/", "http://localhost").pathname;
    const path = resolve(root, `.${pathname === "/" ? "/index.html" : pathname}`);
    if (!path.startsWith(`${root}${sep}`)) {
      response.writeHead(404).end();
      return;
    }
    try {
      const file = await readFile(path);
      response.writeHead(200, {
        ...headers,
        "Content-Type": types[extname(path)] || "application/octet-stream",
        "Cache-Control": "no-cache",
      });
      response.end(
        pathname === "/sw.js"
          ? `${file.toString()}\nself.__sleepyFixtureGeneration = ${generation};\n`
          : file,
      );
    } catch {
      response.writeHead(404, { "Cache-Control": "no-store" }).end();
    }
  });
  await new Promise<void>((ready) => server.listen(0, "127.0.0.1", ready));
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("The fixture did not bind a TCP port.");
  return {
    url: `http://127.0.0.1:${address.port}`,
    update: () => {
      generation += 1;
    },
    stop: async () => {
      if (stopped) return;
      stopped = true;
      server.closeAllConnections();
      await new Promise<void>((closed, reject) =>
        server.close((error) => (error ? reject(error) : closed())),
      );
    },
  };
}
