import { Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Capitalizes the first character of the value of the string property.
 *
 * @returns the property decorator which capitalizes the first letter of the
 * string value of the given property.
 */
export function upperFirst(): PropertyAnnotator<Nullish<string>> {
  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue: any = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isString(nextValue)) {
          throw new Error(`Value of '${propertyKey}' is not a string. (${target.constructor.name})`);
        }

        if (Validator.isString(nextValue)) {
          currentValue = nextValue.charAt(0).toUpperCase() + nextValue.slice(1);
        } else {
          currentValue = nextValue;
        }
      },
      get: () => currentValue,
    });
  };
}
