/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';

import { ProjectData, getRespSrc, getRespSrcSet } from 'utils';
import { ExtLink, Marked } from 'atoms';
import { ExternalLinkIcon, FolderOpenIcon } from 'heroicons';

export const Project = ({ details, body }: ProjectData): h.JSX.Element => {
  return (
    <div class={tw`relative overflow-hidden py-16`}>
      <div class={tw`relative flex flex-col gap-8 px-4 sm:px-6 lg:px-8`}>
        <div class={tw`mx-auto flex max-w-prose flex-col gap-4`}>
          <h1>
            <span
              class={tw`block text-center text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400`}>
              Project
            </span>
            <span
              class={tw`mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight sm:text-4xl`}>
              {details.title}
            </span>
          </h1>
          <img
            class={tw`w-full rounded-xl shadow`}
            src={getRespSrc(details.images[0])}
            srcset={getRespSrcSet(details.images[0])}
            alt=""
            width={1}
            height={1}
            sizes="65ch"
          />
        </div>
        <div class={tw`flex w-full flex-row items-center justify-center gap-4`}>
          <ExtLink href={details.live}>
            Live Site
            <ExternalLinkIcon class={tw`h-4 w-4`} />
          </ExtLink>
          <ExtLink href={details.repo}>
            View Repo
            <FolderOpenIcon class={tw`h-4 w-4`} />
          </ExtLink>
        </div>
        <Marked content={body} />
      </div>
    </div>
  );
};
