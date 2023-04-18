import { Track } from '@ekwoka/spotify-api';
import { Topography } from 'patterns';
import { CurrentlyPlaying, ScrollIndicator } from 'atoms';

export const Hero = ({ currentlyPlaying }: { currentlyPlaying?: Track }) => {
  return (
    <section
      class="relative flex min-h-screen w-full min-w-full items-center justify-center overflow-hidden px-4 dark:bg-gray-900 dark:text-gray-100"
      id="hero">
      <Topography />
      <div class="absolute -inset-y-64 inset-x-0 bg-opacity-90 bg-gradient-to-t from-transparent via-gray-50 to-transparent dark:via-gray-900"></div>
      <h1 class="z-10 mx-auto max-w-screen-sm bg-gradient-to-tl from-blue-700 to-blue-400 bg-clip-text text-4xl leading-snug tracking-wide dark:from-blue-500 dark:to-blue-200 md:text-center md:text-6xl">
        Hi, I'm
        <span class="font-semibold text-transparent"> Eric Kwoka</span>. I am a
        <span class="font-semibold text-transparent"> Full-Stack </span>
        Engineer and User Experience
        <span class="font-semibold text-transparent"> Professional </span>
      </h1>
      {currentlyPlaying && <CurrentlyPlaying track={currentlyPlaying} />}
      <ScrollIndicator target="/#skills" />
    </section>
  );
};
