import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastService } from 'src/app/services/toast.service';
import { ProjectService } from 'src/app/services/project.service';

import { Project } from 'src/app/shared/models/project.model';
import { ValidationError } from 'src/app/shared/errors/validation.error';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss']
})
export class ProjectNewComponent implements OnInit {
  projectForm: FormGroup;

  serverValidationError = '';
  waiting = false;
  submitted = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private toastService: ToastService,
              private projectService: ProjectService) { }

  get f() {
    return this.projectForm.controls;
  }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      'name': ['', [Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(100)]],
      'description': ['', Validators.maxLength(255)]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.projectForm.invalid) {
      return;
    }

    this.serverValidationError = '';
    this.waiting = true;

    this.projectService.create(this.projectForm.value as Project)
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
