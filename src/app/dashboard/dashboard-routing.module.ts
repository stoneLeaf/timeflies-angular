import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, Role } from '../guards/auth.guard';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageOutletComponent } from './components/page-outlet/page-outlet.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ProjectNewComponent } from './components/project-new/project-new.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ProjectViewComponent } from './components/project-view/project-view.component';

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
          { path: '', component: SummaryComponent },
          { path: 'projects/:id', component: ProjectViewComponent },
          { path: 'projects/:id/edit', component: ProjectEditComponent },
          { path: 'projects/new', component: ProjectNewComponent },
          { path: 'projects', component: ProjectsComponent },
          { path: '**', component: PageNotFoundComponent }
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
