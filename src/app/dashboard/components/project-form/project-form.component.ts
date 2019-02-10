import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { Project } from 'src/app/shared/models/project.model';

/**
 * Component representing a Project form.
 */
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  /**
   * Project used to get initial input values.
   */
  @Input() project: Project;
  /**
   * When received, the form quits its waiting state and displays a potential
   * error message.
   *
   * Can be created as a Subject.
   */
  @Input() serverReturns$: Observable<string>;
  /**
   * Form submit button label.
   */
  @Input() submitButtonLabel: string;

  /**
   * Event fired when a valid form is submitted.
   */
  @Output() submission = new EventEmitter<Project>();

  projectForm: FormGroup;
  serverError = '';
  waiting = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      'name': [this.project.name, [Validators.required,
                                   Validators.minLength(2),
                                   Validators.maxLength(100)]],
      'description': [this.project.description, Validators.maxLength(255)]
    });

    this.serverReturns$.subscribe(errorMessage => {
      if (errorMessage) {
        this.serverError = errorMessage;
      }
      this.waiting = false;
    });
  }

  get f() {
    return this.projectForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.projectForm.invalid) {
      return;
    }

    this.waiting = true;
    this.submission.emit({...this.project, ...this.projectForm.value});
  }
}
