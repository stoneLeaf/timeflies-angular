import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _jwtHelper = new JwtHelperService();
  private _loggedInUser: User;
  private _redirectAfterLogin: string;

  constructor(private http: HttpClient) { }

  get loggedInUser() {
    return this._loggedInUser;
  }

  get redirectAfterLogin() {
    return this._redirectAfterLogin;
  }

  set redirectAfterLogin(url: string) {
    this._redirectAfterLogin = url;
  }

  loggedIn(): boolean {
    const storedToken = this.getToken();
    if (storedToken === null) { return false; }
    if (this._jwtHelper.isTokenExpired(storedToken)) {
      this.clearToken();
      return false;
    }
    if (this.loggedInUser) { return true; }
    this.extractUserFromPayload();
    return true;
  }

  logIn(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`,
                          { email: email, password: password})
                    .pipe(tap(response => {
                      this.processNewToken(response['token']);
                    }));
  }

  processNewToken(token: string) {
    this.storeToken(token);
    this.extractUserFromPayload();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  private extractUserFromPayload() {
    this._loggedInUser = { profile: this._jwtHelper.decodeToken(this.getToken())['profile'] } as User;
    this._loggedInUser.gravatar = this.gravatar();
  }

  private gravatar(): string {
    return `https://www.gravatar.com/avatar/${this._loggedInUser.profile.hashedEmail}`;
  }

  private storeToken(token: string) {
    localStorage.setItem('token', token);
  }
}
