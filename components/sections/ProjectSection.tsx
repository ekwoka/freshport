/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';

import { Section } from 'atoms';
import { AnyData } from 'utils/markdownUtils/index.ts';

export const ProjectSection = <T extends AnyData>({
  projects,
  style = 'column',
  id,
  as,
}: ProjectSectionProps<T>): h.JSX.Element => {
  return (
    <Section id={id}>
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
  id: string;
  projects: T[];
  style?: 'column' | 'grid';
  as: (props: T) => h.JSX.Element;
};
