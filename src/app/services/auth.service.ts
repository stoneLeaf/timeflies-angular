import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _jwtHelper = new JwtHelperService();
  private _loggedInUser: User;

  constructor(private http: HttpClient) { }

  get loggedInUser() {
    return this._loggedInUser;
  }

  loggedIn(): boolean {
    const storedToken = this.getToken();
    if (storedToken === null) { return false; }
    if (this._jwtHelper.isTokenExpired(storedToken)) {
      this.clearToken();
      return false;
    }
    if (this.loggedInUser) { return true; }
    this._loggedInUser = this._jwtHelper.decodeToken(storedToken)['profile'] as User;
    return true;
  }

  logIn(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`,
                          { email: email, password: password})
                    .pipe(map(response => {
                      this._loggedInUser = response['profile'] as User;
                      localStorage.setItem('token', response['token']);
                    }));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.removeItem('token');
  }
}
