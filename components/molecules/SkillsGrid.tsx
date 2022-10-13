import { tw } from 'twind';

import { getSkills } from 'data';
import { classNames } from 'utils';

export const SkillsGrid = ({ skills }: SkillsGridProps) => {
  return (
    <ul class="mx-auto grid w-full cursor-default grid-cols-2 items-center justify-center gap-8 px-2 md:grid-cols-6 md:px-0">
      {getSkills(skills).map(({ Icon, name }, i) => (
        <li
          class={classNames(
            'group flex flex-col items-center justify-center gap-4 transition-transform duration-700 hover:scale-110 sm:flex-row',
            i === skills.length - 1 && skills.length % 2
              ? 'col-span-2'
              : 'col-span-1',
            skills.length % 3 && i >= skills.length - (skills.length % 3)
              ? `md:col-span-${Math.floor(6 / (skills.length % 3))}`
              : 'md:col-span-2'
          )}>
          <Icon />
          <span class="text-center text-sm text-gray-700 transition-all duration-700 group-hover:text-base group-hover:text-gray-900 dark:text-gray-400 group-hover:dark:text-gray-100">
            {name}
          </span>
        </li>
      ))}
    </ul>
  );
};

type SkillsGridProps = {
  skills: string[];
};
