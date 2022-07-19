/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';

import { ExtLink, Marked } from 'atoms';
import { ExternalLinkIcon, FolderOpenIcon } from 'heroicons';
import { PackageData } from 'utils/markdownUtils/index.ts';

export const Package = ({ details, body }: PackageData): h.JSX.Element => {
  return (
    <div class={tw`relative overflow-hidden`}>
      <div class={tw`relative flex flex-col gap-8 px-4 sm:px-6 lg:px-8`}>
        <h3 class={tw`mx-auto max-w-prose`}>
          <span
            class={tw`block text-center text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400`}>
            Package
          </span>
          <span
            class={tw`mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight sm:text-4xl`}>
            {details.name}
          </span>
        </h3>
        <div
          class={tw`mx-auto flex w-full flex-row items-center justify-center gap-4`}>
          <ExtLink href={`https://${details.npm}`}>
            NPMJS
            <ExternalLinkIcon class={tw`h-4 w-4`} />
          </ExtLink>
          <ExtLink href={`https://${details.repo}`}>
            View Repo
            <FolderOpenIcon class={tw`h-4 w-4`} />
          </ExtLink>
        </div>
        <Marked content={body} />
      </div>
    </div>
  );
};
