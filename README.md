# SEOVally MCP Server

Give your AI agent live, actionable SEO data from SEOVally. The SEOVally MCP server lets compatible clients run an audit, retrieve a report, compare domains, and turn findings into prioritized SEO work.

- **Endpoint:** `https://seovally.com/mcp`
- **Transport:** Streamable HTTP (`POST` JSON-RPC 2.0)
- **Authentication:** `Authorization: Bearer svk_...`

## Get an API key

1. Create or sign in to your account at [seovally.com](https://seovally.com).
2. MCP access is available on the Pro and Agency plans. Visit [Plans](https://seovally.com/plans) to check availability.
3. Contact SEOVally through [seovally.com/contact](https://seovally.com/contact) with the email on your account and the name you want for the key (for example, `Cursor production`).
4. Copy the `svk_...` key when it is issued. It is shown only once; save it in your agent client's secret store or an environment variable.

Never commit an API key to Git or paste it into prompts, issues, or shared configuration files. Revoke a key and request a replacement if it is exposed.

## Connect an MCP client

Use your client's remote/Streamable HTTP MCP connection flow and provide:

| Setting | Value |
| --- | --- |
| Server URL | `https://seovally.com/mcp` |
| Authentication header | `Authorization: Bearer ${SEOVALLY_API_KEY}` |
| Protocol | Streamable HTTP |

Store the key outside the configuration file:

```bash
export SEOVALLY_API_KEY='svk_replace_with_your_key'
```

Most MCP clients use a configuration shaped like this. Check your client's documentation for the exact settings screen or file location.

```json
{
  "mcpServers": {
    "seovally": {
      "url": "https://seovally.com/mcp",
      "headers": {
        "Authorization": "Bearer ${SEOVALLY_API_KEY}"
      }
    }
  }
}
```

## Available tools

| Tool | What an agent can do with it | Scope |
| --- | --- | --- |
| `analyze_domain` | Run a fresh audit and receive scores, category results, page facts, issue counts, and priority fixes. | `analyses` |
| `get_priority_fixes` | Get a short, ordered action list for an on-page and AI-search audit. | `analyses` |
| `get_report` | Retrieve the latest stored scorecard for a domain. | `reports` |
| `compare_reports` | Benchmark two to five domains using their stored reports, without starting new audits. | `reports` |
| `list_recent_reports` | Browse recently analyzed domains and their scores. | `reports` |
| `list_crawl_history` | View recent deep-crawl runs for the key owner. | `crawls` |

Key scopes are assigned when a key is issued. A tool that is outside the key's scopes is not listed to the client.

## Good agent prompts

- “Audit `example.com`, then make a three-item implementation plan from the priority fixes.”
- “Compare the stored SEO and AI visibility scores for `example.com`, `competitor.com`, and `anothercompetitor.com`.”
- “Run `get_priority_fixes` for `example.com` and turn each fix into an engineering ticket with acceptance criteria.”
- “List my recent reports and identify domains with an AI visibility score below 60.”

## Test the connection

Replace `svk_...` with your own key. The response should identify the server and its available tools.

```bash
curl https://seovally.com/mcp \
  -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer svk_...' \
  --data '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2025-03-26",
      "capabilities": {},
      "clientInfo": {"name": "my-agent", "version": "1.0"}
    }
  }'
```

Then list the tools allowed by your key:

```bash
curl https://seovally.com/mcp \
  -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer svk_...' \
  --data '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}'
```

## Example tool call

This starts a fresh audit. It can take longer than reading a stored report because SEOVally fetches and evaluates the target site.

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "get_priority_fixes",
    "arguments": {
      "domain": "example.com",
      "max_items": 5
    }
  }
}
```

## Security and limits

- Keys are stored as hashes; the complete key is only displayed at issuance.
- Every call is recorded against the key for operational usage tracking.
- Follow the analysis allowance associated with your SEOVally plan.
- Do not grant a key more scopes than the agent needs.
- Revoke and replace a key immediately if it is exposed.
