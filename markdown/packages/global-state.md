---
name: Preact Global State
npm_name: @ekwoka/preact-global-state
repo: github.com/ekwoka/preact-global-state
badges: version, downloads, size, types
---

A simple, lightweight global state manager, now with 100% more Signals!

Perfect for enabling simply access to globally available state from anywhere in your app, only as needed.

-!-break-!-

Preact Global State is a simple state management library for Preact, enabling the sharing of state between components, similar to React's Context API, or other libraries like Redux. The big benefit of Preact Global State over these alternatives is the ease-of use and surgical precision (improved even further with the use of signals instead of classic state).

This project began as a rewrite of `preact-global-state` but has since been dramatically altered and extended. With `2.0.0`, the core utilizes `@preact/signals` (and requires it as a peer). This does increase the overall footprint of adding this to a non-signal project, but reduces the footprint when already using signals.

If you are not using `signals` and just want a global equivalent to `useState`, you can install `1.0.1` instead.

## Installation

```bash
pnpm add @ekwoka/preact-global-state # for signals
pnpm add @ekwoka/preact-global-state@1.0.1  # for non-signals projects
```

## Usage

```ts
const [counter, setCounter] = useGlobalState<number>('my-counter', 0); // (state label: string; initial value?: any)

return (
  <div>
    <button onClick={() => setCounter(1)}> /* directly setting the state Set to 1! */</button>
    <button onClick={() => setCounter((prev) => prev + 1)}> /* using a state function to update the state Increment! */</button>
  </div>
);
```

And in another

```ts
const [counter] = useGlobalState<number>('my-counter', 0);

return (
  <div>
    <p>{counter}</p>
  </div>
);
```

Now both state items will be kept in sync and trigger appropriate rerenders when the state changes.