export const asyncMap = async <T, S>(
  arr: T[],
  fn: (arg0: T) => Promise<S>
): Promise<S[]> => {
  return await Promise.all(arr.map(fn));
};
