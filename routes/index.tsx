import { HandlerContext, PageProps } from '$fresh/server.ts';
import { Hero, Skills, ProjectSection, Contributions } from 'sections';
import {
  ContributionData,
  getAllContent,
  PackageData,
  ProjectData,
} from 'utils/markdownUtils/index.ts';
import { Package, Project } from 'molecules';
import { getCurrentlyPlaying } from 'utils/getCurrentlyPlaying.ts';
import { SimpleButton } from 'atoms';

export const handler = async (
  _req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const currentlyPlaying = getCurrentlyPlaying();
  const body = getAllContent();
  return ctx.render({
    body: await body,
    currentlyPlaying: await currentlyPlaying,
  });
};

export default function Home({
  data: {
    body: { projects, packages, skills, contributions },
    currentlyPlaying,
  },
}: PageProps) {
  return (
    <>
      <Hero currentlyPlaying={currentlyPlaying} />
      <Skills content={skills.description} />
      <ProjectSection id="projects" content={projects.description}>
        {(projects.items.slice(0, 2) as ProjectData[]).map((project) => (
          <Project key={project.id} {...project} />
        ))}
        <SimpleButton href="/projects">View all projects</SimpleButton>
      </ProjectSection>
      <ProjectSection id="packages" content={packages.description}>
        {(packages.items.slice(0, 3) as PackageData[]).map((pkg) => (
          <Package key={pkg.id} {...pkg} />
        ))}
        <SimpleButton href="/packages">View all packages</SimpleButton>
      </ProjectSection>
      <Contributions
        content={contributions.description}
        items={contributions.items.slice(0, 4) as ContributionData[]}
      />
    </>
  );
}
