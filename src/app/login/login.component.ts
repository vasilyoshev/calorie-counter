import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { AuthService } from './../auth.service';
import { User } from '../shared/entities/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isValid = true;
  wrongCredentials = false;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
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
      this.isValid = false;
      return;
    }
    const user = new User();
    user.username = form.value.username;
    user.password = form.value.password;

    this.loginService.authenticateUser(user).subscribe((data: any) => {
      if (data.success) {
        alert(data.msg);
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['dashboard']);
      } else {
        this.wrongCredentials = true;
      }
    });
  }

}
