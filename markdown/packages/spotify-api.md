---
name: Spotify API
npm_name: @ekwoka/spotify-api
repo: github.com/ekwoka/spotify-api
badges: version, downloads, size, types
---

Born from my own difficulties using other wrapper libraries for Spotify, this library seeks to be the best possible API wrapper.

- 🏷 Types out of the box!
- 🌴 Treeshakeable and composable!
- ⚡️ Improved performance from the intelligent use of caches and batching!
- 🏗 Consistent Behavior through normalized return types!
- 🦕 Supports Deno and Bun out of the box!

-!-break-!-

Born from my own difficulties using other wrapper libraries for Spotify, this library seeks to be the best possible API wrapper.

> NOTE: This library is still very much a work in progress and will be subject to breaking changes and regular updates until this note is removed.

## Why is this good?

- 🏷 Types out of the box!
- 🌴 Treeshakeable and composable!
- ⚡️ Improved performance from the intelligent use of caches and batching!
- 🏗 Consistent Behavior through normalized return types!
- 🦕 Supports Deno and Bun out of the box!

## Installation

Simply install with your favourite flavour of Package Manager

```
/** @bash */
npm add @ekwoka/spotify-api
pnpm add @ekwoka/spotify-api
bun install @ekwoka/spotify-api
yarn add @ekwoka/spotify-api
```

## Usage

To get started, you'll need to import the core client from the package, and initialize it.

```js
/** @javascript */
import { SpotifyApi } from '@ekwoka/spotify-api';

export const client = SpotifyApi('tokenhere');
// client requires an initial token to initialize.
// Initialize client after recieving token from Spotify.
```

This will create the core client structure with which you'll manage and run requests to the Spotify Apis.

To update the token during ongoing usage simply, import and use the `setToken` composable with your client.

```js
/** @javascript */
import { SpotifyApi, setToken } from '@ekwoka/spotify-api';

const client = SpotifyApi('initial_token'); // original token

// after some event, update the token
client(setToken('my_new_token')); // updated token
```

As you'll notice, this is not a method on the client object like many other libraries. This is a composable function. The goal is for all interactions with the client and APIs to be composable functions. This will enable very aggressive tree-shaking to keep minimal clients from shipping lots of unused code, as well as enable code-splitting for larger applications. This should be reflected in a much more modest bundle size for the majority of use cases.
