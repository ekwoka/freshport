/** @jsx h */
import { Fragment, h } from 'preact';
import { HandlerContext, PageProps } from '$fresh/server.ts';
import { Footer, Hero, Skills } from 'sections';
import { getMarkdown } from 'utils';

export const handler = async (
  _req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const body = {
    skills: await getMarkdown('skills.md'),
  };
  return ctx.render({ body });
};

export default function Home({ data }: PageProps) {
  return (
    <Fragment>
      <Hero />
      <Skills content={data.body.skills} />
      <Footer />
    </Fragment>
  );
}
