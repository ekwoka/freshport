/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { ContributionDetails } from 'utils/markdownUtils/index.ts';
import { allSkills } from 'data';
import { classNames } from 'utils';
import { ExternalLinkIcon } from 'heroicons';
import { Marked } from 'atoms';

export const Contribution = ({
  title,
  project,
  git,
  body,
  idx,
  length,
}: ContributionProps): h.JSX.Element => {
  const { Icon, name: projectName } = allSkills[project];
  return (
    <div
      key={title}
      class={tw`${classNames(
        idx === 0 && 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none',
        idx === 1 && 'sm:rounded-tr-lg',
        idx === length - 2 && 'sm:rounded-bl-lg',
        idx === length - 1 && 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none',
        'relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 dark:bg-gray-900'
      )}`}>
      <div>
        <span class={tw`inline-flex items-center gap-2 rounded-lg p-3`}>
          <Icon class={tw`h-6 w-6`} aria-hidden="true" />
          {projectName}
        </span>
      </div>
      <div class={tw`mt-8`}>
        <h3 class={tw`mb-4 text-lg font-medium`}>
          <a href={`https://${git}`} class={tw`capitalize focus:outline-none`}>
            {title}
          </a>
        </h3>
        <Marked content={body} />
      </div>
      <a
        href={`https://${git}`}
        class={tw`absolute top-2 right-2 p-4 text-gray-300 hover:text-gray-400`}
        aria-hidden="true">
        <ExternalLinkIcon class={tw`h-6 w-6`} />
      </a>
    </div>
  );
};

type ContributionProps = ContributionDetails & {
  idx: number;
  body: string;
  length: number;
};
