import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryComponent } from './components/summary/summary.component';
import { PageOutletComponent } from './components/page-outlet/page-outlet.component';

const routes: Routes = [
  { path: '', component: PageOutletComponent, children: [
    { path: '', component: SummaryComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
