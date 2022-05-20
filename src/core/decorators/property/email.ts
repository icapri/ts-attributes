import { Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Checks whether the value of the property is a string which represents a valid email
 * address. If the string is not a valid email address an error is thrown.
 *
 * @returns the property decorator which makes sure that the value of the
 * given property is a valid email address.
 */
export function email(): PropertyAnnotator<Nullish<string>> {
  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue = target[propertyKey];
    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isEmail(nextValue)) {
          throw new Error(`Value of '${propertyKey}' is not a valid email address. (${target.constructor.name})`);
        }

        currentValue = nextValue as any;
      },
      get: () => currentValue,
    });
  };
}
