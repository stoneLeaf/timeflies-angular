import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { matchIfNotLoggedIn, matchIfLoggedIn } from './guards/auth.guard';

const routes: Routes = [
  { path: 'log_in', loadChildren: './login/login.module#LoginModule' },
  {
    matcher: matchIfNotLoggedIn,
    loadChildren: './lobby/lobby.module#LobbyModule'
  },
  {
    matcher: matchIfLoggedIn,
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
