import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { Project } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { NotFoundError } from 'src/app/shared/errors/not-found.error';
import { ToastService } from 'src/app/services/toast.service';
import { ValidationError } from 'src/app/shared/errors/validation.error';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  project$: Observable<Project>;

  serverValidationError = '';
  waiting = false;
  submitted = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastService: ToastService,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.project$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.projectService.getById(params.get('id')).pipe(
          catchError(error => {
            if (error instanceof NotFoundError) {
              // TODO: kinda hacky to navigate to wildcard route
              this.router.navigate(['/not_found'], { skipLocationChange: true });
              this.toastService.warning('Project not found.');
            }
            return throwError(error);
        }));
    })
    );
  }

  onSubmit(projectForm: NgForm, project: Project) {
    this.submitted = true;

    if (projectForm.invalid) {
      return;
    }

    this.serverValidationError = '';
    this.waiting = true;

    // TODO: if no changes, don't make the back-end call

    this.projectService.update(project)
      .subscribe((serverProject: Project) => {
        this.router.navigate(['projects']);
        this.toastService.success(`Project '${serverProject.name}' successfully updated!`);
      },
      error => {
        if (error instanceof ValidationError) {
          this.serverValidationError = error.message;
        }
        this.waiting = false;
      });
  }
}
