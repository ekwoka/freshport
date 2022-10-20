import { join } from 'https://deno.land/std@0.147.0/path/mod.ts';
import { iterableToArray, randomizeArray } from 'utils/index.ts';
import {
  AnyData,
  getMarkdownDetails,
  SectionData,
} from './getMarkdownDetails.ts';

export const getSectionContent = async <T extends AnyData>(
  sectionName: string,
  isDir = true,
  slice = 2
): Promise<SectionContent<T>> => {
  const {
    details: { type },
    body: description,
  } = (await getMarkdownDetails<SectionData>(`${sectionName}.md`))[0];
  if (!isDir)
    return {
      type,
      description,
      items: [],
    };
  const sectionFiles = randomizeArray(
    (
      await iterableToArray(Deno.readDir(join('.', 'markdown', sectionName)))
    ).filter(({ isFile }) => isFile)
  ).slice(0, slice);
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
  description: string[];
  items: T[];
};
