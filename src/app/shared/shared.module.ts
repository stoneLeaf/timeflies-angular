import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastMessagesComponent } from './components/toast-messages/toast-messages.component';
import { DefaultValuePipe } from './pipes/default-value.pipe';

@NgModule({
  declarations: [
    ToastMessagesComponent,
    DefaultValuePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToastMessagesComponent,
    DefaultValuePipe
  ]
})
export class SharedModule { }
