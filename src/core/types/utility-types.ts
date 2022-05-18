/**
 * Represents a type which could possibly be null.
 */
export type Nullable<T> = T | null;

/**
 * Represents a type which could possibly be null or undefined.
 */
export type Nullish<T> = T | null | undefined;

/**
 * Represents a positive integer.
 */
export type PositiveInt<N extends number> = number extends N
  ? never
  : `${N}` extends `-${string}` | `${string}.${string}`
  ? never
  : N;

/**
 * Represents the signature of the property decorator.
 */
export type PropertyAnnotator<TPropertyType = any> = <
  T extends object,
  K extends keyof T
>(
  target: T,
  key: T[K] extends TPropertyType ? K : never
) => void;
