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
import { CurrentlyPlaying } from 'atoms';

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
      <CurrentlyPlaying track={currentlyPlaying} />
      <Hero />
      <Skills content={skills.description} />
      <ProjectSection
        id="projects"
        content={projects.description}
        projects={projects.items.slice(0, 2) as ProjectData[]}
        as={(project: ProjectData) => <Project key={project.id} {...project} />}
      />
      <ProjectSection
        id="packages"
        content={packages.description}
        projects={packages.items.slice(0, 3) as PackageData[]}
        as={(pkg: PackageData) => <Package key={pkg.id} {...pkg} />}
      />
      <Contributions
        content={contributions.description}
        items={contributions.items.slice(0, 4) as ContributionData[]}
      />
    </>
  );
}
