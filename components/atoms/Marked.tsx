import { tw } from 'twind';
import Markdown, { MarkdownToJSX } from 'https://esm.sh/markdown-to-jsx@7.1.7';
import { CodeBlock, PreCodeBlock } from './CodeBlock.tsx';

export const Marked = ({ content }: { content: string }) => (
  <Markdown options={formatMarkdownOptions()}>{content}</Markdown>
);

const markdownStyle: MarkdownStyles = {
  h1: 'text-5xl font-semibold tracking-widest opacity-70',
  h2: 'text-4xl font-medium tracking-wide mt-8 mb-4',
  h3: 'text-3xl tracking-wide',
  h4: 'text-2xl tracking-wide',
  a: 'text-blue-600 dark:text-blue-400 underline',
  ul: 'border-l-4 border-blue-600 dark:border-blue-400 ml-2 py-2 my-2',
  li: 'list-disc ml-6',
  blockquote:
    'border-l-4 border-blue-600 dark:border-blue-400 pl-4 my-2 py-2 text-gray-600 dark:text-gray-400',
  pre: 'border-l-4 border-blue-600 dark:border-blue-400 pl-4 my-2 py-2 text-gray-600 dark:text-gray-400 whitespace-pre-wrap',
  code: 'text-sm',
  p: 'tracking-wide leading-relaxed text-lg',
};

const markdownProps: { [key: string]: { [key: string]: string } } = {
  a: {
    target: '_blank',
  },
};

type MarkdownStyles = {
  [key: string]: string;
};

const formatMarkdownOptions = (): MarkdownToJSX.Options => ({
  wrapper: ({ children }) => (
    <div class="mx-auto flex max-w-prose flex-col gap-2">{children}</div>
  ),
  overrides: {
    ...stylesToOverrides(markdownStyle, markdownProps),
    pre: {
      component: PreCodeBlock,
    },
  },
});

const stylesToOverrides = (
  styles: MarkdownStyles,
  props: { [key: string]: { [key: string]: string } }
) => {
  const overrides = Object.entries(styles).map(([el, className]) => [
    el,
    classToOverride(className, props[el]),
  ]);
  return Object.fromEntries(overrides);
};

const classToOverride = (
  className: string,
  props: { [key: string]: string } = {}
): MarkdownToJSX.Override => ({
  props: {
    ...props,
    class: tw(className),
  },
});
