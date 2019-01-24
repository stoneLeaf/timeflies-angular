import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Toast, Type, Dismissal } from '../shared/models/toast.model';

/**
 * This service handles notifications in the form of toast messages.
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _toast$: Subject<Toast>;

  constructor() {
    this._toast$ = new Subject();
  }

  get toast$() {
    return this._toast$.asObservable();
  }

  info(message: string, stayAfterNavigation?: boolean) {
    this._toast$.next(new Toast(Type.Info, Dismissal.Auto, message, stayAfterNavigation));
  }

  success(message: string, stayAfterNavigation?: boolean) {
    this._toast$.next(new Toast(Type.Success, Dismissal.Auto, message, stayAfterNavigation));
  }

  warning(message: string, stayAfterNavigation?: boolean) {
    this._toast$.next(new Toast(Type.Warning, Dismissal.Link, message, stayAfterNavigation));
  }
}
