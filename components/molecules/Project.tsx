import { getRespSrc, getRespSrcSet } from 'utils';
import { ExtLink, Marked } from 'atoms';
import { SkillsGrid } from 'molecules';
import { ArrowTopRightOnSquareMiniSolid, FolderOpenSolid } from '@heroicons';
import { ProjectData } from 'utils/markdownUtils/index.ts';

export const Project = ({ details, body }: ProjectData) => {
  return (
    <div class="relative overflow-hidden">
      <div class="relative flex flex-col items-center gap-8 px-4 sm:px-6 lg:px-8">
        <h2 class="mx-auto max-w-prose">
          <span class="block text-center text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Project
          </span>
          <span class="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight sm:text-4xl">
            {details.title}
          </span>
        </h2>
        <img
          class="w-full max-w-prose rounded-xl shadow"
          src={getRespSrc(details.images[0])}
          srcset={getRespSrcSet(details.images[0])}
          alt=""
          width={1}
          height={1}
          sizes="65ch"
        />
        <div class="mx-auto flex w-full flex-row items-center justify-center gap-4">
          <ExtLink href={`https://${details.live}`}>
            Live Site
            <ArrowTopRightOnSquareMiniSolid class="h-4 w-4" />
          </ExtLink>
          <ExtLink href={`https://${details.repo}`}>
            View Repo
            <FolderOpenSolid class="h-4 w-4" />
          </ExtLink>
        </div>
        <Marked content={body[0]} />
        <SkillsGrid skills={[...details.core, ...details.tools]} />
      </div>
    </div>
  );
};
