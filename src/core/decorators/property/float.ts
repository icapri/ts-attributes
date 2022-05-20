import { Nullish, PositiveInt, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Rounds a number to the given number of decimal digits.
 *
 * @param decimal Contains the number of decimal digits.
 * @returns the property decorator which rounds the decimal value.
 */
export function float<N extends number>(decimal: PositiveInt<N>): PropertyAnnotator<Nullish<number>> {
  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue: any = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isNumber(nextValue)) {
          throw new Error(`Value of '${propertyKey}' is not a valid number. (${target.constructor.name})`);
        }

        if (Validator.isFloat(nextValue)) {
          currentValue = +nextValue.toFixed(decimal);
        } else {
          currentValue = nextValue;
        }
      },
      get: () => currentValue,
    });
  };
}
