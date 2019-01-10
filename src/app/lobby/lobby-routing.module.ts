import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroductionComponent } from './components/introduction/introduction.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PageOutletComponent } from './components/page-outlet/page-outlet.component';
import { LoginPageComponent } from '../login/components/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: PageOutletComponent, children: [
    { path: '', component: IntroductionComponent },
    { path: 'sign_up', component: SignUpComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule { }
