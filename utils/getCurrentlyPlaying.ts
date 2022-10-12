import {
  refreshToken,
  spotifyApiClient,
  currentlyPlayingTrack,
  Track,
} from '@ekwoka/spotify-api';

let currentTrack: Track | null = null;

export const getCurrentlyPlaying = async () => {
  if (currentTrack) return currentTrack;
  try {
    console.log('refetching track');
    // deno-lint-ignore no-explicit-any
    (globalThis as any).process = {
      env: {
        SPOTIFY_CLIENT: Deno.env.get('SPOTIFY_CLIENT'),
        SPOTIFY_SECRET: Deno.env.get('SPOTIFY_SECRET'),
      },
    };
    const { access_token } = await refreshToken(
      Deno.env.get('REFRESH_TOKEN') as string
    );
    const client = spotifyApiClient(access_token);
    const { item } = await client(currentlyPlayingTrack());
    currentTrack = item;
    setTimeout(() => (currentTrack = null), 1000 * 60 * 3);
    return item;
  } catch {
    return null;
  }
};
