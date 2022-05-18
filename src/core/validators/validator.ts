/**
 * Defines a validator for making a variety of checkings in code.
 */
export abstract class Validator {
  /**
   * Checks whether a given object contains a property with a given key.
   * @param object {object} Contains an object to be checked for a given property.
   * @param key {string | number | symbol} Contains a value to be checked whether it is the key of the given object.
   */
  public static hasProperty<T extends object>(
    object: T,
    key: string | number | symbol
  ): key is keyof T {
    return Object.prototype.hasOwnProperty.call(object, key);
  }

  /**
   * Checks whether the given input parameter has a non-falsy value.
   * @param value Contains the input to be checked whether it represents a non-falsy value.
   * @returns whether the given input parameter has a non-falsy value.
   */
  public static hasValue<T>(value: T | null | undefined): value is T {
    return !Validator.isEmpty(value);
  }

  /**
   * Checks whether the input parameter is an array.
   * @param value Contains the value to be checked whether it is an array.
   */
  public static isArray(value: any): value is Array<any> {
    return Object.prototype.toString.call(value) === "[object Array]";
  }

  /**
   * Checks whether the input parameter is a boolean value.
   * @param value Contains the value to be checked whether it is a boolean value.
   */
  public static isBoolean(value: any): value is boolean {
    return typeof value === "boolean";
  }

  /**
   * Checks whether a given value is a valid date object.
   * @param value Contains the value to be checked whether it is a valid date object.
   */
  public static isDate(value: any): value is Date {
    return (
      Object.prototype.toString.call(value) === "[object Date]" &&
      !isNaN(value.getTime())
    );
  }

  /**
   * Checks whether the input parameter is a defined value.
   * @param value Contains the value to be checked whether it is defined.
   */
  public static isDefined<T>(value: T | undefined): value is T {
    return !Validator.isUndefined(value);
  }

  /**
   * Checks whether a string is a valid email address.
   * @param value Contains the value to be checked whether it is a valid email.
   */
  public static isEmail(value: any): value is string {
    if (!Validator.isString(value)) {
      return false;
    }
    return (
      String(value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) != null
    );
  }

  /**
   * Checks whether the input parameter represents an empty value.
   * @param value Contains the value to be checked whether it represents an empty value.
   * @returns whether the value is empty.
   */
  public static isEmpty<T>(
    value: T | null | undefined
  ): value is null | undefined {
    const isFalsy: boolean =
      Validator.isNullOrUndefined(value) ||
      (Validator.isBoolean(value) && !value);
    const isEmptyString: boolean = Validator.isString(value) && value === "";
    const isEmptyNumber: boolean = typeof value === "number" && isNaN(value);
    const isEmptyArray: boolean =
      Validator.isArray(value) && value.length === 0;
    return (
      isFalsy ||
      isEmptyString ||
      isEmptyNumber ||
      isEmptyArray ||
      Validator.isEmptyObject(value)
    );
  }

  /**
   * Checks whether a given object is empty.
   * @param value Contains the object to be checked whether it is empty.
   * @returns whether the given object is an empty object.
   */
  public static isEmptyObject<T>(
    value: T | null | undefined
  ): value is null | undefined {
    return (
      Validator.isObject(value) &&
      !Object.getOwnPropertyNames(value).length &&
      !Object.getOwnPropertySymbols(value).length
    );
  }

  /**
   * Checks whether a given value is of type float.
   * @param value Contains the value to be checked whether it is a float number.
   * @returns whether the given value is a float number.
   */
  public static isFloat(value: any): value is number {
    return Number(value) === value && value % 1 !== 0;
  }

  /**
   * Checks whether a given value is of type integer.
   * @param value Contains the value to be checked whether it is an integer.
   * @returns whether the given value is an integer.
   */
  public static isInteger(value: any): value is number {
    return Number(value) === value && value % 1 === 0;
  }

  /**
   * Checks whether the input parameter addresses to some object id este ain't null.
   * @param value Contains the value to be checked whether it points somewhere.
   */
  public static isNull(value: any): value is null {
    return value == null;
  }

  /**
   * Checks whether the input parameter is null or not defined.
   * @param value Contains the value to be checked whether it is null or not defined.
   */
  public static isNullOrUndefined(value: any): value is null | undefined {
    return Validator.isNull(value) || Validator.isUndefined(value);
  }

  /**
   * Checks whether the input parameter is null or a string of white spaces.
   * @param value Contains the value to be checked whether it is null a string of white spaces.
   */
  public static isNullOrWhiteSpace(value: any): boolean {
    return (
      Validator.isNullOrUndefined(value) ||
      (Validator.isString(value) && value.trim().length === 0)
    );
  }

  /**
   * Checks whether the input parameter is a number.
   * @param value Contains the value to be checked whether it is a number.
   */
  public static isNumber(value: any): value is number {
    return typeof value === "number" && isFinite(value);
  }

  /**
   * Checks whether the input parameter is an object.
   * @param value Contains the value to be checked whether it is an object.
   */
  public static isObject(value: any): value is object {
    return Object.prototype.toString.call(value) === "[object Object]";
  }

  /**
   * Checks whether the input parameter is a plain object.
   * @param value Contains the value to be checked whether it is a plain object.
   * @returns whether the given input parameter is a plain object.
   */
  public static isPlainObject(value: any): value is object {
    if (!Validator.isObject(value)) {
      return false;
    }
    // check whether the constructor is modified
    const constructor = value.constructor;
    if (Validator.isUndefined(constructor)) {
      return true;
    }
    // check whether the prototype is modified
    const prototype = constructor.prototype;
    if (!Validator.isObject(prototype)) {
      return false;
    }
    // check whether the constructor has an object-specific method
    if (!Validator.hasProperty(prototype, "isPrototypeOf")) {
      return false;
    }
    // most likely now it is a plain object
    return true;
  }

  /**
   * Checks whether a given value is of type string.
   * @param value Contains the value to be checked whether it is a string.
   * @returns whether the given value is a string.
   */
  public static isString(value: any): value is string {
    return typeof value === "string";
  }

  /**
   * Checks whether a given parameter is of type undefined or has no value set.
   * @param value Contains the value to be checked whether it is not defined.
   * @returns whether either the type or the value of the parameter is undefined.
   */
  public static isUndefined(value: any): value is undefined {
    return typeof value === "undefined" || value === undefined;
  }
}
