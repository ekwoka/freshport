---
name: Preact Heroicons
npm_name: preact-heroicons
repo: github.com/ekwoka/react-heroicons/tree/preact-heroicons#readme
badges: version, downloads, size, types
---

The beautiful Heroicons all bundled up as Preact components. Tree-shakable and Typed for use in any Preact project.

This project was a necessity, as the official Heroicons React components are not compatible with Preact typings, and of course also require `preact-compat` which just won't do.

-!-break-!-

This package wraps up all of the wonderful [Heroicons](https://heroicons.com/) into Preact components, with appropriate TypeScript typings. This package is fully treeshakable, so each icon imported is just 200 bytes gzipped! That's practically free!!!

> Note: The official Heroicons package is [here](https://www.npmjs.com/package/@heroicons/react). These work well, but will have conflicts when using Preact and TypeScript.

This package will version match the official `Heroicons` package and documentation. `Preact Heroicons` specific patches will be handled as `rc` releases one patch version ahead of the official package.

## Previewing the Icons

Preview the icons at [heroicons.com](https://heroicons.com/).

## Installation & Usage

First, install this library with your package manager of choice!

```zsh
npm add preact-heroicons
pnpm add preact-heroicons
yarn add preact-heroicons
bun install preact-heroicons
```

> Note: For Deno, you can import from `https://esm.sh/preact-heroicons`

Now you have access to the entire `heroicons` library! They are formatted as [pascal case](https://techterms.com/definition/pascalcase) and have `Solid` (solid format) or `Outline` (outline format) appended at the end based on type.

Mini Icons (Heroicons v2.0) are accessible by appending `MiniSolid` to the name provided on HeroIcons.

```tsx
import { ArchiveBoxSolid } from "preact-heroicons";
import { ArchiveBoxOutline } from "preact-heroicons";
import { ArchiveBoxMiniSolid } from "preact-heroicons";

export const SomeComponent = () => {
  return (
    ...
    <ArchiveBoxSolid className="h-6 w-6 text-gray-500" />
    <ArchiveBoxOutline className="h-6 w-6 text-gray-500" />
    <ArchiveBoxminiSolid className="h-4 w-4 text-gray-500" />
    ...
  )
}
```

> Note: Coloring the icon is done by setting the `color` property with CSS

## Types

The types used to define the Icons come from `preact/jsx`.

As a convenience, the type of the components is provided by importing `HeroIcon` from the main package.

```js
import { HeroIcon } from 'preact-heroicons';

const Icons: HeroIcon[] = [];
```

This can be useful when you want to construct objects containing HeroIcons and want to ensure strict typing.
