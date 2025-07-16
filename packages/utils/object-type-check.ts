
export const objectTypeCheck = <T extends object>(value: object, uniqueKey: keyof T): value is T => {
  return uniqueKey in value;
};