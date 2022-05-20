import { PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Checks whether the property has a value other than `null` set; otherwise throws.
 *
 * @returns the property decorator which avoids a `null` value.
 */
export function notNull(): PropertyAnnotator {
  return <T extends object, K extends keyof T>(target: T, key: K): void => {
    // get the current value of the property
    let currentValue = target[key];

    Object.defineProperty(target, key, {
      set: (nextValue: any) => {
        if (Validator.isNull(nextValue)) {
          throw new Error(`Value of '${key}' is null. (${target.constructor.name})`);
        }
        currentValue = nextValue;
      },
      get: () => currentValue,
    });
  };
}
