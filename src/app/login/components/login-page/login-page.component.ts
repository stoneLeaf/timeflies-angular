import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { ValidationError } from 'src/app/shared/errors/validation.error';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  submitted = false;
  waiting = false;
  badCredentials = false;

  credentials = {
    email: '',
    password: ''
  };

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.onLoginNavigation();
    }
  }

  onSubmit(loginForm: NgForm) {
    this.badCredentials = false;
    this.submitted = true;

    if (loginForm.invalid) {
      return;
    }

    this.waiting = true;

    this.authService.logIn(this.credentials.email, this.credentials.password)
                    .subscribe(
                      () => { this.onLoginNavigation(); },
                      error => {
                        if (error instanceof ValidationError) {
                          this.waiting = false;
                          this.submitted = false;
                          this.badCredentials = true;
                          loginForm.reset();
                        }
                    });
  }

  onLoginNavigation() {
    if (this.authService.redirectAfterLogin) {
      this.router.navigateByUrl(this.authService.redirectAfterLogin);
    } else {
      this.router.navigate(['dashboard']);
    }
  }
}
