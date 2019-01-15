import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

/**
 * HttpInterceptor used for patching back-end requests with authorization header.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // Only patch requests to the back-end API
    if (!req.url.startsWith(environment.apiUrl)) {
      return next.handle(req);
    }
    const token = this.authService.getToken();
    // Abort if not authenticated
    if (token === null) {
      return next.handle(req);
    }
    // Patching request with header
    const patchedReq = req.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });
    return next.handle(patchedReq);
  }
}
