import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Project } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ValidationError } from 'src/app/shared/errors/validation.error';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss']
})
export class ProjectNewComponent implements OnInit {
  project: Project;
  serverValidationError = '';
  waiting = false;
  submitted = false;

  constructor(private router: Router,
              private toastService: ToastService,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.project = new Project();
  }

  onSubmit(projectForm: NgForm) {
    this.submitted = true;

    if (projectForm.invalid) {
      return;
    }

    this.serverValidationError = '';
    this.waiting = true;

    this.projectService.create(this.project)
      .subscribe((project: Project) => {
        this.router.navigate(['projects', project.id]);
        this.toastService.success(`Project '${project.name}' successfully created!`);
      },
      error => {
        if (error instanceof ValidationError) {
          this.serverValidationError = error.message;
        }
        this.waiting = false;
      });
  }
}
