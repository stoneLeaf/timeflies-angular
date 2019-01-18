import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

/**
 * These two functions are routes matchers used as workarounds to allow the
 * lobby and dashboard modules to be conditionally routed on empty path.
 */
export function matchIfLoggedIn(url: UrlSegment[]) {
  return localStorage.getItem('token') !== null ? ({ consumed: [] }) : null;
}
export function matchIfNotLoggedIn(url: UrlSegment[]) {
  return localStorage.getItem('token') === null ? ({ consumed: [] }) : null;
}

/**
 * Enum for user roles.
 */
export enum Role {
  Unregistered,
  User
}

/**
 * Route guard handling authentication concerns.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
      : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Defaulting to an empty array in case 'restrictedTo' is not set
    const roles =  <Array<Role>>route.data['restrictedTo'] || [];
    for (const role of roles) {
      if (!this.hasRole(role)) {
        this.fallbackActionsFor(role, state.url);
        return false;
      }
    }
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot)
      : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  private hasRole(role: Role): boolean {
    switch (role) {
      case Role.Unregistered:
        return !this.authService.loggedIn();
      case Role.User:
        return this.authService.loggedIn();
      default:
        throw new Error(`Role '${Role[role]}' not implemented.`);
    }
  }

  private fallbackActionsFor(role: Role, url: string) {
    switch (role) {
      case Role.Unregistered:
        this.router.navigate(['']);
        break;
      case Role.User:
        this.authService.redirectAfterLogin = url;
        this.router.navigate(['log_in']);
        break;
    }
  }
}
