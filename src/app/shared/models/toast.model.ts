/**
 * Enum for toast types.
 */
export enum Type {
  Info,
  Success,
  Warning
}

/**
 * Enum for toast dismissal options.
 */
export enum Dismissal {
  Auto,
  Link
}

/**
 * Class representing a toast message.
 */
export class Toast {
  constructor(readonly type: Type,
              readonly dismissal: Dismissal,
              readonly message: string,
              readonly stayAfterNavigation?: boolean) { }
}
