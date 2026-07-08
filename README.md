<p align="center">
  <img src="https://raw.githubusercontent.com/abm-dev-git/abm-mcp/main/assets/abm-diamond.svg" alt="abm.dev" width="96" />
</p>

<h1 align="center">abm.dev MCP server</h1>

<p align="center">
  <strong>The account-based marketing API for AI agents.</strong><br/>
  Search, Source, Enrich, and Create across B2B people and companies — one key, one schema, every field cited.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@abmdev/mcp"><img src="https://img.shields.io/npm/v/@abmdev/mcp?color=2563eb&label=%40abmdev%2Fmcp" alt="npm" /></a>
  <a href="https://github.com/abm-dev-git/abm-mcp/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT" /></a>
  <a href="https://mcp.abm.dev/mcp"><img src="https://img.shields.io/badge/MCP-streamable--http-7c3aed" alt="MCP" /></a>
  <a href="https://smithery.ai/servers/abm-dev/gtm"><img src="https://smithery.ai/badge/abm-dev/gtm" alt="Smithery" /></a>
</p>

- **Hosted server:** `https://mcp.abm.dev/mcp`
- **Homepage:** https://abm.dev
- **For agents (machine-readable):** https://abm.dev/llms.txt

---

## What your agents can do

abm.dev is the account-based marketing API for AI agents. One key, one schema, four verbs:

- **Search** — find companies and people by criteria. `search_companies`, `search_contacts`.
- **Source** — hand it a target account, get the right buying-committee people back. Async briefs: `source`, `get_source`.
- **Enrich** — cited, multi-source fields on any person or company. `create_enrichment`, `get_enrichment_fields`, `get_enrichment_sources`.
- **Create** — write CRM records and stage outreach. `create_company`, `create_contact`, `create_outreach`; `queue_linkedin_post` **stages** a post for human approval — it never auto-publishes.

Every value carries its `source` and a `confidence` score (0–1). A value is cited or it is not returned. No fabricated facts.

## What you get

- **Eighty-nine canonical fields** per record — forty-three on the person, forty-six on the company.
- **Forty signals** on every prospect.
- **Ten sources**, resolved into one response — LinkedIn, Companies House, Perplexity, Tavily, Hunter, and others.
- **A citation on every value** — `source` and `confidence` (0–1), with the winning source that produced it.

No per-source bills. No per-field charges. No silent fallbacks.

---

## Connect

### Claude (custom connector)

1. Open **Settings → Connectors → Custom**.
2. Paste the server URL: `https://mcp.abm.dev/mcp`
3. Complete the one-time sign-in when prompted.

Then ask, in plain language: *"Find the VP of Marketing at Acme, then enrich them."*

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

Prefer a local command over a remote URL? The `@abmdev/mcp` package is a thin
bridge: `npx -y @abmdev/mcp` launches a local STDIO MCP server that proxies to the
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
      "args": ["-y", "@abmdev/mcp"]
    }
  }
}
```

Generic config snippet (for clients that take a bare command):

```json
{ "command": "npx", "args": ["-y", "@abmdev/mcp"] }
```

On first run a browser window opens for the one-time sign-in; the token is then
cached for subsequent runs. Point the bridge at a different endpoint by setting
the `ABM_MCP_URL` environment variable.

> Either path reaches the same hosted server. Use the **custom connector**
> (remote URL) above if your client supports it directly; use **npx** for
> clients that only speak local `command`/`args`.

---

## Tools

Grouped by verb — every field comes back with its `source` and `confidence` (0–1). Real-time SSE streaming for agent loops; webhooks fire when batch jobs finish.

**Search** — `search_companies`, `search_contacts`: find accounts and people by criteria.

**Source** — `source`, `get_source`: give it an account, get the right people back (async brief).

**Enrich** — `create_enrichment`, `get_enrichment`, `get_enrichment_fields`, `get_enrichment_sources`: cited, multi-source fields on a person (from an email or LinkedIn URL) or a company (from a domain).

**Create** — `create_company`, `create_contact`, `create_outreach`, `queue_linkedin_post`: write CRM records and **stage** outreach. Staged posts wait for human approval; nothing publishes automatically.

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
