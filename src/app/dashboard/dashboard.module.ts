import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageOutletComponent } from './components/page-outlet/page-outlet.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ProjectNewComponent } from './components/project-new/project-new.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ProjectViewComponent } from './components/project-view/project-view.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    PageOutletComponent,
    NavBarComponent,
    FooterComponent,
    SummaryComponent,
    PageNotFoundComponent,
    ProjectNewComponent,
    ProjectsComponent,
    ProjectEditComponent,
    ProjectViewComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
