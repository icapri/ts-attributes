import { Formatter } from '../../formatters';
import { Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Checks whether the value of the given property is within the determined segment.
 *
 * @param from Contains the lower border of the segment.
 * @param to Contains the upper border of the segment.
 * @param includeBorders Contains whether to allow the values of the borders.
 * @returns a property decorator which makes sure the value of the property is within
 * the determined time interval.
 */
export function interval(from: Date, to: Date, includeBorders = true): PropertyAnnotator<Nullish<Date>> {
  if (from > to || (from === to && !includeBorders)) {
    const timeInterval = `${includeBorders ? '[' : '('}${from}, ${to}${includeBorders ? ']' : ')'}`;
    throw new Error(`The interval ${timeInterval} is not valid.`);
  }

  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue: any = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isDate(nextValue)) {
          throw new Error(`Value of '${propertyKey}' is not a valid date object. (${target.constructor.name})`);
        }

        if (Validator.isNullOrUndefined(nextValue)) {
          currentValue = nextValue;
          return;
        }

        const time: number = nextValue.getTime();
        const timeFrom: number = from.getTime();
        const timeTo: number = to.getTime();

        const dateFrom = Formatter.formatDate(from);
        const dateTo = Formatter.formatDate(to);

        if (includeBorders && (time < timeFrom || time > timeTo)) {
          throw new Error(
            `Value of '${propertyKey}' is not a date between ${dateFrom} and ${dateTo} incl. them. (${target.constructor.name})`,
          );
        }

        if (!includeBorders && (time <= timeFrom || time >= timeTo)) {
          throw new Error(
            `Value of '${propertyKey}' is not a date between ${dateFrom} and ${dateTo}. (${target.constructor.name})`,
          );
        }

        currentValue = nextValue;
      },
      get: () => currentValue,
    });
  };
}
