import { HandlerContext, PageProps } from '$fresh/server.ts';
import { ScrollIndicator, Section } from 'atoms';
import { getSectionContent, PackageData } from 'utils/markdownUtils/index.ts';
import { ProjectSection } from 'sections';
import { Package } from 'molecules';
import { Topography } from 'atoms/patterns/Topography.tsx';

export const handler = async (
  _req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const content = await getSectionContent<PackageData>(
    'packages',
    true,
    Infinity
  );
  return ctx.render(content);
};

export default function Packages({ data: packages }: PageProps) {
  return (
    <>
      <Section fullscreen={true}>
        <Topography />
        <div class="absolute inset-x-0 -inset-y-64 bg-opacity-90 bg-gradient-to-t from-transparent via-gray-50 to-transparent dark:via-gray-900"></div>
        <div class="z-10 mx-auto mb-16 flex h-full max-w-4xl flex-col justify-center py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="block text-center text-xl font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              My NPM Packages
            </h1>
            <p class="mt-1 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Supporting the Developer Ecosystem
            </p>
            <p class="mx-auto mt-5 max-w-xl text-left text-lg">
              Here's a few of the packages I have released on NPM. Developing
              self-contained code for consumption by others has taught me a lot
              about the importance of intuitive APIs, effective code reuse, and
              quality code.
            </p>
          </div>
        </div>
        <ScrollIndicator target="/packages#packages" />
      </Section>
      <ProjectSection id="packages" content={packages.description}>
        {packages.items.map((pkg: PackageData) => (
          <Package key={pkg.id} {...pkg} />
        ))}
      </ProjectSection>
    </>
  );
}
