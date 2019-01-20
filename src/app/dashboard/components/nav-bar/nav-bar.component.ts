import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  user: User;

  constructor(private router: Router,
              private authService: AuthService) {
    this.user = authService.loggedInUser;
  }

  logOut() {
    this.authService.clearToken();
    this.router.navigate(['log_in']);
  }
}
