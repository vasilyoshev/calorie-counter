import { Component } from '@angular/core';

import { ProfileService } from './../profile/profile.service';
import { LoginService } from './../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    public loginService: LoginService,
    public profileService: ProfileService
  ) { }
}
