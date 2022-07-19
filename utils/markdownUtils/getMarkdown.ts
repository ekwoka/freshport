import { join } from 'https://deno.land/std@0.147.0/path/mod.ts';

export const getMarkdown = (filename: string): Promise<string> => {
  return Deno.readTextFile(
    join('.', 'markdown', ...filename.split('/'))
  );
};
