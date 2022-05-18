import { Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Checks whether the value of the property is within the determined segment.
 * @param from Contains the lower border of the segment.
 * @param to Contains the upper border of the segment.
 * @param including Contains whether to allow the values of the borders.
 * @returns a property decorator which makes sure the value of the property
 * is within the determined borders.
 */
export function segment(from: number, to: number, including = true): PropertyAnnotator<Nullish<number>> {
  if (from > to || (from === to && !including)) {
    const borders = `${including ? '[' : '('}${from}, ${to}${including ? ']' : ')'}`;
    throw new Error(`The segment ${borders} is invalid.`);
  }

  return <T extends object, K extends keyof T>(target: T, key: K): void => {
    // get the current value of the property
    let currentValue = target[key];

    Object.defineProperty(target, key, {
      set: (nextValue: any) => {
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isNumber(nextValue)) {
          throw new Error(`Value of '${key}' should be a valid number. (${target.constructor.name})`);
        }

        if (Validator.isNullOrUndefined(nextValue)) {
          currentValue = nextValue as any;
          return;
        }

        if (including && (nextValue < from || nextValue > to)) {
          throw new Error(
            `Value of '${key}' should be a number between ${from} and ${to} including them. (${target.constructor.name})`,
          );
        }

        if (!including && (nextValue <= from || nextValue >= to)) {
          throw new Error(
            `Value of '${key}' should be a number between ${from} and ${to}. (${target.constructor.name})`,
          );
        }

        currentValue = nextValue as any;
      },
      get: () => currentValue,
    });
  };
}
