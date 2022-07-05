/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import Topography from './atoms/Topography.tsx';

export default function Hero() {
  return (
    <section class={tw`prose relative min-w-full overflow-hidden dark:prose-dark px-4 flex min-h-screen w-full items-center justify-center`} id='hero'>
      <Topography />
      <div class={tw`absolute inset-x-0 -inset-y-64 bg-gradient-to-t from-transparent via-gray-50/90 to-transparent dark:via-gray-900/90`}></div>
      <h1 class={tw`z-10 mx-auto max-w-screen-sm bg-gradient-to-tl from-blue-700 to-blue-400 bg-clip-text dark:from-blue-500 dark:to-blue-200 md:text-center text-6xl tracking-wide text-gray-800`}>
        Eric Kwoka is a<span class={tw`text-transparent font-semibold`}> Full-Stack </span>
        Engineer and User Experience
        <span class={tw`text-transparent font-semibold`}> Professional</span>.
      </h1>
    </section>
  );
}
