/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';

import { arrayWrap } from 'utils';

export const ExtLink = ({ children, ...props }: ButtonProps): h.JSX.Element => (
  <a
    type="button"
    class={tw`inline-flex items-center gap-2 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
    target="_blank"
    {...props}>
    {children}
  </a>
);

type ButtonProps = {
  // deno-lint-ignore no-explicit-any
  [key: string]: any;
};
