import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ValidationError } from '../../shared/errors/validation.error';
import { AuthService } from '../auth.service';

/**
 * HttpInterceptor used for HTTP error handling.
 */
@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      return this.handle(error);
    }));
  }

  private handle(error: HttpErrorResponse): Observable<any> {
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
        if (this.router.url !== '/log_in') {
          // TODO: toast message? 'please log in'
          this.authService.clearToken();
          this.router.navigate(['log_in']);
        } else {
          return throwError(new ValidationError('test', 'bad credentials'));
        }
      } else if (error.status === 403) {
        // Not allowed
        // TODO: custom error?
      }
      // For debugging purposes
      console.error(
        `Back_end returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Returning empty Error observable
    return throwError('');
  }
}
