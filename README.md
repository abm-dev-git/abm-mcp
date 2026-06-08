<p align="center">
  <img src="https://raw.githubusercontent.com/abm-dev-git/abm-mcp/main/assets/abm-diamond.svg" alt="abm.dev" width="96" />
</p>

<h1 align="center">abm.dev MCP server</h1>

<p align="center">
  <strong>Account-based marketing enrichment for AI agents.</strong><br/>
  One endpoint. Cited, multi-source fields. Every value attributed.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/abm-mcp"><img src="https://img.shields.io/npm/v/abm-mcp?color=2563eb&label=abm-mcp" alt="npm" /></a>
  <a href="https://github.com/abm-dev-git/abm-mcp/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT" /></a>
  <a href="https://mcp.abm.dev/mcp"><img src="https://img.shields.io/badge/MCP-streamable--http-7c3aed" alt="MCP" /></a>
  <a href="https://smithery.ai/servers/abm-dev/gtm"><img src="https://smithery.ai/badge/abm-dev/gtm" alt="Smithery" /></a>
</p>

- **Hosted server:** `https://mcp.abm.dev/mcp`
- **Homepage:** https://abm.dev
- **For agents (machine-readable):** https://abm.dev/llms.txt

---

## What abm.dev is

Account-based marketing for AI agents. Give it an email, a LinkedIn URL, or a company domain; get back a structured record on the person and the company they work for. Every value carries its source, a confidence score, and a last-verified timestamp. A value is cited or it is not returned. No fabricated facts.

## What you get

- **Eighty-nine canonical fields** per record — forty-three on the person, forty-six on the company.
- **Forty signals** on every prospect.
- **Ten sources**, resolved into one response — LinkedIn, Companies House, Perplexity, Tavily, Hunter, and others.
- **Citations on every value** — `source`, `confidence` (0–1), and `freshness` (last-verified timestamp).

No per-source bills. No per-field charges. No silent fallbacks.

---

## Connect

### Claude (custom connector)

1. Open **Settings → Connectors → Custom**.
2. Paste the server URL: `https://mcp.abm.dev/mcp`
3. Complete the one-time sign-in when prompted.

Then ask, in plain language: *"Enrich jane@acme.com."*

### Cursor / Claude Code / Windsurf

These agents drive the REST API directly. Paste this prompt:

> Read https://abm.dev/llms.txt. Request an API key, save it to `.env` as `ABM_API_KEY`, then run a test enrichment against `https://api.abm.dev/v1/enrichments`. Report the result with its citations.

### Script and terminal agents

Call the REST API directly:

```bash
curl https://api.abm.dev/v1/enrichments \
  -H "x-api-key: $ABM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"person","input":{"email":"jane@acme.com"}}'
```

`input` also accepts a LinkedIn URL or a company `domain`.

---

## Install (npx)

Prefer a local command over a remote URL? The `abm-mcp` package is a thin
bridge: `npx -y abm-mcp` launches a local STDIO MCP server that proxies to the
hosted server at `https://mcp.abm.dev/mcp`, handling the OAuth 2.1 PKCE sign-in
and token caching for you. It defines no tools of its own — it exposes whatever
the hosted server serves.

Add it to any MCP client that supports `command`/`args` (Claude Desktop,
Cursor, Windsurf, Claude Code, and others):

```json
{
  "mcpServers": {
    "abm": {
      "command": "npx",
      "args": ["-y", "abm-mcp"]
    }
  }
}
```

Generic config snippet (for clients that take a bare command):

```json
{ "command": "npx", "args": ["-y", "abm-mcp"] }
```

On first run a browser window opens for the one-time sign-in; the token is then
cached for subsequent runs. Point the bridge at a different endpoint by setting
the `ABM_MCP_URL` environment variable.

> Either path reaches the same hosted server. Use the **custom connector**
> (remote URL) above if your client supports it directly; use **npx** for
> clients that only speak local `command`/`args`.

---

## Tools

The server exposes **enrichment**:

- **Enrich a person** — from an email or a LinkedIn URL. Returns the forty-three person fields plus the company they work for.
- **Enrich a company** — from a domain. Returns the forty-six company fields.

Every field comes back with its `source`, `confidence`, and `freshness`. Real-time SSE streaming for agent loops; webhooks fire when batch jobs finish.

---

## Pricing

Per-enrichment. No subscription. Credits never expire. All ten sources included — no add-ons.

From about `€0.29` per enrichment. Packs: `30` credits `€2.89`, `100` `€9.29`, `500` `€36.99` (best value), `2,000` `€119.99`. The playground is free. Free launch credits with code `LAUNCHCODES`.

See https://abm.dev/#pricing.

---

## Links

- **Homepage:** https://abm.dev
- **For agents (llms.txt):** https://abm.dev/llms.txt
- **Docs:** https://abm.dev/docs · [Getting started](https://abm.dev/docs/getting-started)
- **API reference:** https://abm.dev/api-reference · [Enrichment](https://abm.dev/api-reference/enrichment) · [Jobs](https://abm.dev/api-reference/jobs)
- **For developers:** https://abm.dev/for-developers · **For agents:** https://abm.dev/for-agents · **For marketers:** https://abm.dev/for-marketers
- **Integrations:** [Claude connector](https://abm.dev/docs/integrations/claude-connector) · [HubSpot](https://abm.dev/docs/integrations/hubspot) · [Notion](https://abm.dev/docs/integrations/notion) · [Slack](https://abm.dev/docs/integrations/slack)
- **Concepts:** [Enrichment](https://abm.dev/docs/concepts/enrichment) · [Confidence scores](https://abm.dev/docs/concepts/confidence-scores) · [Data sources](https://abm.dev/docs/concepts/data-sources) · [Canonical fields](https://abm.dev/docs/concepts/canonical-fields)
- **Sign up:** https://abm.dev/sign-up · **Free playground:** https://abm.dev/dashboard/playground

---

## Registry reference

This repo is the public description of a hosted MCP server. The server runs at `https://mcp.abm.dev/mcp`; this repo is not its source. See [`server.json`](./server.json) for the machine-readable manifest.

## Support

Questions or a stuck enrichment? Open a ticket: https://abm.dev

## Operator

Foxley Farm Operations Ltd · UK Company No. `16392009` · Oakham, United Kingdom. GDPR-compliant.
