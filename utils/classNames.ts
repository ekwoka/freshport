export const classNames = (...args: ClassName[]): string => {
  return args.filter(Boolean).join(' ');
};

type ClassName = string | undefined | false;
