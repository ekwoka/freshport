import { Image, Track } from '@ekwoka/spotify-api';

export const CurrentlyPlaying = ({ track }: { track: Track }) =>
  track ? (
    <div class="item-center fixed right-8 bottom-12 z-10 hidden justify-center overflow-hidden rounded-lg shadow md:flex">
      <img
        src={
          (
            track.album.images.find((img) => img.width === 300) ??
            track.album.images[0]
          ).url
        }
        class="h-16 w-16"
      />
      <div class="flex flex-col items-center justify-center bg-white bg-opacity-30 px-4 py-1 leading-tight text-gray-800 backdrop-blur-[2px] backdrop-filter dark:bg-black dark:bg-opacity-30 dark:text-gray-200">
        <span class="text-sm text-green-600 dark:text-green-400">
          Currently Listening:
        </span>
        <span>
          {track.name.split(/\s[\(|-]/)[0]} - {track.artists[0].name}
        </span>
      </div>
    </div>
  ) : (
    <></>
  );
