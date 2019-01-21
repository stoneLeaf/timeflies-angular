import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageOutletComponent } from './components/page-outlet/page-outlet.component';
import { SummaryComponent } from './components/summary/summary.component';

@NgModule({
  declarations: [
    PageOutletComponent,
    NavBarComponent,
    FooterComponent,
    SummaryComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
