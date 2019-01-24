import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  project: Project;
  serverValidationError = '';
  waiting = false;
  submitted = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastService: ToastService,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectService.getById(params['id']).subscribe(
        (project: Project) => {
          this.project = project;
        },
        error => {
          if (error instanceof NotFoundError) {
            // TODO: kinda hacky to navigate to wildcard route
            this.router.navigate(['/not_found'], { skipLocationChange: true });
            this.toastService.warning('Project not found.');
          }
        });
    });
  }

  onSubmit(projectForm: NgForm) {
    this.submitted = true;

    if (projectForm.invalid) {
      return;
    }

    this.serverValidationError = '';
    this.waiting = true;

    // TODO: if no changes, don't make the back-end call

    this.projectService.update(this.project)
      .subscribe((project: Project) => {
        this.toastService.success(`Project '${project.name}' successfully updated!`);
        this.router.navigate(['projects']);
      },
      error => {
        if (error instanceof ValidationError) {
          this.serverValidationError = error.message;
        }
        this.waiting = false;
      });
  }
}
