import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/shared/models/user.model';
import { ValidationError } from 'src/app/shared/errors/validation.error';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

  submitted = false;
  waiting = false;
  serverValidationError = '';

  showPassword = false;

  constructor(private router: Router,
              private toastService: ToastService,
              private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      'profile': this.formBuilder.group({
        'name': ['', [Validators.required,
                      Validators.maxLength(50)]],
        'email': ['', [Validators.required,
                       Validators.email]]
      }),
      'password': ['', [Validators.required,
                       Validators.minLength(8),
                       Validators.maxLength(30),
                       Validators.pattern(/^\S+$/)]]
    });
  }

  get name() {
    return this.signupForm.get('profile.name');
  }

  get email() {
    return this.signupForm.get('profile.email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.serverValidationError = '';
    this.waiting = true;

    this.userService.create(this.signupForm.value as User)
                    .subscribe((user: User) => {
                      this.router.navigate(['log_in']);
                      this.toastService.success('Account created! You may now log in.');
                    },
                    error => {
                      // Only kind of http errors handled by the component.
                      // Happens in case client-side validation was not thorough
                      // enough or API introduced new constraints.
                      if (error instanceof ValidationError) {
                        this.serverValidationError = error.message;
                      }
                      this.waiting = false;
                      this.signupForm.controls.password.reset();
                    });
  }
}
