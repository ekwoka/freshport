import { HandlerContext } from "$fresh/server.ts";
import { ArrowTopRightOnSquareMiniSolid, FolderOpenSolid } from '@heroicons';
import { getAllContent, PackageData } from "utils/markdownUtils/index.ts";
import { Badges, ExtLink, Marked, Section } from "atoms";

export const handler = async (
  _req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const body = await getAllContent();
  const pkg = body.packages.items.find(
    (pkg) => pkg.id === ctx.params.id
  )
  if (!pkg) return ctx.render();
  return ctx.render({ pkg });
};

export default function PackageById({ data: { pkg, readme } }: { data: { pkg: PackageData, readme: string }}) {
  return <Section fullscreen={true}>
    <div class="mx-auto max-w-4xl py-16 px-4 sm:py-24 mb-16 sm:px-6 lg:px-8 h-full flex flex-col justify-center z-10 gap-8">
        <div>
          <p class="block text-center font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 text-xl">
            Package
          </p>
          <h1 class="mt-1 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-center">
            {pkg.details.name}
          </h1>
        </div>
        <div
          class="mx-auto flex w-full flex-row items-center justify-center gap-4">
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
}
