import { Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Assures that the string value of the given property represents a valid email address;
 * otherwise an error is thrown.
 *
 * @returns the property decorator which makes sure that the value of the
 * given property is a valid email address.
 */
export function email(): PropertyAnnotator<Nullish<string>> {
  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue: any = target[propertyKey];
    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if (!Validator.isNullOrUndefined(nextValue) && !isEmail(nextValue)) {
          throw new Error(`Value of '${propertyKey}' should be a valid email address. (${target.constructor.name})`);
        }

        currentValue = nextValue;
      },
      get: () => currentValue,
    });
  };
}

/**
 * Checks whether a string is a valid email address.
 *
 * @param value Contains the value to be checked whether it is a valid email.
 */
function isEmail(value: any): value is string {
  if (!Validator.isString(value)) {
    return false;
  }
  return (
    String(value)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null
  );
}
