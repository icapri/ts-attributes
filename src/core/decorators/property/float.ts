import { PositiveInt, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * 
 * @param decimal 
 * @returns 
 */
export function float<N extends number>(
  decimal: PositiveInt<N>
): PropertyAnnotator<number> {
  return <T extends object, K extends keyof T>(
    target: T,
    key: K
  ): void => {
    // get the current value of the property
    let currentValue = target[key];

    Object.defineProperty(target, key, {
      set: (nextValue: any) => {
        if (!Validator.isNumber(nextValue)) {
          throw new Error(
            `Value of '${key}' should be a float number with ${decimal} decimal digits. (${
              target.constructor.name
            })`
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
