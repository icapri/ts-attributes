import { Nullish, PositiveInt, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Floats a number to the given number of decimal digits.
 * @param decimal Contains the number of decimal digits.
 * @returns the rounded number.
 */
export function float<N extends number>(decimal: PositiveInt<N>): PropertyAnnotator<Nullish<number>> {
  return <T extends object, K extends keyof T>(target: T, key: K): void => {
    // get the current value of the property
    let currentValue = target[key];

    Object.defineProperty(target, key, {
      set: (nextValue: any) => {
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isNumber(nextValue)) {
          throw new Error(
            `Value of '${key}' should be a float number with ${decimal} decimal digits. (${target.constructor.name})`,
          );
        }

        if (Validator.isFloat(nextValue)) {
          currentValue = +nextValue.toFixed(decimal) as any;
        } else {
          currentValue = nextValue as any;
        }
      },
      get: () => currentValue,
    });
  };
}
