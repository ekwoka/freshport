/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { skills } from 'data';
import { Marked } from 'atoms';
import { getMarkdown } from 'utils';

export const Skills = (): h.JSX.Element => {
  return (
    <section
      class={tw`flex min-h-[50vh] items-center justify-center bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100`}>
      <div class={tw`mx-auto flex max-w-screen-sm flex-col gap-4 px-4 py-8`}>
        <Marked content={getMarkdown('skills.md')} />
        <div
          class={tw`flex w-full flex-row flex-wrap items-center justify-center gap-4`}>
          {skills.map(({ Icon }) => (
            <Icon />
          ))}
        </div>
      </div>
    </section>
  );
};
