import { Pipe, PipeTransform } from '@angular/core';

/**
 * Outputs a default value if the value is falsy.
 * Usage:
 *   value | defaultValue:'Default value'
 */
@Pipe({
  name: 'defaultValue'
})
export class DefaultValuePipe implements PipeTransform {

  transform(value: any, defaultValue: any): string {
    return value ? value : defaultValue;
  }

}
