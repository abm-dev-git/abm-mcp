---
name: abm-dev
description: Enrich B2B people and companies with abm.dev — verified work emails, LinkedIn profiles, firmographics, and AI research with a citation and confidence on every field. Use when the user needs contact data, company intelligence, email-finding, people search at target accounts, or CRM enrichment writeback.
---

<!-- GENERATED FILE — do not edit by hand.
     Source of truth: AbmMcpServer.getTools() (apps/mcp-server).
     Regenerate: node apps/mcp-server/scripts/generate-agent-docs.mjs -->

# abm.dev — B2B enrichment for agents

abm.dev turns an email, a name + company, or a LinkedIn URL into ~89 canonical
fields per record (43 person + 46 company), each with a source citation and a
confidence score, synthesised from ~10 data sources — and writes the results
back to your CRM.

## Connect

- **MCP (preferred):** `https://mcp.abm.dev/mcp` — OAuth sign-in on first use.
  One-click from Claude: https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=abm.dev&connectorUrl=https%3A%2F%2Fmcp.abm.dev%2Fmcp
- **REST API:** `https://api.abm.dev` with the `X-API-Key` header — mint a key
  at https://abm.dev/settings/api-keys. Same verbs: `POST /v2/enrich`,
  `POST /v2/search`, `POST /v2/source`.
- **CLI:** `npx -y @abmdev/cli@latest init --all -k <API_KEY>`

## The core loop (match → enrich → write back)

1. **Match** the record in the CRM: `search_companies` / `search_contacts`.
   Filters are EXACT-match — match on `domain`/`email`, not display names
   ("Saffery" will not match "Saffery LLP"). No match? `create_company` /
   `create_contact`.
2. **Enrich** with the CRM id threaded through:
   `create_enrichment { type, input: { company_name, domain, crm_id } }` →
   returns a `job_id` (async, commonly 3–8 min). Add `refresh: true` to force
   a from-scratch run when the record was enriched recently. Poll
   `get_enrichment` every 30–60s until `completed` (a processing status with
   0 fields is normal — do not give up before ~10 min), then read values with
   `get_enrichment_fields` and provenance with `get_enrichment_sources`.
3. **Write back**: `preview_writeback` shows the per-field keep/use diff; then
   `approve_enrichment` (REAL CRM mutation). If the preview shows no/wrong
   matched record, pass `crm_entity_id` on approve.

## Finding people (async search)

`search { type: "people", company: "…", limit: 20 }` returns a `job_id`
immediately — the multi-page walk takes a minute or two. Poll
`get_search_job { job_id }` every ~20s until `summary.status === "completed"`;
`data[]` grows page-by-page. Role-targeted alternative: `source` +
`get_source` (the people-finder). Both act as the org's connected LinkedIn
account and respect its daily quotas — spread large sweeps out.

## Ground rules

- Every field is grounded in a fetched source and returned with a citation +
  confidence — never fabricate a value; if a fact is not in the result, say so.
- Respect tool annotations: `approve_enrichment` and the CRM create/update
  tools are REAL mutations; preview before you write.

## Tool reference (48 tools)

Tool visibility is gated per org/role feature flags — not every tool below is
always present.

### Enrich

- `create_enrichment` (WRITE) — Start an async enrichment of a person or company (type + input).
- `get_enrichment` (read) — Poll an enrichment job (pass wait: true to LONG-POLL — the server holds ~25s and returns at the first change, replacing rapid polling) by its sequential id for current status: queued | processing | completed | failed …
- `list_enrichments` (read) — List enrichment jobs for the current org, newest first.
- `cancel_enrichment` (WRITE) — Cancel an in-flight enrichment job by id.
- `get_enrichment_sources` (read) — Get per-source attribution results for an enrichment — which fields came from which source (professional profiles vs verified web sources).
- `get_enrichment_fields` (read) — Return the ENRICHED RESULT VALUES for a COMPLETED enrichment job: each field with its value, confidence, and the winning source.

### Write back to CRM

- `approve_enrichment` (WRITE) — Approve a completed enrichment and write its fields back to the connected CRM.
- `preview_writeback` (read) — Preview what fields will be written to CRM before approving — shows diff vs current CRM values

### CRM records

- `search_contacts` (read) — Search contacts in the org's connected CRM (HubSpot, Salesforce, etc.) by canonical-field filters.
- `get_contact` (read) — Get a single contact by its CRM-native ID.
- `create_contact` (WRITE) — Create a new contact in the org's connected CRM.
- `update_contact` (WRITE) — Update an existing contact's properties.
- `search_companies` (read) — Search companies in the org's connected CRM by canonical-field filters.
- `get_company` (read) — Get a single company by its CRM-native ID.
- `create_company` (WRITE) — Create a new company in the org's connected CRM.
- `update_company` (WRITE) — Update an existing company's properties.
- `list_crm_platforms` (read) — List CRM platforms this server can talk to (e.g.
- `get_crm_health` (read) — Check the connection health of a CRM integration for the calling org.
- `list_crm_field_mappings` (read) — List the field-mapping rules between canonical field names and the CRM's native property names for a given entity type.
- `list_crm_integrations` (read) — List the per-tenant CRM integrations configured for the calling org.

### Search (async)

- `search` (read) — Find people or companies across the connected channels (including LinkedIn) — ONE unified verb with two modes.
- `get_search_job` (read) — Poll an async job started by the `search` tool — a keyword search OR a source (people-by-role) job.
- `get_content` (read) — Read posts / content for a profile or company across the connected channels (including LinkedIn).

### Entities

- `list_entities` (read) — List + search canonical entities (deduplicated people / companies) in this org.
- `get_entity` (read) — Get a single canonical entity by its numeric entity id (from list_entities, NOT a job id): display name, type, identifiers (email, linkedin_url, domain), most recent enrichment summary, merged source data.
- `list_entity_enrichments` (read) — List every enrichment run that touched a canonical entity (by entity id from list_entities/get_entity), newest first.

### Batch enrichment

- `preview_batch` (WRITE) — Preview a batch enrichment from a HubSpot list — shows entities and estimated credits
- `confirm_batch` (WRITE) — Start a batch enrichment previously staged by preview_batch (by batch_id).
- `list_batches` (read) — List all batch enrichment jobs for the current org, newest first.
- `get_batch` (read) — Get progress for a batch enrichment by batch_id: overall status, percent_complete, plus total/completed/failed member counts.
- `approve_batch` (WRITE) — Approve every completed result in a batch (by batch_id) and write them all back to the connected CRM at once.

### LinkedIn account

- `get_linkedin_status` (read) — Get the org's LinkedIn connection in one read (GET /api/v2/linkedin/connection): connected/pending/disconnected/error status, profile name + URL, last verified, cookie expiry, session availability and service health.
- `get_linkedin_usage` (read) — Get the org's consolidated LinkedIn usage (GET /api/v2/linkedin/usage): daily safety quotas (search/profile-view/total %), Browserbase deep-fetch budget, and the safety-deferred queue summary.
- `get_profile` (read) — Composite LinkedIn profile for a person by public id — name, headline, current and past experience, education.
- `get_company_profile` (read) — Company intelligence from LinkedIn by universal name (the company slug from its LinkedIn URL, e.g.
- `list_linkedin` (read) — Read LinkedIn relationship + activity lists for the connected account.

### Outreach & outbound queue

- `queue_outbound_batch` (WRITE) — Stage a paced batch of outbound actions (e.g.
- `approve_outbound_batch` (WRITE) — Release a staged outbound batch so the dispatcher begins dripping its sends, honouring the batch schedule.
- `pause_outbound_batch` (WRITE) — Pause an approved outbound batch — the dispatcher stops claiming its jobs until resumed.
- `resume_outbound_batch` (WRITE) — Resume a paused outbound batch back to approved so the dispatcher continues dripping its sends.
- `stop_outbound_batch` (WRITE) — Permanently stop an outbound batch: cancels every still-open job and flips the batch to stopped (allowed from staged/approved/paused).
- `get_outbound_batch` (read) — Get a single outbound batch by id: the batch header (action_type, status, schedule), its jobs, and the derived per-status summary (pending / scheduled / sent / failed / cancelled).
- `queue_linkedin_post` (WRITE) — Stage a LinkedIn post for review — it does NOT publish until approve_outbound_batch is called.
- `update_linkedin_post` (WRITE) — Edit a STILL-STAGED LinkedIn post in place before it is approved — change any of text, visibility, content_type, media_ids, or scheduled_at.
- `upload_media` (WRITE) — Upload an image/video/document to LinkedIn from a URL (the server fetches it) or a base64 blob, and get back a media_id to pass into queue_linkedin_post.media_ids (or update_linkedin_post).
- `create_outreach` (WRITE) — Perform an outbound outreach / social action AS the connected account, on the channel that handles the action (today: LinkedIn).

### Account

- `get_me` (read) — Get the calling user identity: Clerk user id, email, name, org membership, roles.
- `get_org` (read) — Get the current organisation: id, name, slug, subscription tier, member limits.
