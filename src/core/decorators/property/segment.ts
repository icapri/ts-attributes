import { Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Checks whether the value of the property is within the determined segment.
 *
 * @param from Contains the lower border of the segment.
 * @param to Contains the upper border of the segment.
 * @param including Contains whether to allow the values of the borders.
 * @returns a property decorator which makes sure the value of the property
 * is within the determined borders.
 */
export function segment(from: number, to: number, including = true): PropertyAnnotator<Nullish<number>> {
  if (from > to || (from === to && !including)) {
    const borders = `${including ? '[' : '('}${from}, ${to}${including ? ']' : ')'}`;
    throw new Error(`The segment ${borders} is not valid.`);
  }

  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue: any = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isNumber(nextValue)) {
          throw new Error(`Value of '${propertyKey}' is not a valid number. (${target.constructor.name})`);
        }

        if (Validator.isNullOrUndefined(nextValue)) {
          currentValue = nextValue;
          return;
        }

        if (including && (nextValue < from || nextValue > to)) {
          throw new Error(
            `Value of '${propertyKey}' is not a number between ${from} and ${to} incl. them. (${target.constructor.name})`,
          );
        }

        if (!including && (nextValue <= from || nextValue >= to)) {
          throw new Error(
            `Value of '${propertyKey}' is not a number between ${from} and ${to}. (${target.constructor.name})`,
          );
        }

        currentValue = nextValue;
      },
      get: () => currentValue,
    });
  };
}
