export const mapWithFilter = <T, B = T>(
  arr: T[],
  {
    transformCallback,
    filterCallback,
  }: {
    transformCallback?: (item: T) => B;
    filterCallback?: (item: B) => boolean;
  },
): B[] => {
  const results: B[] = [];

  for (const item of arr) {
    const transformed = transformCallback ? transformCallback(item) : (item as unknown as B);

    if (!filterCallback || filterCallback(transformed)) {
      results.push(transformed);
    }
  }

  return results;
};
