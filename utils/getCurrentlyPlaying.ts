import {
  refreshToken,
  spotifyApiClient,
  currentlyPlayingTrack,
  Track,
} from '@ekwoka/spotify-api';

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
