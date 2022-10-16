import { JSX } from 'preact';
import { tw } from 'twind';
import { classNames } from 'utils/index.ts';
import { SimpleButton } from './SimpleButton.tsx';

export const Section = ({
  children,
  class: className,
  fullscreen,
  id,
  ...props
}: Section) => {
  return (
    <section
      class={classNames(
        className,
        'flex flex-col items-center justify-center gap-12 bg-gray-100 py-16 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
        fullscreen ? 'min-h-screen' : 'min-h-[50vh]'
      )}
      id={id}
      {...props}>
      {children}
    </section>
  );
};

type Section = Record<string, unknown> & {
  children: JSX.Element | JSX.Element[];
  class?: string;
  fullscreen?: boolean;
  id?: string;
};
