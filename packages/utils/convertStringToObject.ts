export const convertJoinedStringToObject = (keys: string[], value: any) => {
  const result: Record<string, any> = {};
  for (const key of keys) {
    key.split(".").reduce((acc, part, index, arr) => {
      return (acc[part] ??= index === arr.length - 1 ? value : {});
    }, result);
  }
  return result;
};
