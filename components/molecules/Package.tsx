import { ExtLink, Marked, SimpleButton } from 'atoms';
import { ArrowTopRightOnSquareMiniSolid, FolderOpenSolid } from '@heroicons';
import { PackageData } from 'utils/markdownUtils/index.ts';
import { Badges } from '../atoms/Badges.tsx';

export const Package = ({ details, body, id }: PackageData) => {
  return (
    <div class="relative overflow-hidden">
      <div class="relative flex flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <h3 class="mx-auto max-w-prose">
          <span class="block text-center text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Package
          </span>
          <span class="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight sm:text-4xl">
            {details.name}
          </span>
        </h3>
        <div class="mx-auto flex w-full flex-row items-center justify-center gap-4">
          <SimpleButton href={`/packages/${id}`}>More Info</SimpleButton>
          <ExtLink href={`https://npmjs.org/package/${details.npm_name}`}>
            npmjs
            <ArrowTopRightOnSquareMiniSolid class="h-4 w-4" />
          </ExtLink>
          <ExtLink href={`https://${details.repo}`}>
            View Repo
            <FolderOpenSolid class="h-4 w-4" />
          </ExtLink>
        </div>
        <Marked content={body[0]} />
        {details.badges && (
          <Badges package={details.npm_name} badges={details.badges} />
        )}
      </div>
    </div>
  );
};
