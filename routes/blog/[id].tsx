import { HandlerContext } from '$fresh/server.ts';
import { getMarkdownDetails, PackageData } from 'utils/markdownUtils/index.ts';
import { Image, Marked, Section } from 'atoms';
import { join } from 'https://deno.land/std@0.147.0/path/mod.ts';

export const handler = async (
  _req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const pkg = await getMarkdownDetails<PackageData>(
    join('blog', `${ctx.params.id}.md`)
  );
  if (!pkg) return ctx.render();
  return ctx.render(pkg[0]);
};

export default function PackageById({ data: pkg }: { data: PackageData }) {
  return (
    <Section fullscreen={true}>
      <div class="z-10 mx-auto mb-16 flex h-full max-w-4xl flex-col justify-center gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div>
          <p class="block text-center text-xl font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Blog
          </p>
          <h1 class="mt-1 text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {pkg.details.title}
          </h1>
        </div>
        <Image src={pkg.details.image} />
        <Marked content={pkg.body[1] ?? pkg.body[0]} />
      </div>
    </Section>
  );
}
