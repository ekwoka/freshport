export const classNames = (...args: (string | undefined)[]): string => {
  return args.filter(Boolean).join(' ');
};
