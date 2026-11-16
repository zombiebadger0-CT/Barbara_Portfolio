---
# HOW TO USE THIS TEMPLATE
# 1. Copy this file into docs/api-docs/ and rename it,
#    for example: docs/api-docs/jsonplaceholder-get-post.md
# 2. Fill in every section. Replace anything in <ANGLE BRACKETS>.
# 3. Delete any section that doesn't apply (for example, "Request body"
#    for a GET request), and delete these instruction comments.
#
# Front matter (this block between the --- lines) controls how the
# page appears on the site:
#   title:            The page title shown in the browser tab.
#   sidebar_label:    The shorter name shown in the left sidebar.
#   sidebar_position: The page's order in the sidebar (1 = first).
#   description:      A one-sentence summary used by search engines.
title: <Action> <resource>
sidebar_label: <Short name>
sidebar_position: <number>
description: <One sentence describing what this endpoint does.>
---

# <Action> <resource>

<One or two sentences: what this endpoint does and when a developer would use it.>

```http
<METHOD> <base URL>/<path>/{<path parameter>}
```

## Before you begin

- <Authentication requirements, such as "None" or "Requires an API key in the Authorization header.">
- <Any other prerequisites, such as an existing resource ID.>

## Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `<name>` | <string / integer> | Yes | <What it identifies. Include valid values or ranges.> |

## Query parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `<name>` | <string / integer / boolean> | No | `<default>` | <What it controls.> |

## Request body

<Describe the body, or delete this section for requests that don't send one.>

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `<field>` | <type> | Yes | <Description.> |

## Example request

```bash
curl -X <METHOD> "<full URL with example values>"
```

## Example response

**Status:** `200 OK`

```json
{
  "<field>": "<example value>"
}
```

### Response fields

| Field | Type | Description |
|-------|------|-------------|
| `<field>` | <type> | <What the value means.> |

## Status codes

| Code | Meaning | What to do |
|------|---------|------------|
| `200` | OK. The request succeeded. | — |
| `400` | Bad request. A parameter is missing or invalid. | <How to fix it.> |
| `404` | Not found. No resource matches the ID. | <How to fix it.> |

## Related endpoints

- [<Related endpoint name>](./<file-name>.md)
