import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  logIn(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`,
                          { email: email, password: password});
  }
}
