import { Component, OnInit } from '@angular/core';

import { LoginService } from './login/login.service';
import { ProfileService } from './profile/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.loginService.isLoggedIn().subscribe(res => {
      this.loginService.loggedIn = res.loggedIn;
      if (res.loggedIn) {
        this.profileService.getProfile().subscribe();
      }
    }, (err) => {
      // alert('app component err');
      console.log(err);
    });
  }
}
