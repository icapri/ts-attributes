import { PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Checks whether the property has a value set, otherwise throws.
 */
export function required(): PropertyAnnotator {
  return <T extends object, K extends keyof T>(target: T, key: K): void => {
    // get the current value of the property
    let currentValue = target[key];

    Object.defineProperty(target, key, {
      set: (nextValue: any) => {
        if (Validator.isNullOrUndefined(nextValue)) {
          throw new Error(`Property '${key}' is required in ${target.constructor.name}.`);
        }
        currentValue = nextValue;
      },
      get: () => currentValue,
    });
  };
}
