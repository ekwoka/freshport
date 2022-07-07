import { join } from 'https://deno.land/std/path/mod.ts';

export const getMarkdown = async (filename: string): Promise<string> => {
  const file = await Deno.readTextFile(join('.', 'markdown', filename));
  return file;
};
