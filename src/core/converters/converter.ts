import { Validator } from '../validators';

/**
 * Defines a class which provides helpful converters.
 */
export abstract class Converter {
  /**
   * Replaces HTML characters from a string by the corresponding escapers.
   *
   * @param value Contains the string value whose HTML will be replaced.
   * @returns the new string which doesn't contain HTML.
   */
  public static avoidHtml(value: any): string {
    if (!Validator.isString(value) || Validator.isEmpty(value)) {
      return '';
    }

    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  /**
   * Replaces illegal characters of a string by the corresponding legal characters.
   *
   * @param value Contains the string value whose illegal chars will be replaced.
   * @returns the secured string.
   */
  public static avoidIllegalChars(value: any): string {
    if (!Validator.isString(value) || Validator.isEmpty(value)) {
      return '';
    }

    let secure: string = value.replace(/%/g, '%25');
    secure = secure.replace(/\+/g, '%2B');
    secure = secure.replace(/\//g, '%2F');
    secure = secure.replace(/\?/g, '%3F');
    secure = secure.replace(/#/g, '%23');
    secure = secure.replace(/&/g, '%26');
    // tslint:disable-next-line: quotemark
    secure = secure.replace(/'/g, "''");
    return secure;
  }
}
