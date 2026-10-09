# n8n-nodes-cowork

n8n credential and node for **Cowork** (CSMS, `https://co-workspace.collect.vn`). Each n8n user connects their own Cowork account, and every call runs with that account's permissions and data scope.

## Installation

In n8n: **Settings → Community Nodes → Install**, then enter `n8n-nodes-cowork`. See the [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/).

## Credentials

**Cowork API**

1. In Cowork, open **Settings → Security → MCP Tokens** and click **Create**. Pick a label (for example `n8n`) and a TTL (up to 365 days). Copy the token, which starts with `csms_mcp_`. It is shown only once.
2. In n8n, create a **Cowork API** credential and paste the token. Leave **Base URL** as `https://co-workspace.collect.vn` unless you use another workspace.
3. Click **Test**. A wrong or revoked token reports `Unauthorized`.

The credential also works in the built-in **HTTP Request** node. Set **Authentication** to *Predefined Credential Type* and choose **Cowork API**.

When the token expires, create a new one in Cowork and update the credential. To revoke access, revoke the token in Cowork.

## Operations

| Resource | Operation | What it does |
|---|---|---|
| Birthday | Get Upcoming | People whose birthday is within N days, counted in Vietnam time. Each person is one item with `name`, `jobTitle`, `bio`, `discordId`, `month`, `day`, `daysUntil` and `profile` (`introduction`, `loves`, `funFacts`). Only active human accounts are returned, full-time by default. |
| Anniversary | Get Upcoming | People whose work anniversary is within N days, counted in Vietnam time from the HR company join date. Same fields and filters as Birthday, plus `joinYear` and `years` (the year count being completed). People without a company join date, or who have not completed a first year, are not returned. |
| Project | Get Many | Projects you can read, newest first. Filter by status (only **Active** by default), **Only Mine** and **Company ID**. With **Return All** on, every page is fetched. |
| Query | Run | Any read-only Cowork query (`my_workload`, `task_list`, `search`, `team_directory`, …) with JSON params. Returns the query's `data` field. |
| Action | Execute | A write action (`tasks.create`, `tasks.move`, …) with a JSON payload. Risky actions return `pending_confirmation` or `pending_approval` instead of executing. |
| Action | Approve Pending | Approve an action that returned `pending_approval`. |

Query names, action codes and payload shapes are defined by Cowork. Unknown names or invalid payloads come back as HTTP 400 with the reason in the error details.

## Compatibility

Built with `@n8n/node-cli` 0.52 and tested on n8n 2.42.5.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
