/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';

import { Marked } from 'atoms';

export const ProjectSection = <T extends unknown>({
  content,
  projects,
  as,
}: ProjectSectionProps<T>): h.JSX.Element => {
  return (
    <section
      class={tw`flex min-h-[50vh] flex-col items-center justify-center gap-12 bg-gray-100 py-12 text-gray-800 dark:bg-gray-900 dark:text-gray-100`}>
      <div class={tw`mx-auto flex max-w-screen-sm flex-col gap-4 px-4 py-8`}>
        <Marked content={content} />
      </div>
      {projects.map(as)}
    </section>
  );
};

type ProjectSectionProps<T> = {
  content: string;
  projects: T[];
  as: (props: T) => h.JSX.Element;
};
