import { PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Checks whether the property fulfills the criteria for being a key
 * property i. e. is a required property and its value can only be read.
 */
export function key(): PropertyAnnotator {
  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if (Validator.isNullOrUndefined(nextValue)) {
          throw new Error(`Property '${propertyKey}' is required in ${target.constructor.name}.`);
        }

        if (Validator.isDefined(currentValue)) {
          throw new Error(
            `Cannot assign to '${propertyKey}' because it is a read-only property. (${target.constructor.name})`,
          );
        }
        currentValue = nextValue as any;
      },
      get: () => currentValue,
    });
  };
}
