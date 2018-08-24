import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { finalize } from 'rxjs/internal/operators/finalize';
import { NgxSpinnerService } from 'ngx-spinner';

import { LoginService } from './login.service';
import { User } from '../shared/entities/user';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  shouldRemember: boolean;
  wrongCredentials: boolean;

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.wrongCredentials = false;
    this.shouldRemember = false;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) {
      return;
    }
    const user = new User();
    user.username = form.value.username;
    user.password = form.value.password;
    user.remember = this.shouldRemember;

    this.spinner.show();
    this.loginService.login(user)
      .subscribe(() => {
        this.spinner.show();
        this.loginService.loggedIn = true;
        this.profileService.getProfile()
          .pipe(finalize(() => this.spinner.hide()))
          .subscribe(() => {
            this.router.navigate(['']);
          });
      }, () => {
        this.loginService.loggedIn = false;
      });
  }
}
