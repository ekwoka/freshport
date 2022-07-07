import { join } from 'https://deno.land/std/path/mod.ts';

export const getMarkdown = (filename: string): string => {
  const decoder = new TextDecoder('utf-8');
  const file = decoder.decode(
    Deno.readFileSync(join('.', 'markdown', filename))
  );
  return file;
};
