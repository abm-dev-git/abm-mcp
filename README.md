# abm.dev MCP server

Account-based marketing enrichment for AI agents. One endpoint. Eighty-nine canonical fields, every value cited.

> **Personalisation, at scale.** A hosted MCP server that gives any agent B2B enrichment — person and company, resolved from ten sources into one cited response.

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
