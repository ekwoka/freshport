import { HandlerContext, PageProps } from '$fresh/server.ts';
import { Section } from "atoms";
import { getAllContent, PackageData } from "utils/markdownUtils/index.ts";
import { ProjectSection } from "sections";
import { Package } from "molecules";
import { Topography } from '../../components/atoms/patterns/Topography.tsx';

export const handler = async (
  _req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const body = await getAllContent();
  return ctx.render({ body });
};

export default function Packages({
  data: {
    body: { packages },
  },
}: PageProps) {
  return (<>
    <Section fullscreen={true}>
      <Topography />
      <div
        class="absolute inset-x-0 -inset-y-64 bg-opacity-90 bg-gradient-to-t from-transparent via-gray-50 to-transparent dark:via-gray-900"></div>
      <div class="mx-auto max-w-4xl py-16 px-4 sm:py-24 mb-16 sm:px-6 lg:px-8 h-full flex flex-col justify-center z-10">
        <div class="text-center">
          <h1 class="block text-center font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 text-xl">
            My NPM Packages
          </h1>
          <p class="mt-1 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Supporting the Developer Ecosystem
          </p>
          <p class="mx-auto mt-5 max-w-xl text-lg text-left">
            Here's a few of the packages I have released on NPM. Developing self-contained code for consumption by others has taught me a lot about the importance of intuitive APIs, effective code reuse, and quality code.
          </p>
        </div>
      </div>
    </Section>
    <ProjectSection
      id="packages"
      content={packages.description}
      projects={packages.items as PackageData[]}
      as={(pkg: PackageData) => <Package key={pkg.id} {...pkg} />}
    />
  </>)
}
