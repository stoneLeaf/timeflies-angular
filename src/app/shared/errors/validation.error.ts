/**
 * Represents a validation error.
 *
 * Didn't seem necessary to extend the JavaScript Error class.
 * Also see https://stackoverflow.com/a/48342359/8853013
 */
export class ValidationError {

  /**
   * Constructs a validation error.
   *
   * @param field the field which triggered the validation error
   * @param message a human readable error message
   */
  constructor(public readonly field: string, public readonly message: string) { }
}
