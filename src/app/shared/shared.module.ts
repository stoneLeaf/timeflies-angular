import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastMessagesComponent } from './components/toast-messages/toast-messages.component';
import { DefaultValuePipe } from './pipes/default-value.pipe';
import { TimerDisplayPipe } from './pipes/timer-display.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [
    ToastMessagesComponent,
    DefaultValuePipe,
    TimerDisplayPipe,
    TimeAgoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToastMessagesComponent,
    DefaultValuePipe,
    TimerDisplayPipe,
    TimeAgoPipe
  ]
})
export class SharedModule { }
