import { getMarkdown, asyncMap } from 'utils';

const getDetails = (data: string): ProjectDetails => {
  const metadata = data.match(/---(.*\n)*---/);
  if (!metadata) return nullDetails();
  const details = (metadata[0].match(/(.*):(.*)/g) || []).reduce(
    (obj: ProjectDetails, detail: string) => {
      const [key, value] = detail.split(/\s*:\s*/) as [
        keyof ProjectDetails,
        string
      ];
      /* @ts-ignore-next-line */
      obj[key] = arrayKeys.includes(key) ? value.split(/\s*,\s*/) : value;
      return obj;
    },
    nullDetails()
  );
  return details;
};

const arrayKeys: string[] = ['images', 'core', 'tools'];

const getPreview = (data: string): string => {
  const content = data
    .replace(/---(.*\n)*---/, '')
    .replaceAll(/\[.*\]\(.*\)/g, '')
    .replace(/.*\n/, '');
  const preview = content.substring(0, content.indexOf('\n') - 1);
  return preview.length < 500 ? preview : preview.substring(0, 500);
};

export const getMarkdownDetails = (files: string[]): Promise<ProjectData[]> => {
  return asyncMap(files, async (file): Promise<ProjectData> => {
    const data = await getMarkdown(file);
    return {
      id: file.substring(file.lastIndexOf('/') + 1),
      path: file,
      details: getDetails(data),
      preview: getPreview(data),
      body: data.replace(/---(.*\n)*---/, ''),
    };
  });
};

export type ProjectData = {
  id: string;
  path: string;
  details: ProjectDetails;
  preview: string;
  body: string;
};

type ProjectDetails = {
  title: string;
  repo: string;
  live: string;
  core: string[];
  tools: string[];
  images: string[];
};

const nullDetails = (): ProjectDetails => ({
  title: '',
  repo: '',
  live: '',
  core: [],
  tools: [],
  images: [],
});
