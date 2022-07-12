export const iterableToArray = async <T>(
  iterable: AsyncIterable<T>
): Promise<T[]> => {
  const array: T[] = [];
  for await (const item of iterable) {
    array.push(item);
  }
  return array;
};
