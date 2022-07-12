import { join } from 'https://deno.land/std@0.147.0/path/mod.ts';

export const getMarkdown = async (filename: string): Promise<string> => {
  const file = await Deno.readTextFile(
    join('.', 'markdown', ...filename.split('/'))
  );
  return file;
};
