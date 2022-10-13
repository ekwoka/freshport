import { Image, Track } from '@ekwoka/spotify-api';

export const CurrentlyPlaying = ({ track }: { track: Track }) =>
  track ? (
    <div class="absolute inset-x-8 top-8 z-10 flex items-center justify-center overflow-hidden rounded-lg bg-white bg-opacity-30 shadow backdrop-blur-[2px] backdrop-filter dark:bg-black dark:bg-opacity-30 md:fixed md:top-auto md:left-auto md:right-8 md:bottom-12 md:flex">
      <img
        src={
          (
            track.album.images.find((img) => img.width === 300) ??
            track.album.images[0]
          ).url
        }
        class="hidden h-16 w-16 md:block"
      />
      <div class="flex flex-row items-center justify-center gap-x-4 px-4 py-1 leading-tight text-gray-800 dark:text-gray-200  md:flex-col">
        <span class="shrink-1 min-w-min grow-0 text-sm text-green-600 dark:text-green-400">
          Currently Listening:
        </span>
        <span
          class="grow-1 shrink-0 overflow-hidden"
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
