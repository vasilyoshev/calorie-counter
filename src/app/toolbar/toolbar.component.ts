import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';

import { LoginService } from '../login/login.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(
    private router: Router,
    public loginService: LoginService,
    public profileService: ProfileService,
    private spinner: NgxSpinnerService
  ) { }

  onLogout(): void {
    this.spinner.show();
    this.loginService.logout()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(() => {
        this.loginService.loggedIn = false;
        this.profileService.user = null;
        this.router.navigate(['']);
      });
  }
}
