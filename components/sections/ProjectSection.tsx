/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';

import { Marked, Section } from 'atoms';
import { AnyData } from 'utils/markdownUtils/index.ts';

export const ProjectSection = <T extends AnyData>({
  content,
  projects,
  style = 'column',
  as,
}: ProjectSectionProps<T>): h.JSX.Element => {
  return (
    <Section>
      {/* <div class={tw`mx-auto flex max-w-screen-sm flex-col gap-4 px-4 py-8`}>
        <Marked content={content} />
      </div> */}
      <div class={styles[style]()}>{projects.map(as)}</div>
    </Section>
  );
};

const styles = {
  column: () => tw`flex flex-col items-center justify-center gap-12`,
  grid: () =>
    tw`flex flex-col items-center justify-center md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-8 px-20`,
};

type ProjectSectionProps<T> = {
  content: string;
  projects: T[];
  style?: 'column' | 'grid';
  as: (props: T) => h.JSX.Element;
};
