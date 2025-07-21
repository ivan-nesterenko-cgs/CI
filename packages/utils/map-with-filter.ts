export const mapWithFilter = <T>(arr: T[], callBack: (item: T) => boolean) => {
  const results: T[] = [];

  for (const item of arr) {
    if (callBack(item)) results.push(item);
  }

  return results;
};
