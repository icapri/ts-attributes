import { Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Defines a class which contains the regular expressions of all the credit
 * card types. There are a couple of other credit card types but these won't
 * be supported in the first couple of versions.
 */
export abstract class CreditCardType {
  public static readonly MasterCard: RegExp = /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/gm;
  public static readonly AmericanExpress: RegExp = /^3[47][0-9]{13}$/gm;
  public static readonly Visa: RegExp = /^4[0-9]{12}(?:[0-9]{3})?$/gm;
  public static readonly Discover: RegExp = /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/gm;
  public static readonly Maestro: RegExp = /^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6799|6220|504834|504817|504645)[0-9]{8,15}$/gm;
  public static readonly JCB: RegExp = /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/gm;
  public static readonly DinersClub: RegExp = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/gm;
}

/**
 * Checks whether the value of the property is a valid credit card number. This
 * method also refines the value of the property in case the credit card number
 * is a string like `5105-1051-0510-5100`. In this case the '-' characters are
 * removed from the string for convenience.
 *
 * @param accepts Contains the type or types of credit cards which are accepted.
 * @returns the property descriptor of the given property which makes sure that
 * a valid credit card number is provided.
 */
export function creditCardNumber(accepts: CreditCardType | CreditCardType[] | 'all' = 'all'): PropertyAnnotator<Nullish<string | number>> {
  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue: any = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isString(nextValue) && !Validator.isNumber(nextValue)) {
          throw new Error(`Value of '${propertyKey}' is neither a string nor a number. ${target.constructor.name}.`);
        }

        if (Validator.isNullOrUndefined(nextValue)) {
          currentValue = nextValue;
          return;
        }

        const value = Validator.isString(nextValue) ? nextValue.replace(/\s/g, '').replace(/[^0-9]/g, '') : nextValue.toString();
        let isMatch: boolean = false;
        if (accepts instanceof RegExp && value.match(accepts)) {
          isMatch = true;
        } else if (Validator.isArray(accepts)) {
          accepts.forEach((creditCardType: CreditCardType) => {
            if (creditCardType instanceof RegExp && value.match(creditCardType)) {
              isMatch = true;
            }
          });
        } else if (accepts === 'all') {
          Object.values(CreditCardType).forEach((creditCardType: RegExp) => {
            if (value.match(creditCardType)) {
              isMatch = true;
            }
          });
        }

        if (!isMatch) {
          throw new Error(`Value of '${propertyKey}' is not a valid credit card number. (${target.constructor.name})`);
        }

        currentValue = Validator.isString(nextValue) ? nextValue.replace(/[^0-9]/g, '') : nextValue;
      },
      get: () => currentValue,
    });
  };
}
