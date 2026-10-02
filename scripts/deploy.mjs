import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const checkOnly = process.argv.length === 3 && process.argv[2] === "--check";
assert(process.argv.length === 2 || checkOnly, "Only --check is accepted.");
const config = readJson("wrangler.jsonc");
const manifest = readJson("package.json");
const release = readJson("dist/release.json");
const revision = git("rev-parse", "HEAD");
assert.equal(
  git("status", "--porcelain"),
  "",
  "Commit the working tree before deployment.",
);
assert.equal(release.revision, revision, "Rebuild from the release commit.");
assert.equal(release.dirty, false, "Rebuild from a clean working tree.");
assert.equal(release.version, manifest.version, "The built version is stale.");
assert.equal(config.name, "sleepy");
assert.deepEqual(config.routes, [{ pattern: "sleepy.hexly.ai", custom_domain: true }]);
assert.equal(config.workers_dev, false);
assert.equal(config.preview_urls, false);
assert.equal(config.assets.not_found_handling, "none");
assert.equal(config.main, undefined);
for (const binding of [
  "d1_databases",
  "kv_namespaces",
  "r2_buckets",
  "durable_objects",
]) {
  assert.equal(config[binding], undefined, `Unexpected storage binding: ${binding}`);
}
if (checkOnly) {
  console.log(`Release v${manifest.version} matches ${revision}. No upload performed.`);
} else {
  assert(
    process.stdout.isTTY,
    "Use an interactive terminal so Wrangler cannot silently replace conflicting domains.",
  );
  assert(
    process.env.CLOUDFLARE_ACCOUNT_ID,
    "Set the verified CLOUDFLARE_ACCOUNT_ID explicitly.",
  );
  const result = spawnSync(
    resolve("node_modules/.bin/wrangler"),
    [
      "deploy",
      "--strict",
      "--no-autoconfig",
      "--tag",
      `v${manifest.version}-${revision.slice(0, 12)}`,
      "--message",
      `Release v${manifest.version} from ${revision}`,
    ],
    { stdio: "inherit", env: { ...process.env, WRANGLER_SEND_METRICS: "false" } },
  );
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
}
