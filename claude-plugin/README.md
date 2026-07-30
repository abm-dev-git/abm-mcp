# abm.dev Claude Code plugin

Bundles the abm.dev Agent Skill + the MCP connector (OAuth 2.1 remote server at
`https://mcp.abm.dev/mcp`) — installing the plugin wires both; no URL pasting.

```bash
/plugin marketplace add abm-dev-git/abm-mcp
/plugin install abm-dev@abm-dev

# OAuth sign-in happens on first tool use.
```

`skills/abm-dev/SKILL.md` is a mirror of https://abm.dev/abm-dev/SKILL.md,
which is GENERATED from the deployed server's live tool definitions — do not
edit it here. The `sync-plugin-skill` workflow refreshes it daily (or run it
manually from the Actions tab).
