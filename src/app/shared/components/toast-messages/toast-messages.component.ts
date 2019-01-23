import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Toast, Type, Dismissal } from 'src/app/shared/models/toast.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast-messages',
  templateUrl: './toast-messages.component.html',
  styleUrls: ['./toast-messages.component.scss']
})
export class ToastMessagesComponent implements OnInit, OnDestroy {
  private _toastSubscription: Subscription;
  private _queue: Toast[] = [];

  toast: Toast;
  dismissNow = false;
  dismissWithDelay = false;

  // To be able to reference the enums in the template
  Type = Type;
  Dismissal = Dismissal;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this._toastSubscription = this.toastService.toast$.subscribe(
      toast => {
        this._queue.push(toast);
        this.load();
      });
  }

  ngOnDestroy() {
    // Prevent memory leaks
    this._toastSubscription.unsubscribe();
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
