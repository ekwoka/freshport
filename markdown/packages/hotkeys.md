---
name: Easy Hotkeys
npm_name: @ekwoka/hotkeys
repo: github.com/ekwoka/easy-hotkeys
badges: version, downloads, size, types
---

This is a very simple package that allows you to register hotkeys to run functions, or update state easily in response to key presses!

Includes Types, and is fully compatible with Preact/React `useEffect` hooks

-!-break-!-

This is a very simple package that allows you to register hotkeys to run functions easily!

## Installation

```zsh
pnpm add @ekwoka/hotkeys
```

## Usage

```js
hotkeys({
  'ctrl+c': () => console.log('copying!!!'),
  'ctrl+k': openSearchBar,
  'cmd+p': openCommandPalette,
  'cmd+ctrl+alt+shift+u': activateSuperUser,
});
```

The string accepts `ctrl`, `alt`, `cmd`, and `shift` as modifiers, or any combination thereof.

The function also returns a function to unregister the hotkeys.

```js
const unregister = hotkeys({
  'ctrl+c': () => console.log('copying!!!'),
  'ctrl+x': () => unregister(),
});
```

This allows it to be easily used inside `useEffect` for Preact and React to allow easy reactive hotkeys, or cleaning up components registered hotkeys when they are unloaded.

```js
const [counter, setCounter] = useState(0);
useEffect(
  () =>
    hotkeys({
      'ctrl+y': () => setCounter(counter + 1),
    }),
  [counter]
);
```
