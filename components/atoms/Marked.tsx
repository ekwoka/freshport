/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import Markdown, { MarkdownToJSX } from 'https://esm.sh/markdown-to-jsx@7.1.7';

export const Marked = ({ content }: { content: string }): h.JSX.Element => (
  <Markdown options={formatMarkdownOptions()}>{content}</Markdown>
);

const markdownStyle: MarkdownStyles = {
  h1: 'text-5xl font-semibold tracking-widest opacity-70',
  h2: 'text-4xl font-medium tracking-wide',
  h3: 'text-3xl tracking-wide',
  h4: 'text-2xl tracking-wide',
};

type MarkdownStyles = {
  [key: string]: string;
};

const formatMarkdownOptions = (): MarkdownToJSX.Options => ({
  wrapper: ({ children }) => (
    <div class={tw`flex flex-col gap-2`}>{children}</div>
  ),
  overrides: stylesToOverrides(markdownStyle),
});

const stylesToOverrides = (styles: MarkdownStyles) => {
  const overrides = Object.entries(styles).map(([el, className]) => [
    el,
    classToOverride(className),
  ]);
  return Object.fromEntries(overrides);
};

const classToOverride = (className: string): MarkdownToJSX.Override => ({
  props: {
    class: tw(className),
  },
});
