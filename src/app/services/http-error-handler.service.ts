import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { ValidationError } from '../shared/errors/validation.error';

/**
 * Service used for HTTP error handling.
 *
 * // TODO: do error handling at http interceptor level?
 */
@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  handle(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      // TODO: toast 'check your connection then retry'
    } else {
      // Http errors (non-2xx statuses)
      if (error.status === 422) {
        // Allowing components to react to server validation errors
        return throwError(new ValidationError('test', error.error['errors']));
      } else if (error.status === 401) {
        // Unauthorized
        // TODO: redirect to login page?
      } else if (error.status === 403) {
        // Not allowed
        // TODO: custom error?
      }
      // For debugging purposes
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Returning empty Error observable
    return throwError('');
  }
}
