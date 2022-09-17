import { JSX } from "preact/jsx-runtime";

export const ExtLink = ({ children, ...props }: ButtonProps) => (
  <a
    type="button"
    class="inline-flex items-center gap-2 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    target="_blank"
    {...props}>
    {children}
  </a>
);

type ButtonProps = {
  // deno-lint-ignore no-explicit-any
  [key: string]: any;
};
