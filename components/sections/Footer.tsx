/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';

export const Footer = (): h.JSX.Element => {
  return (
    <footer class={tw`min-h-[25vh] bg-gray-300 dark:bg-gray-800`}></footer>
  );
};
