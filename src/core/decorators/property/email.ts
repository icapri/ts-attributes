import { Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Checks whether the value of the property is a string which represents a
 * valid email address. If the string is not a valid email address an error
 * is thrown at compile time.
 */
export function email(): PropertyAnnotator<Nullish<string>> {
  return <T extends object, K extends keyof T>(target: T, key: K): void => {
    // get the current value of the property
    let currentValue = target[key];
    Object.defineProperty(target, key, {
      set: (nextValue: any) => {
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isEmail(nextValue)) {
          throw new Error(`Value of "${key}" is not a valid email.`);
        }
        currentValue = nextValue as any;
      },
      get: () => currentValue,
    });
  };
}
