/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { ContributionData } from 'utils/markdownUtils/index.ts';
import { Contribution } from 'molecules';
import { Section } from 'atoms';

export const Contributions = ({ items }: ContributionsProps): h.JSX.Element => {
  return (
    <Section class="md:px-8 lg:px-12" id="contributions">
      <h2 class="mx-auto max-w-prose">
        <span class="block text-center text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
          Open Source
        </span>
        <span
          class={tw`mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight sm:text-4xl`}>
          Contributions
        </span>
      </h2>
      <div
        class={tw`mx-auto max-w-screen-md divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow dark:divide-gray-800 dark:bg-gray-800 sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0`}>
        {items.map(({ details, body }, index: number) => (
          <Contribution
            key={details.title}
            {...details}
            body={body}
            idx={index}
            length={items.length}
          />
        ))}
      </div>
    </Section>
  );
};

type ContributionsProps = {
  items: ContributionData[];
  content: string;
};
