import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { ProjectService } from 'src/app/services/project.service';
import { ToastService } from 'src/app/services/toast.service';

import { NotFoundError } from 'src/app/shared/errors/not-found.error';

import { Project } from 'src/app/shared/models/project.model';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  project$: Observable<Project>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastService: ToastService,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.project$ = this.route.paramMap.pipe(switchMap(params => {
      return this.projectService.getById(params.get('id')).pipe(
        // TODO: not DRY, same pattern in ProjectEditComponent
        catchError(error => {
          if (error instanceof NotFoundError) {
            // TODO: kinda hacky to navigate to wildcard route
            this.router.navigate(['/not_found'], { skipLocationChange: true });
            this.toastService.warning('Project not found.');
          }
          return throwError(error);
        }));
    }));
  }
}
