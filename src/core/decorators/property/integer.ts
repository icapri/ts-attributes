import { Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Checks whether the value of the property is an integer incl. zero.
 *
 * @returns the property decorator which makes sure that the value of the given property
 * is a valid integer.
 */
export function integer(): PropertyAnnotator<Nullish<number>> {
  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue: any = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if ((!Validator.isNullOrUndefined(nextValue) && !Validator.isNumber(nextValue)) || !Number.isInteger(nextValue)) {
          throw new Error(`Value of '${propertyKey}' should be a valid integer. (${target.constructor.name})`);
        }

        currentValue = nextValue;
      },
      get: () => currentValue,
    });
  };
}
