import { SimpleButton } from './SimpleButton.tsx';

export const ExtLink = ({ children, ...props }: ButtonProps) => (
  <SimpleButton target="_blank" {...props}>
    {children}
  </SimpleButton>
);

type ButtonProps = {
  // deno-lint-ignore no-explicit-any
  [key: string]: any;
};
