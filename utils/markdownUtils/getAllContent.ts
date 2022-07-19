import { PackageData, ProjectData } from './getMarkdownDetails.ts';
import { getSectionContent } from './getSectionContent.ts';

export const getAllContent = async () => {
  const projects = getSectionContent<ProjectData>('projects');
  const packages = getSectionContent<PackageData>('packages');

  return { projects: await projects, packages: await packages };
};

type Content = {
  contributions: SectionBase & {
    items: Record<string, unknown>[];
  };
  packages: SectionBase & {
    items: PackageData[];
  };
  projects: SectionBase & {
    items: ProjectData[];
  };
  skills: SectionBase;
};

type SectionBase = {
  header: string;
  description: string;
};
