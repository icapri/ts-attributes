import { PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Checks whether the value of the property is a positive integer incl. zero.
 */
export function positiveInteger(): PropertyAnnotator<number> {
  return <T extends object, K extends keyof T>(
    target: T,
    key: K
  ): void => {
    // get the current value of the property
    let currentValue = target[key];

    Object.defineProperty(target, key, {
      set: (nextValue: any) => {
        if (
          !Validator.isNumber(nextValue) ||
          nextValue < 0 ||
          !Number.isInteger(nextValue)
        ) {
          throw new Error(
            `Value of '${key}' should be a positive integer. (${target.constructor.name})`
          );
        }

        currentValue = nextValue as any;
      },
      get: () => currentValue,
    });
  };
}
