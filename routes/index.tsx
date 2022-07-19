/** @jsx h */
import { Fragment, h } from 'preact';
import { HandlerContext, PageProps } from '$fresh/server.ts';
import { Footer, Hero, Skills, ProjectSection } from 'sections';
import {
  getAllContent,
  PackageData,
  ProjectData,
} from 'utils/markdownUtils/index.ts';
import { Package, Project } from 'molecules';

export const handler = async (
  _req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const body = await getAllContent();
  return ctx.render({ body });
};

export default function Home({
  data: {
    body: { projects, packages, skills },
  },
}: PageProps) {
  return (
    <Fragment>
      <Hero />
      <Skills content={skills.description} />
      <ProjectSection
        content={projects.description}
        projects={projects.items as ProjectData[]}
        as={(project: ProjectData) => <Project key={project.id} {...project} />}
      />
      <ProjectSection
        content={packages.description}
        projects={packages.items as PackageData[]}
        as={(pkg: PackageData) => <Package key={pkg.id} {...pkg} />}
      />
      <Footer />
    </Fragment>
  );
}
