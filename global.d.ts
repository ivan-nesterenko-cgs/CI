declare global {
  interface Number {
    toLocaleString(locales?: "en-US", options?: Intl.NumberFormatOptions): string;
  }

  type Except<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  type PartialRecord<T extends string | number | symbol, K = unknown> = { [key in T]?: K };

type PartialRecord<K extends keyof any, V = unknown> = { [key in K]?: V };
  
type OR<T, K> =
  | (T & { [P in Exclude<keyof K, keyof T>]?: never })
  | (K & { [P in Exclude<keyof T, keyof K>]?: never });

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
