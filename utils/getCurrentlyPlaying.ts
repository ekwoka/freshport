import {
  refreshToken,
  spotifyApiClient,
  currentlyPlayingTrack,
} from '@ekwoka/spotify-api';

export const getCurrentlyPlaying = async () => {
  try {
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
    return item;
  } catch {
    return null;
  }
};
