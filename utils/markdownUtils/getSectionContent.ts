import { join } from 'https://deno.land/std@0.147.0/path/mod.ts';
import { iterableToArray } from 'utils';
import {
  AnyData,
  getMarkdownDetails,
  SectionData,
} from './getMarkdownDetails.ts';

export const getSectionContent = async <T extends AnyData>(
  sectionName: string
): Promise<SectionContent<T>> => {
  const {
    details: { type },
    body: description,
  } = (await getMarkdownDetails<SectionData>(`${sectionName}.md`))[0];
  const sectionFiles = (
    await iterableToArray(Deno.readDir(join('.', 'markdown', sectionName)))
  ).filter(({ isFile }) => isFile);
  const sectionData = await getMarkdownDetails<T>(
    ...sectionFiles.map(({ name: filename }) => join(sectionName, filename))
  );
  return {
    type,
    description,
    items: await Promise.all(sectionData),
  };
};

type SectionContent<T> = {
  type: string;
  description: string;
  items: T[];
};
