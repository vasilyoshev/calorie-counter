import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { User } from '../shared/entities/user';
import { ProfileService } from '../profile/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    const user = new User();
    user.username = form.value.username;
    user.password = form.value.password;
    user.remember = this.shouldRemember;

    this.loginService.login(user).subscribe((data: any) => {
      this.spinner.show();
      this.loginService.loggedIn = true;
      this.profileService.user = data.user;
      this.profileService.getProfile().subscribe(() => {
        this.spinner.hide();
      }, (err) => {
        alert('login component getProfile()');
      });
      this.router.navigate(['']);
    }, (err: any) => {
      this.loginService.loggedIn = false;
      this.wrongCredentials = true;
    });
  }
}
