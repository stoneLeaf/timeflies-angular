import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, Role } from '../guards/auth.guard';

import { IntroductionComponent } from './components/introduction/introduction.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PageOutletComponent } from './components/page-outlet/page-outlet.component';

const routes: Routes = [
  {
    path: '',
    component: PageOutletComponent,
    canActivate: [AuthGuard],
    data: {
      restrictedTo: [Role.Unregistered]
    },
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        data: {
          restrictedTo: [Role.Unregistered]
        },
        children: [
          { path: '', component: IntroductionComponent },
          { path: 'sign_up', component: SignUpComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule { }
