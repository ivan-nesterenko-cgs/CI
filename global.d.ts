declare global {
  interface Number {
    toLocaleString(locales?: "en-US", options?: Intl.NumberFormatOptions): string;
  }

  type Except<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  type PartialRecord<T extends string | number | symbol, K = unknown> = { [key in T]?: K };

  type Optional<T, K = {}> =
    | ({ [key in keyof T]: T[key] } & { [key in keyof K]?: never })
    | ({ [key in keyof T]?: never } & { [key in keyof K]?: K[key] });

  type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

  type DeepRequired<T> = T extends object
    ? {
        [P in keyof T]-?: DeepRequired<T[P]>;
      }
    : T;

  interface String {
    toLowerCase(): Lowercase<string>;

    toLocaleLowerCase(locales?: string | string[]): Lowercase<string>;

    toUpperCase(): Uppercase<string>;

    toLocaleUpperCase(locales?: string | string[]): Uppercase<string>;
  }

  interface ObjectConstructor {
    keys<T extends object>(o: T): (keyof T)[];
    entries<TValue, TKey>(o: Record<TKey, TValue> | ArrayLike<TValue>): [TKey, TValue][];
  }

  interface JSON {
    parse<T = unknown>(text: string, reviver?: (this: unknown, key: string, value: unknown) => unknown): T;
  }
}

export {};
