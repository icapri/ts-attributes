import { PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Makes the given property read-only.
 *
 * @returns the property decorator which makes the given property read-only.
 */
export function readOnly(): PropertyAnnotator {
  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue: T[K] = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if (Validator.isDefined(currentValue)) {
          throw new Error(`Cannot assign to '${propertyKey}' because it is a read-only property. (${target.constructor.name})`);
        }

        currentValue = nextValue;
      },
      get: () => currentValue,
    });
  };
}
