import { HandlerContext, PageProps } from '$fresh/server.ts';
import { Footer, Hero, Skills, ProjectSection, Contributions } from 'sections';
import {
  ContributionData,
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
    body: { projects, packages, skills, contributions },
  },
}: PageProps) {
  return (
    <>
      <Hero />
      <Skills content={skills.description} />
      <ProjectSection
        id="projects"
        content={projects.description}
        projects={projects.items as ProjectData[]}
        as={(project: ProjectData) => <Project key={project.id} {...project} />}
      />
      <ProjectSection
        id="packages"
        content={packages.description}
        projects={packages.items as PackageData[]}
        as={(pkg: PackageData) => <Package key={pkg.id} {...pkg} />}
      />
      <Contributions
        content={contributions.description}
        items={contributions.items as ContributionData[]}
      />
      <Footer />
    </>
  );
}
