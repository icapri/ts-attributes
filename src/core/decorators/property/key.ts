import { PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Checks whether the property fulfills the criteria for being a key property i.
 * e. is a required property and its value is not writable.
 *
 * @returns the property decorators which makes sure the property is a valid key.
 */
export function key(): PropertyAnnotator {
  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue: any = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if (Validator.isNullOrUndefined(nextValue)) {
          throw new Error(`Property '${propertyKey}' is required. (${target.constructor.name})`);
        }

        if (Validator.isDefined(currentValue)) {
          throw new Error(`Cannot assign to '${propertyKey}' because it is a read-only property. (${target.constructor.name})`);
        }

        currentValue = nextValue;
      },
      get: () => currentValue,
    });
  };
}
