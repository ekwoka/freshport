/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { Topography } from 'patterns';

export const Hero = (): h.JSX.Element => {
  return (
    <section
      class={tw`relative flex min-h-screen w-full min-w-full items-center justify-center overflow-hidden px-4 dark:bg-gray-900 dark:text-gray-100`}
      id="hero">
      <Topography />
      <div
        class={tw`absolute inset-x-0 -inset-y-64 bg-opacity-90 bg-gradient-to-t from-transparent via-gray-50 to-transparent dark:via-gray-900`}></div>
      <h1
        class={tw`z-10 mx-auto max-w-screen-sm bg-gradient-to-tl from-blue-700 to-blue-400 bg-clip-text text-6xl leading-snug tracking-wide dark:from-blue-500 dark:to-blue-200 md:text-center`}>
        Hi, I'm
        <span class={tw`font-semibold text-transparent`}> Eric Kwoka</span>. I
        am a<span class={tw`font-semibold text-transparent`}> Full-Stack </span>
        Engineer and User Experience
        <span class={tw`font-semibold text-transparent`}> Professional </span>
      </h1>
    </section>
  );
};
