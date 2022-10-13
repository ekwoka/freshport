import { skills } from 'data';
import { Marked, Section } from 'atoms';
import { SkillsGrid } from 'molecules';

export const Skills = ({ content }: { content: string }) => {
  return (
    <Section id="skills">
      <div class="mx-auto flex max-w-screen-sm flex-col gap-8 px-4 py-8">
        <h2 class="mx-auto max-w-prose">
          <span class="block text-center text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Most Developed
          </span>
          <span class="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight sm:text-4xl">
            Skills
          </span>
        </h2>
        <Marked content={content[0]} />
        <div class="flex w-full flex-row flex-wrap items-center justify-center gap-4">
          <SkillsGrid skills={skills} />
        </div>
      </div>
    </Section>
  );
};
