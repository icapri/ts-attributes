import { PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Checks whether the value of the property is an integer incl. zero.
 */
export function integer(): PropertyAnnotator<number> {

  return <T extends object, K extends keyof T>(target: T, key: K): void => {
    // get the current value of the property
    let currentValue = target[key];

    Object.defineProperty(target, key, {
      set: (nextValue: any) => {
        if (
          !Validator.isNumber(nextValue) ||
          !Number.isInteger(nextValue)
        ) {
          throw new Error(
            `Value of '${key}' should be an integer. (${target.constructor.name})`
          );
        }

        currentValue = nextValue as any;
      },
      get: () => currentValue,
    });
  };
}
