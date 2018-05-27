import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { User } from '../shared/entities/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  wrongCredentials = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) { }

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

    this.loginService.login(user).subscribe((data: any) => {
      if (data.success) {
        this.loginService.loggedIn = true;
        this.router.navigate(['']);
      } else {
        this.loginService.loggedIn = false;
        this.wrongCredentials = true;
      }
    });
  }
}
