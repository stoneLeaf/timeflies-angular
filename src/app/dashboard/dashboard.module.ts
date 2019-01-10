import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { PageOutletComponent } from './components/page-outlet/page-outlet.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SummaryComponent } from './components/summary/summary.component';

@NgModule({
  declarations: [
    PageOutletComponent,
    NavBarComponent,
    FooterComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
