import { Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Capitalizes the string value of the property to which this decorator
 * is being applied.
 *
 * @returns the property decorator which capitalizes the string value.
 */
export function uppercase(): PropertyAnnotator<Nullish<string>> {
  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue: any = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isString(nextValue)) {
          throw new Error(`Value of '${propertyKey}' should be a string. (${target.constructor.name})`);
        }

        if (Validator.isString(nextValue)) {
          currentValue = nextValue.toUpperCase();
        } else {
          currentValue = nextValue;
        }
      },
      get: () => currentValue,
    });
  };
}
