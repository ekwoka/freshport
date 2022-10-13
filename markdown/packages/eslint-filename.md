---
name: ESLint Filename Enforcement
npm_name: eslint-plugin-filename-export
repo: github.com/ekwoka/eslint-plugin-filename-export
badges: version, downloads, size
---

A hooks simple ESLint plugin to enforce the name of JS and TS modules matching to the names of their exports.

Rules:

- `match-named-export`: Enforces that the filename matches to a named export.
- `match-default-export`: Enforces that filenames match the name of the default export.

-!-break-!-

This plugin enforces that the filename matches to a named export. This rule ignores index files, spec/test files, types files, and files with no named exports, and currently has no configuration options.

## Installation

Install with your package manager of choice:

```bash
pnpm i -D eslint-plugin-filename-export
```

Add to your ESLint config:

```json
{
  "plugins": ["eslint-plugin-filename-export"],
  "rules": {
    "filename-export/match-named-export": "error",
    "filename-export/match-default-export": "error"
  }
}
```

## Rules

`filename-export/match-named-export` - Enforces that the filename matches to a named export.
`filename-export/match-default-export` - Enforces that filenames match the name of the default export.

These rules ignore index files, test/spec files, and files that have no relevant exports by default. Additionally, files with a default export will be ignored by the `match-named-export` rule.

If you want to add additional filename exemptions, use the ESLint's builting filename overrides.
