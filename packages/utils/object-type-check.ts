export const objectTypeCheck = <T extends object>(value: object, key: string): value is T => {
  return key in value;
};
