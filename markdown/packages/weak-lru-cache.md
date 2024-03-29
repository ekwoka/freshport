---
name: Weak LRU Cache
npm_name: @ekwoka/weak-lru-cache
repo: github.com/ekwoka/weak-lru-cache
badges: version, downloads, size, types
---

A simple implementation of an LRU cache that expires items with Weak References to allow the cache items to continue to be reused until garbage collected.

Implements the entire `Map` api, allowing easy drop in usage in existing apps using Maps to cache responses.

-!-break-!-

This cache allows for items to be stored and maintained while in use, but also allowing for unused items to be garbage collected after they have been sufficiently pushed out by more recently used items.

## Installation

```bash
pnpm add @ekwoka/weak-lru-cache
```

## Usage

```ts
import WeakLRUCache from '@ekwoka/weak-lru-cache';
// or
import { WeakLRUCache } from '@ekwoka/weak-lru-cache';

const cache = WeakLRUCache<CrazyObjectType>();

cache.set('key', crazyObject);
cache.get('key'); // => crazyObject
```

## What is a Weak LRU Cache?

A Weak LRU Cache is a cache based on the 'Least Recently Used' caching strategy, where cached items are put into a queue, and once they progress out of the queue (like having more items than the cache allows), they are discarged. However, if the item is accessed again while in the cache, it is moved back to the start of the queue, where it can earn some more time to live.

Where the Weak LRU differs is that it uses Weak References to hold items after they have exited the queue. Weak References allow the object to be accessed if needed, but also allow the normal garbage collection system to clean them up if they've become truly unreferenced. This means that if you application is still using the item, even if it has become very old, it will still exist in the cache to be reaccessed by other parts of the application, but once the rest of the application is done with it, it will likely be garbage collected.

## API

The goal is to have the API be nearly identical to that of the native `Map` object, except with the different constructor signature, as well as some unique methods that fit with the goal of the cache.

### Constructor

#### `WeakLRUCache<T>(options?: WeakLRUCacheOptions)`

This function creates the cache object. It accepts the optional argument of cache options, as well a generic type that types the items stored within the cache. The options are as follows:

#### `WeakLRUCacheOptions`

- `size?: number` : The maximum number of items that can be stored in the cache. If this is not provided, the cache will be defaulted to 1000 items. As mentioned, this is a soft limit, and more items may be kept in the cache so long as they are still being used.

### Properties

#### `.size: number`

This property returns the number of items in the cache. This is not the same as the size limit, as it will include items that are still being used, but have not yet been garbage collected.

This property is evaluated lazily, and can return a number higher than the actual number of cached items, since it is possible for cache items to be garbage collected without the cache being aware of it. Most methods accessing data will verify data has not been garbage collected when retrieving data, but this property will not.

```ts
cache.size; // => 1
```

### Methods

#### `.set(key, value)`

```js
.set(key: string, value: T): WeakLRUCache<T>
```

Rather straightforward, this method sets the value of the key in the cache. If the key already exists, it will be overwritten, and moved to the front of the queue. If this causes the cache to exceed the size limit, the oldest item will be replaced with a `WeakRef` to the value and await cleanup.

```ts
cache.set('key', { foo: 'bar' });
```

#### `.get(key)`

```js
.get(key: string): T | undefined
```

This method returns the value of the key in the cache, if it exists. If the value is a `WeakRef`, it will be dereferenced and returned. If the value is not found, `undefined` will be returned. If they key is found, it will be moved to the front of the queue. If the value was await garbage collection (from being outside the size of the cache queue), it will be strong referenced and moved back to the front of the queue.

```ts
cache.get('key'); // => { foo: 'bar' }
```

#### `.peek(key)`

```js
.peek(key: string): T | undefined
```

This is a unique method for this cache that does not exist on the `Map`. This is very similar to the `.get` method, except that it will not move the key to the front of the queue or strongly reference any accessed data. This likely has little benefit in most cases, but does allow you to retrieve a value from the cache without affecting the cache's internal state.

```ts
cache.peek('key'); // => { foo: 'bar' }
```

#### `.has(key)`

```js
.has(key: string): boolean
```

This method returns a boolean indicating if the key exists in the cache. This will not move the key to the front of the queue, or strongly reference any accessed data. One factor of note is that it is possible for this method to return `true` even if the value has been garbage collected, as this is evaluated lazily.

```ts
cache.has('key'); // => true
```

#### `.delete(key)`

```js
.delete(key: string): boolean
```

This method deletes the key from the cache, regardless of it's position in the queue or reference status. This will return a boolean indicating if the key was found and deleted.

```ts
cache.delete('key'); // => true
```

#### `.clear()`

```js
.clear(): void
```

This method clears the cache, removing all items from the queue and expiring all references.

```ts
cache.clear();
```

#### `.keys()`

```js
.key(): IterableIterator<string>
```

This method returns an iterator of all the keys in the cache. This will not move the keys to the front of the queue, or otherwise prevent data from being garbage collected. This will clean the internal list of items as you iterate, ensuring only valid keys are returned.

```ts
for (const key of cache.keys()) console.log(key);
```

#### `.values()

```js
.values(): IterableIterator<T>
```

This method returns an iterator of all the values in the cache. This will not move the keys to the front of the queue, or otherwise prevent data from being garbage collected if you don't hold onto the data itself. This will clean the internal list of items as you iterate, ensuring only valid values are returned.

```ts
console.log([...cache.values()]);
```

#### `.entries()`

```js
.entries(): IterableIterator<[string, T]>
```

This method returns an iterator of all the entries in the cache. This will not move the keys to the front of the queue, or otherwise prevent data from being garbage collected if you don't hold onto the data itself. This will clean the internal list of items as you iterate, ensuring only valid entries are returned.

```ts
for (const [key, value] of cache.entries()) console.log(key, value);
```

#### `[Symbol.iterator]()`

```js
[Symbol.iterator](): IterableIterator<[string, T]>
```

You can also directly iterate over the cache, or pass its contents to things that accept iterables, which is the same as calling `.entries()`.

```ts
new Map(cache);
```

#### `.forEach(callback)`

```js
.forEach(
	callback: (
		value: T,
		key: string,
		cache: WeakLRUCache<T>
	) => void
): void
```

This method allows you to iterate over the cache, and perform an action on each item. This will not move the keys to the front of the queue, or otherwise prevent data from being garbage collected if you don't hold onto the data itself. This will clean the internal list of items as you iterate, ensuring only valid entries are passed to the callback.

```ts
cache.forEach((value, key) => console.log(key, value));
```
