import { tw } from 'twind';
import { ContributionDetails } from 'utils/markdownUtils/index.ts';
import { allSkills } from 'data';
import { classNames } from 'utils';
import { ArrowTopRightOnSquareMiniSolid } from '@heroicons';
import { Marked } from 'atoms';

export const Contribution = ({
  title,
  icon,
  project,
  git,
  body,
  idx,
  length,
}: ContributionProps) => {
  const { Icon, name: iconLabel } = allSkills[icon ?? project];
  return (
    <div
      key={title}
      class={classNames(
        idx === 0 && 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none',
        idx === 1 && 'sm:rounded-tr-lg',
        idx === length - 2 && 'sm:rounded-bl-lg',
        idx === length - 1 && 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none',
        'relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 dark:bg-gray-900'
      )}>
      <div>
        <span
          class="inline-flex items-center gap-2 rounded-lg p-3 capitalize">
          <Icon class="h-6 w-6" aria-hidden="true" />
          {icon ? project ?? iconLabel : iconLabel}
        </span>
      </div>
      <div class="mt-8">
        <h3 class="mb-4 text-lg font-medium">
          <a
            href={`https://${git}`}
            target="_blank"
            class="capitalize focus:outline-none">
            {title}
          </a>
        </h3>
        <Marked content={body[0]} />
      </div>
      <a
        href={`https://${git}`}
        target="_blank"
        class="absolute top-2 right-2 p-4 text-gray-300 hover:text-gray-400"
        aria-hidden="true">
        <ArrowTopRightOnSquareMiniSolid class="h-6 w-6" />
      </a>
    </div>
  );
};

type ContributionProps = ContributionDetails & {
  idx: number;
  body: string[];
  length: number;
};
