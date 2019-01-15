import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserOnlyGuard } from '../guards/user-only.guard';

import { SummaryComponent } from './components/summary/summary.component';
import { PageOutletComponent } from './components/page-outlet/page-outlet.component';

const routes: Routes = [
  { path: '',
    component: PageOutletComponent,
    canActivate: [UserOnlyGuard],
    children: [
      { path: '',
        canActivateChild: [UserOnlyGuard],
        children: [
          { path: '', component: SummaryComponent }
        ]}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
