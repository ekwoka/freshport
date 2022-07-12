/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';

import { Marked } from 'atoms';

export const Projects = ({ content }: { content: string }): h.JSX.Element => {
  return (
    <section
      class={tw`flex min-h-[50vh] items-center justify-center bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100`}>
      <div class={tw`mx-auto flex max-w-screen-sm flex-col gap-4 px-4 py-8`}>
        <Marked content={content} />
      </div>
    </section>
  );
};
