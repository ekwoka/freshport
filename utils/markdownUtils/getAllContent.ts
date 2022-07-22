import {
  AnyData,
  ContributionData,
  PackageData,
  ProjectData,
} from './getMarkdownDetails.ts';
import { getSectionContent } from './getSectionContent.ts';

export const getAllContent = async () => {
  const projects = getSectionContent<ProjectData>('projects');
  const packages = getSectionContent<PackageData>('packages');
  const contributions = getSectionContent<ContributionData>('contributions');
  const skills = getSectionContent<AnyData>('skills', false);

  return {
    projects: await projects,
    packages: await packages,
    contributions: await contributions,
    skills: await skills,
  };
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
