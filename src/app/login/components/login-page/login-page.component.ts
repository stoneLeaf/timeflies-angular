import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { ValidationError } from 'src/app/shared/errors/validation.error';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  submitted = false;
  waiting = false;
  badCredentials = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.badCredentials = false;
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.waiting = true;

    this.authService.logIn(this.f.email.value, this.f.password.value)
                    .subscribe(
                      _ => { this.onLoginNavigation(); },
                      error => {
                        if (error instanceof ValidationError) {
                          this.submitted = false;
                          this.badCredentials = true;
                          this.loginForm.reset();
                        }
                        this.waiting = false;
                    });
  }

  private onLoginNavigation() {
    if (this.authService.redirectAfterLogin) {
      this.router.navigateByUrl(this.authService.redirectAfterLogin);
    } else {
      this.router.navigate(['']);
    }
  }
}
