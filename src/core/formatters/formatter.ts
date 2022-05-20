/**
 * Contains the default date format options.
 */
const defaultDateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: 'numeric',
};

/**
 * Defines a formatter for different data types incl. date objects, numbers, etc.
 */
export abstract class Formatter {
  /**
   * Formats a given date object according to the given format.
   * @param date Contains the date object to be formatted.
   * @returns the string representing the date.
   */
  public static formatDate(date: Date, locale = 'en-US', options: Intl.DateTimeFormatOptions = defaultDateOptions): string {
    return Intl.DateTimeFormat(locale, options).format(date);
  }
}
