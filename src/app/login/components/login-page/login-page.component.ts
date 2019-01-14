import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { ValidationError } from 'src/app/shared/errors/validation.error';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  submitted = false;
  waiting = false;
  badCredentials = false;

  credentials = {
    email: '',
    password: ''
  };

  constructor(private router: Router,
              private authService: AuthService) { }

  onSubmit(loginForm: NgForm) {
    this.badCredentials = false;
    this.submitted = true;

    if (loginForm.invalid) {
      return;
    }

    this.waiting = true;

    this.authService.logIn(this.credentials.email, this.credentials.password)
                    .subscribe(
                      () => { this.router.navigate(['dashboard']); },
                      error => {
                        if (error instanceof ValidationError) {
                          this.waiting = false;
                          this.submitted = false;
                          this.badCredentials = true;
                          loginForm.reset();
                        }
                    });
  }
}
