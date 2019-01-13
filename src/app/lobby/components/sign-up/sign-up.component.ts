import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ValidationError } from 'src/app/shared/errors/validation.error';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User;

  submitted = false;
  waiting = false;

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.user = new User();
  }

  onSubmit(signupForm: NgForm) {
    this.submitted = true;

    if (signupForm.invalid) {
      return;
    }

    this.waiting = true;

    this.userService.create(this.user)
                    .subscribe((user: User) => {
                      // TODO: add toast
                      this.router.navigate(['log_in']);
                    },
                    error => {
                      // Only kind of http errors handled by the component
                      // Client-side validation was not thorough enough,
                      // or server introduced new constraints
                      if (error instanceof ValidationError) {
                        // TODO: implement
                        // show server validation error somewhere in the form
                      }
                      this.waiting = false;
                    });
  }
}
