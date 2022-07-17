/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';

import { Marked } from 'atoms';
import { Project } from 'molecules';
import { ProjectData } from 'utils';

export const Projects = ({
  content,
  projects,
}: ProjectsProps): h.JSX.Element => {
  return (
    <section
      class={tw`flex min-h-[50vh] flex-col items-center justify-center gap-8 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100`}>
      <div class={tw`mx-auto flex max-w-screen-sm flex-col gap-4 px-4 py-8`}>
        <Marked content={content} />
      </div>
      {projects.map(([_, project]) => (
        <Project key={project.id} {...project} />
      ))}
    </section>
  );
};

type ProjectsProps = { content: string; projects: [string, ProjectData][] };
