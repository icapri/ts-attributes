import { Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Converts the value of a property of type string to upper case.
 */
export function lowercase(): PropertyAnnotator<Nullish<string>> {
  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue: any = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isString(nextValue)) {
          throw new Error(`Value of '${propertyKey}' should be a string. ${target.constructor.name}.`);
        }

        if (Validator.isString(nextValue)) {
          currentValue = nextValue.toLowerCase();
        } else {
          currentValue = nextValue;
        }
      },
      get: () => currentValue,
    });
  };
}
