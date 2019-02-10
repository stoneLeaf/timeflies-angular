import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  create(user: User): Observable<User> {
    return this.http.post(`${environment.apiUrl}/users`, user)
                    .pipe(map(response => {
                      return { profile: response['profile'] } as User;
                    }));
  }

  update(user: User): Observable<User> {
    return this.http.patch(`${environment.apiUrl}/profile`, user)
                    .pipe(
                      tap(response => {
                        this.authService.processNewToken(response['token']);
                      }),
                      map(response => {
                        return { profile: response['profile'] } as User;
                    }));
  }
}
