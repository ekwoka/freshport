import {
  AnyData,
  ContributionData,
  PackageData,
  ProjectData,
} from './getMarkdownDetails.ts';
import { getSectionContent } from './getSectionContent.ts';

export const getAllContent = async () => {
  const projects = getSectionContent<ProjectData>('projects', true, 2);
  const packages = getSectionContent<PackageData>('packages', true, 3);
  const contributions = getSectionContent<ContributionData>(
    'contributions',
    true,
    4
  );
  const skills = getSectionContent<AnyData>('skills', false);

  return {
    projects: await projects,
    packages: await packages,
    contributions: await contributions,
    skills: await skills,
  };
};
