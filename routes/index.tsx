/** @jsx h */
import { Fragment, h } from 'preact';
import { HandlerContext, PageProps } from '$fresh/server.ts';
import { Footer, Hero, Skills, Projects } from 'sections';
import { getMarkdownDetails, ProjectData } from 'utils';

export const handler = async (
  _req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const sections = [
    'contributions',
    'packages',
    'projects',
    'skills',
    'projects/spotify',
  ].map(async (fileName) => {
    return [fileName, ...(await getMarkdownDetails([`${fileName}.md`]))];
  });
  const body = Object.fromEntries(await Promise.all(sections));
  return ctx.render({ body });
};

export default function Home({ data }: PageProps) {
  return (
    <Fragment>
      <Hero />
      <Skills content={data.body.skills.body} />
      <Projects
        content={data.body.projects.body}
        projects={
          Object.entries(data.body).filter(([addr]) =>
            addr.includes('projects/')
          ) as [string, ProjectData][]
        }
      />
      <Footer />
    </Fragment>
  );
}
