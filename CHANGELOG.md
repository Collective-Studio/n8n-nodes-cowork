# Changelog

## 0.3.0

- Anniversary → Get Upcoming: people whose work anniversary (HR company join date) is within N days, with `years`, `joinYear` and the same profile fields as Birthday. Needs the Cowork release that adds the `upcoming_work_anniversaries` query.
- Query → Run lists `upcoming_work_anniversaries`.

## 0.2.0

- Project → Get Many: list projects filtered by status (Active by default), Only Mine and Company ID, with automatic paging. Needs the Cowork release that adds the `statuses` filter to `project_list`.

## 0.1.0

- Cowork API credential (personal MCP token).
- Cowork node: Birthday → Get Upcoming, Query → Run, Action → Execute and Approve Pending.
