import { Nullable, Nullish, PropertyAnnotator } from '../../types';
import { Validator } from '../../validators';

/**
 * Contains countries and the corresponding regular expressions of their IBAN-s.
 *
 * @todo Possibly there are countries which are not listed below, they should also
 * be added to the `Country` class.
 */
export abstract class Country {
  public static readonly Albania: RegExp = /AL[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){2}([a-zA-Z0-9]{4}\s?){4}\s?/gm;
  public static readonly Andorra: RegExp = /AD[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){2}([a-zA-Z0-9]{4}\s?){3}\s?/gm;
  public static readonly Austria: RegExp = /AT[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}\s?/gm;
  public static readonly Azerbaijan: RegExp = /AZ[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{4}\s?){1}([0-9]{4}\s?){5}\s?/gm;
  public static readonly Bahrain: RegExp =
    /BH[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{2})\s?/gm;
  public static readonly Belarus: RegExp = /BY[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{4}\s?){1}([0-9]{4}\s?){5}\s?/gm;
  public static readonly Belgium: RegExp = /BE[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){3}\s?/gm;
  public static readonly BosniaHerzegovina: RegExp = /BA[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}\s?/gm;
  public static readonly Brazil: RegExp =
    /BR[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}([0-9]{3})([a-zA-Z]{1}\s?)([a-zA-Z0-9]{1})\s?/gm;
  public static readonly Bulgaria: RegExp =
    /BG[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([0-9]{4}\s?){1}([0-9]{2})([a-zA-Z0-9]{2}\s?)([a-zA-Z0-9]{4}\s?){1}([a-zA-Z0-9]{2})\s?/gm;
  public static readonly CostaRica: RegExp = /CR[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}([0-9]{2})\s?/gm;
  public static readonly Croatia: RegExp = /HR[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}([0-9]{1})\s?/gm;
  public static readonly Cyprus: RegExp = /CY[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){2}([a-zA-Z0-9]{4}\s?){4}\s?/gm;
  public static readonly CzechRepublic: RegExp = /CZ[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}\s?/gm;
  public static readonly Denmark: RegExp = /DK[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){3}([0-9]{2})\s?/gm;
  public static readonly DominicanRepublic: RegExp = /DO[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([0-9]{4}\s?){5}\s?/gm;
  public static readonly Estonia: RegExp = /EE[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}\s?/gm;
  public static readonly FaroeIslands: RegExp = /FO[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){3}([0-9]{2})\s?/gm;
  public static readonly Finland: RegExp = /FI[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){3}([0-9]{2})\s?/gm;
  public static readonly France: RegExp =
    /FR[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){2}([0-9]{2})([a-zA-Z0-9]{2}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{1})([0-9]{2})\s?/gm;
  public static readonly Georgia: RegExp =
    /GE[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{2})([0-9]{2}\s?)([0-9]{4}\s?){3}([0-9]{2})\s?/gm;
  public static readonly Germany: RegExp = /DE[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}([0-9]{2})\s?/gm;
  public static readonly Gibraltar: RegExp =
    /GI[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{3})\s?/gm;
  public static readonly Greece: RegExp =
    /GR[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{3})([a-zA-Z0-9]{1}\s?)([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{3})\s?/gm;
  public static readonly Greenland: RegExp = /GL[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){3}([0-9]{2})\s?/gm;
  public static readonly Guatemala: RegExp = /GT[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{4}\s?){1}([a-zA-Z0-9]{4}\s?){5}\s?/gm;
  public static readonly HolySee: RegExp = /VA[a-zA-Z0-9]{2}\s?([0-9]{3})([0-9]{1}\s?)([0-9]{4}\s?){3}([0-9]{2})\s?/gm;
  public static readonly Hungary: RegExp = /HU[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){6}\s?/gm;
  public static readonly Iceland: RegExp = /IS[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}([0-9]{2})\s?/gm;
  public static readonly Ireland: RegExp = /IE[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{4}\s?){1}([0-9]{4}\s?){3}([0-9]{2})\s?/gm;
  public static readonly Israel: RegExp = /IL[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}([0-9]{3})\s?/gm;
  public static readonly Italy: RegExp =
    /IT[a-zA-Z0-9]{2}\s?([a-zA-Z]{1})([0-9]{3}\s?)([0-9]{4}\s?){1}([0-9]{3})([a-zA-Z0-9]{1}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{3})\s?/gm;
  public static readonly Jordan: RegExp = /JO[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([0-9]{4}\s?){5}([0-9]{2})\s?/gm;
  public static readonly Kazakhstan: RegExp =
    /KZ[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){3}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{2})\s?/gm;
  public static readonly Kosovo: RegExp =
    /XK[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{4}\s?){2}([0-9]{2})([0-9]{2}\s?)\s?/gm;
  public static readonly Kuwait: RegExp =
    /KW[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([a-zA-Z0-9]{4}\s?){5}([a-zA-Z0-9]{2})\s?/gm;
  public static readonly Latvia: RegExp =
    /LV[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{1})\s?/gm;
  public static readonly Lebanon: RegExp = /LB[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([a-zA-Z0-9]{4}\s?){5}\s?/gm;
  public static readonly Liechtenstein: RegExp =
    /LI[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{1})\s?/gm;
  public static readonly Lithuania: RegExp = /LT[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}\s?/gm;
  public static readonly Luxembourg: RegExp =
    /LU[a-zA-Z0-9]{2}\s?([0-9]{3})([a-zA-Z0-9]{1}\s?)([a-zA-Z0-9]{4}\s?){3}\s?/gm;
  public static readonly Malta: RegExp =
    /MT[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([0-9]{4}\s?){1}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{3})\s?/gm;
  public static readonly Mauritania: RegExp = /MR[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}([0-9]{3})\s?/gm;
  public static readonly Mauritius: RegExp =
    /MU[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([0-9]{4}\s?){4}([0-9]{3})([a-zA-Z]{1}\s?)([a-zA-Z]{2})\s?/gm;
  public static readonly Moldova: RegExp =
    /MD[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{2})([a-zA-Z0-9]{2}\s?)([a-zA-Z0-9]{4}\s?){4}\s?/gm;
  public static readonly Monaco: RegExp =
    /MC[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){2}([0-9]{2})([a-zA-Z0-9]{2}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{1})([0-9]{2})\s?/gm;
  public static readonly Montenegro: RegExp = /ME[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}([0-9]{2})\s?/gm;
  public static readonly Netherlands: RegExp = /NL[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([0-9]{4}\s?){2}([0-9]{2})\s?/gm;
  public static readonly NorthMacedonia: RegExp =
    /MK[a-zA-Z0-9]{2}\s?([0-9]{3})([a-zA-Z0-9]{1}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{1})([0-9]{2})\s?/gm;
  public static readonly Norway: RegExp = /NO[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){2}([0-9]{3})\s?/gm;
  public static readonly Pakistan: RegExp = /PK[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{4}\s?){1}([0-9]{4}\s?){4}\s?/gm;
  public static readonly Palestine: RegExp = /PS[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{4}\s?){1}([0-9]{4}\s?){5}([0-9]{1})\s?/gm;
  public static readonly Poland: RegExp = /PL[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){6}\s?/gm;
  public static readonly Portugal: RegExp = /PT[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}([0-9]{1})\s?/gm;
  public static readonly Qatar: RegExp =
    /QA[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([a-zA-Z0-9]{4}\s?){5}([a-zA-Z0-9]{1})\s?/gm;
  public static readonly Romania: RegExp = /RO[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([a-zA-Z0-9]{4}\s?){4}\s?/gm;
  public static readonly SanMarino: RegExp =
    /SM[a-zA-Z0-9]{2}\s?([a-zA-Z]{1})([0-9]{3}\s?)([0-9]{4}\s?){1}([0-9]{3})([a-zA-Z0-9]{1}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{3})\s?/gm;
  public static readonly SaudiArabia: RegExp =
    /SA[a-zA-Z0-9]{2}\s?([0-9]{2})([a-zA-Z0-9]{2}\s?)([a-zA-Z0-9]{4}\s?){4}\s?/gm;
  public static readonly Serbia: RegExp = /RS[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}([0-9]{2})\s?/gm;
  public static readonly SlovakRepublic: RegExp = /SK[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}\s?/gm;
  public static readonly Slovenia: RegExp = /SI[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){3}([0-9]{3})\s?/gm;
  public static readonly Spain: RegExp = /ES[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}\s?/gm;
  public static readonly Sweden: RegExp = /SE[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}\s?/gm;
  public static readonly Switzerland: RegExp =
    /CH[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){2}([a-zA-Z0-9]{1})\s?/gm;
  public static readonly TimorLeste: RegExp = /TL[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){4}([0-9]{3})\s?/gm;
  public static readonly Tunisia: RegExp = /TN[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){5}\s?/gm;
  public static readonly Turkey: RegExp =
    /TR[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{2})\s?/gm;
  public static readonly Ukraine: RegExp = /\bUA\s?\d{2}\s?\d{6}\s?\d{19}\b/gm;
  public static readonly UnitedArabEmirates: RegExp =
    /AE[a-zA-Z0-9]{2}\s?([0-9]{3})([0-9]{1}\s?)([0-9]{4}\s?){3}([0-9]{3})\s?/gm;
  public static readonly UnitedKingdom: RegExp =
    /GB[a-zA-Z0-9]{2}\s?([a-zA-Z]{4}\s?){1}([0-9]{4}\s?){3}([0-9]{2})\s?/gm;
  public static readonly VirginIslandsBritish: RegExp =
    /VG[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{4}\s?){1}([0-9]{4}\s?){4}\s?/gm;
}

/**
 * Checks whether the string value of the given property is a valid IBAN of the given
 * country; otherwise an error is thrown.
 *
 * @param country Contains the name of the country.
 * @returns the property decorator which checks the validity of the IBAN based on the
 * input country.
 */
export function iban(country: Country): PropertyAnnotator<Nullish<string>> {
  if (!(country instanceof RegExp)) {
    throw new Error('An error ocurred while processed the input country.');
  }

  return <T extends object, K extends keyof T>(target: T, propertyKey: K): void => {
    // get the current value of the property
    let currentValue: any = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (nextValue: any) => {
        if (!Validator.isNullOrUndefined(nextValue) && !Validator.isString(nextValue)) {
          throw new Error(`Value of '${propertyKey}' is not a valid IBAN. (${target.constructor.name})`);
        }

        if (Validator.isNullOrUndefined(nextValue)) {
          currentValue = nextValue;
          return;
        }

        const matches: Nullable<RegExpMatchArray> = String(nextValue.replace(/\s/g, '')).toUpperCase().match(country);
        if (Validator.hasValue(matches)) {
          currentValue = matches[0];
        } else {
          throw new Error(`Value of '${propertyKey}' is not a valid IBAN. (${target.constructor.name})`);
        }
      },
      get: () => currentValue,
    });
  };
}
