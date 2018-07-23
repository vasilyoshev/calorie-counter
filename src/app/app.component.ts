import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';

import { LoginService } from './login/login.service';
import { ProfileService } from './profile/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.loginService.isLoggedIn()
      .subscribe(res => {
        if (res) {
          this.profileService.getProfile()
            .pipe(finalize(() => this.spinner.hide()))
            .subscribe();
        } else {
          this.spinner.hide();
        }
      }, (err) => {
        alert('app component err ' + err); // TODO
      });
  }
}
