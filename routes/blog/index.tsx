import { HandlerContext, PageProps } from '$fresh/server.ts';
import { ScrollIndicator, Section } from 'atoms';
import { getSectionContent, PackageData } from 'utils/markdownUtils/index.ts';
import { ProjectSection } from 'sections';
import { Package } from 'molecules';
import { Topography } from 'atoms/patterns/Topography.tsx';
import { BlogData } from '../../utils/markdownUtils/getMarkdownDetails.ts';

export const handler = async (
  _req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const content = await getSectionContent<BlogData>('blog', true, Infinity);
  return ctx.render(content);
};

export default function Packages({ data: blogs }: PageProps) {
  return (
    <>
      <Section fullscreen={false}>
        <Topography />
        <div class="absolute -inset-y-64 inset-x-0 bg-opacity-90 bg-gradient-to-t from-transparent via-gray-50 to-transparent dark:via-gray-900"></div>
        <div class="z-10 mx-auto flex h-full max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div class="text-center">
            <h1 class="block text-center text-xl font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              My Blog
            </h1>
            <p class="mt-1 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              It's a Blog
            </p>
            <p class="mx-auto mt-5 max-w-xl text-left text-lg">
              Always be Learning
            </p>
          </div>
        </div>
        <ScrollIndicator target="#blogs" bottomClass="bottom-4" />
      </Section>
      <ProjectSection id="blogs" content={blogs.description}>
        {blogs.items.map((blog: BlogData) => (
          <a href={`/blog/${blog.id}`}>{blog.details.title}</a>
        ))}
      </ProjectSection>
    </>
  );
}
