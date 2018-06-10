import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './../login/login.service';
import { ProfileService } from './../profile/profile.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(
    private router: Router,
    public loginService: LoginService,
    public profileService: ProfileService
  ) { }

  onLogout() {
    this.loginService.logout().subscribe(() => {
      this.loginService.loggedIn = false;
      this.profileService.user = null;
      this.router.navigate(['']);
    });
  }
}
