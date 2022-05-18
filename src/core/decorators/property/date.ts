import { Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Checks whether the property to which this decorator is applied is a
 * valid date object.
 */
export function date(): PropertyAnnotator<Nullish<Date>> {
  return <T extends object, K extends keyof T>(target: T, key: K): void => {
    // get the current value of the property
    let currentValue = target[key];

    Object.defineProperty(target, key, {
      set: (nextValue) => {
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isDate(nextValue)) {
          throw new Error(`Value of '${key}' is not a valid date object.`);
        }
        currentValue = nextValue as any;
      },
      get: () => currentValue,
    });
  };
}
