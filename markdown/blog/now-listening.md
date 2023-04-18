---
title: Adding a Spotify Widget to your Portfolio
image: now-listening-1.png
tags: spotify, preact, deno
---

Most portfolios are simple static sites: everything is the same for everyone accessing, every time (between content updates anyway). There just often isn't any need to, or real benefit from implementing your portfolio in a way that uses more dynamic sources.

This leaves a bit of a gap in how your portfolio itself can demonstrate your abilities. One nice little touch I found I could add to my portfolio was a little "Currently Listening" widget, that, if I'm listening on Spotify, displays the song I'm listening to.

In this article I'll take you through how I implemented this on my portfolio, to inspire how you could implement a similar widget on yours!

> Note: My portfolio is implemented in Fresh, a fullstack SSR framework built on Preact and Deno. I'll be mainly showing how this widget is implemented in this context, with sample code assuming the same. This should be fairly easily translated to NextJS, React app, Vue, or whatever.

## Getting Access to Spotify

This is honestly the most complicated part of the process. You need register as a developer with Spotify, setup up a development app, enable yourself as a user of the app, and then login to your app as you, to get the `code` to trade for a `refresh_token`.

Quite a few steps. They can be pretty straightforward once you know what your goal is, but it can be a bit daunting when first looking.

### Making Development App

1. The first step is to head over to [Spotify Developer](https://developer.spotify.com/dashboard/) and login with your Spotify account.
2. Just click the big `Create App` button and give your app a name.
3. You'll be taken to the App dashboard and here you can get your `Client ID` and `Client Secret` which we will need for later steps. Get those and write them down.
   ![View of Spotify Client ID and Secret](now-listening-2.png)
4. An important thing that may not be clear here is that you need to click on the `users and access` button and add your own email as an approved user of the application.
5. Click on the `Edit settings` button and move down to the `Redirect URIs`. Add an URI like `http://localhost:3000/`. I'll just assume this is the one you chose for later steps. This provides security that only certain sites can potentially get access to any returned codes or tokens.

### Logging into Development App

Here's where I can really help you along in the process. I've been working on my own [Spotify API](/packages/spotify-api) wrapper package.

We can use the helper functions I provide to make logging and getting our `refresh_token` quite simple.

This doesn't need to be done in your project, you can just use a little file and write and run it as we need to.

So, first step: Install the tool...

```sh
/** @bash */
pnpm add @ekwoka/spotify-api
```

and in a JavaScript or TypeScript file...

```ts
/** @typescript */
// index.ts
import { makeAuthUrl } from '@ekwoka/spotify-api';

const CLIENT_ID = 'Paste Client ID Here';

const loginURL = makeAuthUrl(
  ['user-read-currently-playing'],
  CLIENT_ID,
  'http://localhost:3000'
);

console.log(loginURL);
```

Now we can just run it...

```sh
/** @bash */
bun run index.ts
```

and we can take the output, which will look something like `https://accounts.spotify.com/authorize?...` and paste that into the browser. We'll be taken to a confirmation page on Spotify where we can login to Spotify if need be and authorize the application to access our account data.

This will, after successful authorization, redirect us to `http://localhost:3000/?code=...`. Just copy the URL and we can put it into our code below...

```ts
/** @typescript */
// index.ts
import { tokensFromCode } from '@ekwoka/spotify-api';

const code = 'Paste URL Here'.split('=')[1];
const CLIENT_ID = 'Paste Client ID Here';
const CLIENT_SECRET = 'Paste Client Secret Here';

const { refresh_token } = await tokensFromCode(code, CLIENT_ID, CLIENT_SECRET);

console.log(refresh_token);
```

Run this just as before and out should pop your `refresh_token`.

You'll want to add this, the `client_id`, and `client_secret` to your environment variables on your actual portfolio project. These will be used to access your currently playing track for display on your site. I do it as follows to the `.env` file:

```yaml
/** @yaml */
REFRESH_TOKEN=...
SPOTIFY_CLIENT=...
SPOTIFY_SECRET=...
```

## Building Widget

These next steps will differ quite a bit by the various setups you may use for generating your portfolio, but one thing I will be clear about is that you will need to do these steps server side. If you do this on the client side you are giving any visitors information that they should not have!! We'll be using both the `SPOTIFY_SECRET` and an `access_token` that should not be exposed to anyone.

### Getting Currently Playing Track

So, in my case, I'm building this into a pure Server-Side Rendered portfolio. This means no clientside JavaScript. So I need to get the current track while processing the request to render the HTML. For other systems, you can create a serverless function (like Netlify Functions, or Lambda) or even a persistent backend to handle returning this information. I'll show how I did it in Fresh.

First we'll make a function that just does all the fetching of the track. This could be partially abstracted, but it's pretty simple and focused as is. If you're wanting to have multiple pieces of data to get for a more advanced widget, you can structure it differently, but I just used this one function.

```ts
/** @typescript */
// getCurrentlyPlaying.ts

import {
  refreshToken,
  spotifyApiClient,
  currentlyPlayingTrack,
  Track,
} from '@ekwoka/spotify-api';

export const getCurrentlyPlaying = async () => {
  try {
    const { access_token } = await refreshToken(
      Deno.env.get('REFRESH_TOKEN') as string,
      Deno.env.get('SPOTIFY_CLIENT') as string,
      Deno.env.get('SPOTIFY_SECRET') as string
    );

    const { item } = await spotifyApiClient(token)(currentlyPlayingTrack());

    return item;
  } catch {
    return null;
  }
};
```

Here we trade our `REFRESH_TOKEN` for a new `access_token`. This `access_token` expires in one hour so we will need to do this process at least that often to keep getting the track.

So we pass in our `REFRESH_TOKEN` as well as our `CLIENT` and `SECRET` data. These actually can be inferred from the environment variables directly if you want to let the magic happen, but since Deno doesn't have the `process.env` to access, we'll just pass it explicitely.

If there's any issue fetching the song or token (like we aren't actually listening to anything, for instance) we will just return `null` and show nothing. It's an easy fallback.

### Passing Track to the View

In Fresh, we have the option to [attach `handler` functions](https://fresh.deno.dev/docs/getting-started/custom-handlers) to the Route components. This is similar to `getServerProps` in Nextjs. Any framework that allows serverside rendering has this. Alternatively, you can make an API route that handles this. But we'll just attach this to the main `index.tsx` route to render this in the `Hero` component.

```ts
/** @typescript */
// index.tsx
export const handler = async (
  _req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const currentlyPlaying = getCurrentlyPlaying();
  const body = getAllContent();
  return ctx.render({
    body: await body,
    currentlyPlaying: await currentlyPlaying,
  });
};
```

This is simple and just gets the song as well as loading our page content markdown files, and then passes them to the page component:

```tsx
/** @tsx */
// index.tsx
export default function Home({
  data: {
    body: content,
    currentlyPlaying,
  },
}: PageProps) {
  return (
    <>
      <Hero currentlyPlaying={currentlyPlaying} />
      {...}
    </>
  )
}
```

Where it then evently gets passed to a component to render the thing!

```tsx
/** @tsx */
// CurrentlyPlaying.tsx
import { Track } from '@ekwoka/spotify-api';

export const CurrentlyPlaying = ({ track }: { track: Track }) =>
  track ? (
    <div class="absolute inset-x-8 top-8 z-10 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 bg-opacity-70 shadow backdrop-blur-[2px] backdrop-filter dark:bg-gray-800 dark:bg-opacity-70 sm:inset-x-20 md:bottom-12 md:left-auto md:right-8 md:top-auto md:flex">
      <img
        src={
          (
            track.album.images.find((img) => img.width === 300) ??
            track.album.images[0]
          ).url
        }
        class="hidden h-16 w-16 md:block"
      />
      <div class="flex flex-row flex-wrap items-center justify-center gap-x-4 px-4 py-1 leading-tight text-gray-800 dark:text-gray-200  md:flex-col">
        <span class="shrink-1 min-w-min grow-0 text-center text-sm text-green-600 dark:text-green-400">
          Currently Listening:
        </span>
        <span
          class="grow-1 shrink-0 overflow-hidden text-center"
          style={{
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': '2',
          }}>
          {track.name.split(/\s[\(|-]/)[0]} - {track.artists[0].name}
        </span>
      </div>
    </div>
  ) : (
    <></>
  );
```

Now, Tailwind can get pretty wild if you arent' used to it, but this basically gives us a small little bar at the top of our `Hero` on mobile...

![Mobile View of Widget](now-listening-3.png)

...and a bit a of a larger widget to the bottom-right on larger screens.

![Desktop view of widget](now-listening-1.png)

Some tricks of note here:

```tsx
/** @tsx */
<img
  src={
    (
      track.album.images.find((img) => img.width === 300) ??
      track.album.images[0]
    ).url
  }
  class="hidden h-16 w-16 md:block"
/>
```

Here we are selecting the image with `300` width. Our display is somewhat small, and the we don't want the teeny tiny thumbnail to be used, nor the way too large one. We want one with some room for high density displays. Most of the time, this will just be the image at index `1` but just in case a track doesn't have it, we can default to the largest image (at index `0`).

```tsx
/** @tsx */
<span
  class="grow-1 shrink-0 overflow-hidden text-center"
  style={{
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
  }}>
  {track.name.split(/\s[\(|-]/)[0]} - {track.artists[0].name}
</span>
```

This uses some styling as well as a `split` to help ensure the display of our track isn't too crazy. Some songs have hyphens to refer to different versions, or parentheticals to add more information like featured artists, and these can make the some displays wonky at best. Additionally, we want the display of particularly long song/artist strings to be truncated to only 2 lines.

### Caching

Now, making these 2 round trips to Spotify (one for the `access_token` and the second for the track itself) can make these requests take a bit longer, but we don't really need to do both of these on every request. For starters we might be rate limited by Spotify, but also we just don't really need the site to update the moment we change songs.

So we can cache the song for a few minutes and just use the cached song on subsequent requests.

```ts
/** @typescript */
// getCurrentlyPlaying.ts

let currentTrack: Track | null = null;

export const getCurrentlyPlaying = async () => {
  if (currentTrack) return currentTrack;
  try {
    // ...

    const { item } = await spotifyApiClient(token)(currentlyPlayingTrack());
    currentTrack = item;
    setTimeout(() => (currentTrack = null), 1000 * 60 * 3);

    return item;
  } catch {
    return null;
  }
};
```

Here, we check if the track has been cached, and return it, while after getting the current track, we cache it and set a timeout to clear the cache in 3 minutes. So even under heavy traffic, we won't make that request to Spotify at most every 3 minutes, or at least per edge node handling our requests.

With Deno deploy, these handlers are all run on the edge, so different regions will access different servers, and they will spin up and shut down as appropriate. If nobody accesses the site for a few minutes, it'll shut down until the next request. So the cache may actually still live longer than the server, but this is abount improvements under load, not necessarily for slow days.

We can similarly cache the `access_token` for up to 60 minutes!

```ts
/** @typescript */
// getCurrentlyPlaying.ts

let currentTrack: Track | null = null;
let token: string | null = null;

export const getCurrentlyPlaying = async () => {
  if (currentTrack) return currentTrack;
  try {
    if (!token) {
      const { access_token } = await refreshToken(
        Deno.env.get('REFRESH_TOKEN') as string,
        Deno.env.get('SPOTIFY_CLIENT') as string,
        Deno.env.get('SPOTIFY_SECRET') as string
      );
      token = access_token;
      setTimeout(() => (token = null), 1000 * 60 * 30);
    }

    const { item } = await spotifyApiClient(token)(currentlyPlayingTrack());
    currentTrack = item;
    setTimeout(() => (currentTrack = null), 1000 * 60 * 3);

    return item;
  } catch {
    return null;
  }
};
```

Here we only refetch an `access_token` if one doesn't already exist, and assign it to the cache, while setting it to expire in 30 minutes.

Overall this is a simple solution to add a little bit of personality and dynamicness to an otherwise static experience.
