/**
 * Represents a missing resource error.
 */
export class NotFoundError {

  /**
   * Constructs the error.
   *
   * @param message a human readable error message
   */
  constructor(readonly message: string) { }
}
