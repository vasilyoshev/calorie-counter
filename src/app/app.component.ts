import { Component, OnInit } from '@angular/core';

import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.isLoggedIn().subscribe(res => {
      this.loginService.loggedIn = res.loggedIn;
    }, (err) => {
      // alert('app component err');
      console.log(err);
    });
  }
}
