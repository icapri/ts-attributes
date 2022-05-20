import { Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Checks whether the value of the property is a negative integer.
 *
 * @returns the property decorator which makes sure the value of the given property
 * is a negative integer.
 */
export function negativeInteger(): PropertyAnnotator<Nullish<number>> {
  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue: any = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if (!Validator.isNullOrUndefined(nextValue) && (!Validator.isInteger(nextValue) || nextValue >= 0)) {
          throw new Error(`Value of '${propertyKey}' is not a negative integer. (${target.constructor.name})`);
        }

        currentValue = nextValue;
      },
      get: () => currentValue,
    });
  };
}
