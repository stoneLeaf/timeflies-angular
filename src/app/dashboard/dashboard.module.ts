import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageOutletComponent } from './components/page-outlet/page-outlet.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ProjectNewComponent } from './components/project-new/project-new.component';
import { ProjectsComponent } from './components/projects/projects.component';

@NgModule({
  declarations: [
    PageOutletComponent,
    NavBarComponent,
    FooterComponent,
    SummaryComponent,
    PageNotFoundComponent,
    ProjectNewComponent,
    ProjectsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
