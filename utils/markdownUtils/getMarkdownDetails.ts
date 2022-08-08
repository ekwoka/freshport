import { asyncMap } from 'utils';
import { BADGES } from '../../components/atoms/Badges.tsx';
import { getMarkdown } from './getMarkdown.ts';

const getDetails = <T extends Record<string, unknown>>(data: string): T => {
  const metadata = data.match(/---(.*\n)*---/);
  if (!metadata) return nullDetails() as T;
  const details = (metadata[0].match(/(.*):(.*)/g) || []).reduce(
    (obj: T, detail: string): T => {
      const [key, value] = detail.split(/\s*:\s*/) as [keyof T, string];
      /* @ts-ignore-next-line */
      obj[key] = arrayKeys.includes(key) ? value.split(/\s*,\s*/) : value;
      return obj;
    },
    {} as T
  );
  return details;
};

const arrayKeys: string[] = ['images', 'core', 'tools', 'badges'];

const getPreview = (data: string): string => {
  const content = data
    .replace(/---(.*\n)*---/, '')
    .replaceAll(/\[.*\]\(.*\)/g, '')
    .replace(/.*\n/, '');
  const preview = content.substring(0, content.indexOf('\n') - 1);
  return preview.length < 500 ? preview : preview.substring(0, 500);
};

export const getMarkdownDetails = <T extends AnyData>(
  ...files: string[]
): Promise<T[]> => {
  return asyncMap(files, async (file): Promise<T> => {
    const data = await getMarkdown(file);
    return {
      id: file.substring(file.lastIndexOf('/') + 1),
      path: file,
      details: file.includes('projects/')
        ? getDetails<ProjectDetails>(data)
        : getDetails<PackageDetails>(data),
      preview: getPreview(data),
      body: data.replace(/---(.*\n)*---/, ''),
    } as T;
  });
};

export type AnyData =
  | ProjectData
  | PackageData
  | SectionData
  | ContributionData;

export type ProjectData = MarkdownDetails & {
  details: ProjectDetails;
};

export type PackageData = MarkdownDetails & {
  details: PackageDetails;
};

export type ContributionData = MarkdownDetails & {
  details: ContributionDetails;
};

export type SectionData = MarkdownDetails & {
  details: {
    type: string;
  };
};

type MarkdownDetails = {
  id: string;
  path: string;
  preview: string;
  body: string;
};

export type ProjectDetails = {
  title: string;
  repo: string;
  live: string;
  core: string[];
  tools: string[];
  images: string[];
};

export type PackageDetails = {
  name: string;
  npm_name: string;
  badges: Array<keyof typeof BADGES>;
  repo: string;
};

export type ContributionDetails = {
  project: string;
  title: string;
  git: string;
};

const nullDetails = (): Record<string, unknown> => ({
  title: '',
  repo: '',
  live: '',
  core: [],
  tools: [],
  images: [],
});
