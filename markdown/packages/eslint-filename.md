---
name: ESLint Filename Enforcement
npm_name: eslint-plugin-filename-export
repo: github.com/ekwoka/eslint-plugin-filename-export
badges: version, downloads, size
---

A simple ESLint plugin to enforce the name of JS and TS module files matching to the names of their exports.

Rules:

- `match-named-export`: Enforces that the filename matches to a named export.
- `match-default-export`: Enforces that filenames match the name of the default export.

-!-break-!-

This plugin enforces that the filename matches to a named export or default export when a name is provided. This can be set to being case sensitive or case insensitive.

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

- `filename-export/match-named-export` - Enforces that the filename matches to a named export.
- `filename-export/match-default-export` - Enforces that filenames match the name of the default export.

These rules ignore index files, test/spec files, and files that have no relevant exports by default. Additionally, files with a default export will be ignored by the `match-named-export` rule.

If you want to add additional filename exemptions, use the ESLint's builting filename overrides.

## Options

Both of these rules have the following available options:

- `casing`:

  - `strict`: Filenames much match in case to the exports
  - `loose`: Filenames do not need to match case (`default`)

- `stripextra`:
  - `true`: Filenames will be stripped of any non-alphanumeric characters (to allow filenames like `great_function.ts` to match `greatfunction`)
  - `false`: Filenames will not be stripped of any extra characters (`default`)

These can be passed as a second item in an array to the rule as follows

```json
"filename-export/match-named-export": [
  "error",
  {
    "casing": "strict",
    "sripextra": true
  }
]
```
