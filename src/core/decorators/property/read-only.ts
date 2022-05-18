import { PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Sets the descriptor of the property to readonly.
 */
export function readOnly(): PropertyAnnotator {
  return <T extends object>(target: T, propertyKey: keyof T): void => {
    // get the current value of the property
    let currentValue = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if (Validator.isDefined(currentValue)) {
          throw new Error(
            `Cannot assign to '${propertyKey}' because it is a read-only property. (${target.constructor.name})`,
          );
        }
        currentValue = nextValue;
      },
      get: () => currentValue,
    });
  };
}
