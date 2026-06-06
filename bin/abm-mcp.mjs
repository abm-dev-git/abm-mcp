#!/usr/bin/env node
// abm-mcp — thin local STDIO bridge to the hosted abm.dev MCP server.
//
// Launches the community `mcp-remote` proxy pointed at abm.dev's hosted MCP
// endpoint. It does NOT define any tools, fields, or schemas: whatever the
// remote serves is exactly what this exposes. Shipping a new server-side
// version needs zero change here.
//
// Endpoint: defaults to https://mcp.abm.dev/mcp, overridable via ABM_MCP_URL.

import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const ENDPOINT = process.env.ABM_MCP_URL || "https://mcp.abm.dev/mcp";

// Resolve the bundled mcp-remote proxy entry from its own package manifest,
// so we run exactly the version pinned in our dependencies.
const require = createRequire(import.meta.url);
const proxyEntry = require.resolve("mcp-remote/dist/proxy.js");

// Forward the endpoint plus any extra CLI args the caller passed through.
const passthrough = process.argv.slice(2);
const args = [proxyEntry, ENDPOINT, ...passthrough];

const child = spawn(process.execPath, args, { stdio: "inherit" });

// Relay termination signals so the bridge shuts down cleanly with its parent.
for (const signal of ["SIGINT", "SIGTERM", "SIGHUP"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("error", (err) => {
  process.stderr.write(`abm-mcp: failed to start bridge: ${err.message}\n`);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
