import { HandlerContext } from '$fresh/server.ts';
import { ArrowTopRightOnSquareMiniSolid, FolderOpenSolid } from '@heroicons';
import { getMarkdownDetails, PackageData } from 'utils/markdownUtils/index.ts';
import { Badges, ExtLink, Marked, Section } from 'atoms';
import { join } from 'https://deno.land/std@0.147.0/path/mod.ts';

export const handler = async (
  _req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const pkg = await getMarkdownDetails<PackageData>(
    join('packages', `${ctx.params.id}.md`)
  );
  if (!pkg) return ctx.render();
  return ctx.render({ pkg: pkg[0] });
};

export default function PackageById({
  data: { pkg, readme },
}: {
  data: { pkg: PackageData; readme: string };
}) {
  return (
    <Section fullscreen={true}>
      <div class="z-10 mx-auto mb-16 flex h-full max-w-4xl flex-col justify-center gap-8 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div>
          <p class="block text-center text-xl font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Package
          </p>
          <h1 class="mt-1 text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {pkg.details.name}
          </h1>
        </div>
        <div class="mx-auto flex w-full flex-row items-center justify-center gap-4">
          <ExtLink href={`https://npmjs.org/package/${pkg.details.npm_name}`}>
            npmjs
            <ArrowTopRightOnSquareMiniSolid class="h-4 w-4" />
          </ExtLink>
          <ExtLink href={`https://${pkg.details.repo}`}>
            View Repo
            <FolderOpenSolid class="h-4 w-4" />
          </ExtLink>
        </div>
        {pkg.details.badges && (
          <Badges package={pkg.details.npm_name} badges={pkg.details.badges} />
        )}
        <Marked content={pkg.body[1] ?? pkg.body[0]} />
      </div>
    </Section>
  );
}
