import { Formatter } from "../../formatters";
import { Nullish, PropertyAnnotator } from "../../types";
import { Validator } from "../../validators";

/**
 * Checks whether the value of the property is within the determined segment.
 * @param from Contains the lower border of the segment.
 * @param to Contains the upper border of the segment.
 * @param including Contains whether to allow the values of the borders.
 * @returns a property decorator which makes sure the value of the property
 * is within the determined borders.
 */
export function interval(
  from: Date,
  to: Date,
  including = true
): PropertyAnnotator<Nullish<Date>> {
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
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isDate(nextValue)) {
          throw new Error(
            `Value of '${key}' should be a valid date object. (${target.constructor.name})`
          );
        }

        if (Validator.isNullOrUndefined(nextValue)) {
          currentValue = nextValue as any;
          return;
        }

        const time: number = nextValue.getTime();
        const timeFrom: number = from.getTime();
        const timeTo: number = to.getTime();

        const dateFrom = Formatter.formatDate(from);
        const dateTo = Formatter.formatDate(to);

        if (including && (time < timeFrom || time > timeTo)) {
          throw new Error(
            `Value of '${key}' should be a date between ${dateFrom} and ${dateTo} including them. (${
              target.constructor.name
            })`
          );
        }

        if (!including && (time <= timeFrom || time >= timeTo)) {
          throw new Error(
            `Value of '${key}' should be a date between ${dateFrom} and ${dateTo}. (${
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
