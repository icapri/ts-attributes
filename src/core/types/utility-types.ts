/**
 * Represents the type of the constructor of an object.
 */
export type ConstructorType<T> = new (...args: any[]) => T;

/**
 * Represents a type which checks for type equality.
 */
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

/**
 * Represents a type whose properties are mutable.
 */
export type Mutable<T> = {
  -readonly [k in keyof T]: T[k];
};

/**
 * Represents a type composed of the writable properties of an object.
 */
export type NonReadonly<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>;
}[keyof T];

/**
 * Represents a type which could possibly be null.
 */
export type Nullable<T> = T | null;

/**
 * Represents a type which could possibly be null or undefined.
 */
export type Nullish<T> = T | null | undefined;

/**
 * Represents a type which consists of the optional properties of a given object.
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never;
}[keyof T];

/**
 * Represents a type composed of the required object properties.
 */
export type PickRequired<T> = Pick<T, RequiredKeys<T>>;

/**
 * Represents a positive integer.
 */
export type PositiveInt<N extends number> = number extends N ? never : `${N}` extends `-${string}` | `${string}.${string}` ? never : N;

/**
 * Represents the signature of the property decorator.
 */
export type PropertyAnnotator<TPropertyType = any> = <T extends object, K extends keyof T>(target: T, key: T[K] extends TPropertyType ? K : never) => void;

/**
 * Represents a type composed of the readonly keys of an object.
 */
export type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>;
}[keyof T];

/**
 * Represents a type which consists of the required properties of an object.
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T];
