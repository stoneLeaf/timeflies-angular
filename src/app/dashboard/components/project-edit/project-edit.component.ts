import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable, throwError } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';

import { ToastService } from 'src/app/services/toast.service';
import { ProjectService } from 'src/app/services/project.service';

import { Project } from 'src/app/shared/models/project.model';
import { NotFoundError } from 'src/app/shared/errors/not-found.error';
import { ValidationError } from 'src/app/shared/errors/validation.error';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  projectForm: FormGroup;

  project$: Observable<Project>;

  serverValidationError = '';
  waiting = false;
  submitted = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastService: ToastService,
              private projectService: ProjectService) { }

  get f() {
    return this.projectForm.controls;
  }

  ngOnInit() {
    this.project$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.projectService.getById(params.get('id')).pipe(
          tap(project => {
            this.projectForm = this.formBuilder.group({
              'name': [project.name, [Validators.required,
                                      Validators.minLength(2),
                                      Validators.maxLength(100)]],
              'description': [project.description, Validators.maxLength(255)]
            });
          }),
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

  onSubmit(project: Project) {
    this.submitted = true;

    if (this.projectForm.invalid) {
      return;
    }

    this.serverValidationError = '';
    this.waiting = true;

    // TODO: if no changes, don't make the back-end call

    this.projectService.update({...project, ...this.projectForm.value})
      .subscribe((serverProject: Project) => {
        this.router.navigate(['/projects', serverProject.id]);
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
