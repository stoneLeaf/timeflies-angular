import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Subject } from 'rxjs';

import { Toast, Type, Dismissal } from 'src/app/shared/models/toast.model';
import { ToastService } from 'src/app/services/toast.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toast-messages',
  templateUrl: './toast-messages.component.html',
  styleUrls: ['./toast-messages.component.scss']
})
export class ToastMessagesComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject();
  private _queue: Toast[] = [];

  toast: Toast;
  dismissNow = false;
  dismissWithDelay = false;

  // To be able to reference the enums in the template
  Type = Type;
  Dismissal = Dismissal;

  constructor(private router: Router,
              private toastService: ToastService) { }

  ngOnInit() {
    this.router.events.pipe(takeUntil(this._unsubscribe))
                      .subscribe(event => {
                        if (event instanceof NavigationStart) {
                          if (this.toast && !this.toast.stayAfterNavigation) {
                            this.dismissWithDelay = false;
                            this.dismissNow = true;
                          }
                        }
                      });
    this.toastService.toast$.pipe(takeUntil(this._unsubscribe))
                            .subscribe(
                              toast => {
                                this._queue.push(toast);
                                this.load();
                              }
                            );
  }

  ngOnDestroy() {
    // Prevent memory leaks
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  load() {
    if (!this.toast && this._queue.length > 0) {
      this.toast = this._queue.shift();
    }
  }

  clearToast() {
    this.dismissNow = false;
    this.dismissWithDelay = false;
    this.toast = undefined;
    this.load();
  }

  onAnimationEnd(name: string) {
    if (name === 'intro' && this.toast.dismissal === Dismissal.Auto) {
      this.dismissWithDelay = true;
    } else if (name === 'outro') {
      this.clearToast();
    }
  }
}
