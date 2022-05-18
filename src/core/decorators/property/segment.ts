import { PropertyAnnotator } from "../../types";
import { Validator } from "../../validators";

/**
 * Checks whether the value of the property is within the determined segment.
 * @param from Contains the lower border of the segment.
 * @param to Contains the upper border of the segment.
 * @param including Contains whether to allow the values of the borders.
 * @returns a property decorator which makes sure the value of the property
 * is within the determined borders.
 */
export function segment(
  from: number,
  to: number,
  including = true
): PropertyAnnotator<number> {
  if (from > to || (from === to && !including)) {
    const segment = `${including ? "[" : "("}${from}, ${to}${
      including ? "]" : ")"
    }`;
    throw new Error(`The segment ${segment} is invalid.`);
  }

  return <T extends object, K extends keyof T>(target: T, key: K): void => {
    // get the current value of the property
    let currentValue = target[key];

    Object.defineProperty(target, key, {
      set: (nextValue: any) => {
        if (!Validator.isNumber(nextValue)) {
          throw new Error(
            `Value of '${key}' should be a valid number. (${target.constructor.name})`
          );
        }

        if (including && (nextValue < from || nextValue > to)) {
          throw new Error(
            `Value of '${key}' should be a number between ${from} and ${to} including them. (${
              target.constructor.name
            })`
          );
        }

        if (!including && (nextValue <= from || nextValue >= to)) {
          throw new Error(
            `Value of '${key}' should be a number between ${from} and ${to}. (${
              target.constructor.name
            })`
          );
        }

        currentValue = nextValue as any;
      },
      get: () => currentValue,
    });
  };
}
