import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { AuthService } from '../auth.service';
import { ToastService } from '../toast.service';

import { ValidationError } from '../../shared/errors/validation.error';
import { NotFoundError } from 'src/app/shared/errors/not-found.error';

/**
 * HttpInterceptor used for HTTP error handling.
 */
@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private authService: AuthService,
              private toastService: ToastService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      return this.handle(error);
    }));
  }

  private handle(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      this.toastService.warning('Something seem to be wrong with your connection.');
    } else {
      // Http errors (non-2xx statuses)
      if (error.status === 422) {
        // Allowing components to react to server validation errors
        return throwError(new ValidationError('test', error.error['errors']));
      } else if (error.status === 401) {
        // Unauthorized
        if (this.router.url !== '/log_in') {
          this.toastService.info('You must log in before proceeding to this page.');

          this.authService.clearToken();
          this.authService.redirectAfterLogin = this.router.url;
          this.router.navigate(['log_in']);
        } else {
          return throwError(new ValidationError('test', 'bad credentials'));
        }
      } else if (error.status === 403) {
        // Not allowed
        // TODO: custom global error?
      } else  if (error.status === 404) {
        return throwError(new NotFoundError('Not found.'));
      } else if (error.status === 0) {
        // In case of a net::ERR_CONNECTION_REFUSED for instance
        this.toastService.warning('Internal error, please try again in a few moments.');
      }
      // For debugging purposes
      if (!environment.production) {
        console.error(`Back-end returned HTTP code ${error.status}`, error);
      }
    }
    // Passing along the Error
    return throwError(error);
  }
}
