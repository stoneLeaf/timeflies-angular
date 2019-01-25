import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ValidationError } from 'src/app/shared/errors/validation.error';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User;

  submitted = false;
  waiting = false;
  serverValidationError = '';

  showPassword = false;

  constructor(private router: Router,
              private toastService: ToastService,
              private userService: UserService) { }

  ngOnInit() {
    this.user = new User();
  }

  onSubmit(signupForm: NgForm) {
    this.submitted = true;

    if (signupForm.invalid) {
      return;
    }

    this.serverValidationError = '';
    this.waiting = true;

    this.userService.create(this.user)
                    .subscribe((user: User) => {
                      this.router.navigate(['log_in']);
                      this.toastService.success('Account created! You may now log in.');
                    },
                    error => {
                      // Only kind of http errors handled by the component
                      // Client-side validation was not thorough enough,
                      // or server introduced new constraints
                      if (error instanceof ValidationError) {
                        this.serverValidationError = error.message;
                      }
                      this.waiting = false;
                      signupForm.controls['password'].reset();
                    });
  }
}
