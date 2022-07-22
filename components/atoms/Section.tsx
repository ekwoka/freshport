/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { classNames } from 'utils';

export const Section = ({
  children,
  class: className,
  ...props
}: Section): h.JSX.Element => {
  return (
    <section
      class={tw`${classNames(
        className,
        'flex min-h-[50vh] flex-col items-center justify-center gap-12 bg-gray-100 py-16 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
      )}`}
      {...props}>
      {children}
    </section>
  );
};

type Section = Record<string, unknown> & {
  children: h.JSX.Element | h.JSX.Element[];
  class?: string;
};
