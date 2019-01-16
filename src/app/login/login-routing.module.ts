import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, Role } from '../guards/auth.guard';

import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [AuthGuard],
    data: {
      restrictedTo: [Role.Unregistered]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
