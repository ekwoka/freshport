import { Track } from '@ekwoka/spotify-api';

export const CurrentlyPlaying = ({ track }: { track: Track }) =>
  track ? (
    <div class="absolute inset-x-8 top-8 z-10 flex items-center justify-center overflow-hidden rounded-lg border border-gray-300 bg-white bg-opacity-70 shadow backdrop-blur-[2px] backdrop-filter dark:border-gray-800 dark:bg-gray-900 dark:bg-opacity-70 sm:inset-x-20 md:top-auto md:left-auto md:right-8 md:bottom-12 md:flex">
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
