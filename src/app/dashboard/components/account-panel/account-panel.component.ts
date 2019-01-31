import { Component, OnInit, HostListener } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-account-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.scss']
})
export class AccountPanelComponent implements OnInit {
  user: User;

  dropdownVisible = false;
  ignoreClick = false;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.loggedInUser;
  }

  showDropdown() {
    this.dropdownVisible = true;
  }

  logOut() {
    this.authService.clearToken();
    this.router.navigate(['log_in']);
  }

  @HostListener('click', ['$event.target'])
  onClickInside(target) {
    if (target.tagName.toLowerCase() !== 'a') {
      this.ignoreClick = true;
    }
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (this.ignoreClick) {
      this.ignoreClick = false;
      return;
    }
    this.dropdownVisible = false;
  }
}
