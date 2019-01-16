import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, Role } from '../guards/auth.guard';

import { SummaryComponent } from './components/summary/summary.component';
import { PageOutletComponent } from './components/page-outlet/page-outlet.component';

const routes: Routes = [
  {
    path: '',
    component: PageOutletComponent,
    canActivate: [AuthGuard],
    data: {
      restrictedTo: [Role.User]
    },
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        data: {
          restrictedTo: [Role.User]
        },
        children: [
          { path: '', component: SummaryComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
