import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.loggedInUser;
  }
}
