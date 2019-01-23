import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastMessagesComponent } from './components/toast-messages/toast-messages.component';

@NgModule({
  declarations: [
    ToastMessagesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToastMessagesComponent
  ]
})
export class SharedModule { }
