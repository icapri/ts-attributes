import { Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Checks whether the property to which this decorator is applied is a valid date
 * object; otherwise an error is thrown.
 *
 * @returns the property decorator which makes sure that a valid date is assigned.
 */
export function date(): PropertyAnnotator<Nullish<Date>> {
  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue: any = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (nextValue) => {
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isDate(nextValue)) {
          throw new Error(`Value of '${propertyKey}' is not a valid date object. (${target.constructor.name})`);
        }
        currentValue = nextValue;
      },
      get: () => currentValue,
    });
  };
}
