import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';

import { HttpErrorHandlerService } from './http-error-handler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private errorHandler: HttpErrorHandlerService) { }

  create(user: User): Observable<User> {
    return this.http.post(`${environment.apiUrl}/users`, user)
                    .pipe(catchError(this.errorHandler.handle),
                          map(response => response['profile']));
  }
}
