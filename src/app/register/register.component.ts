import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { RegisterService } from './register.service';
import { User } from '../shared/entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registerForm = this.registerService.getFormGroup();
  }

  submit(form: FormGroup): void {
    if (!form.valid) {
      return;
    }
    const user = new User();
    user.fname = form.value.fname;
    user.lname = form.value.lname;
    user.username = form.value.username;
    user.email = form.value.email;
    user.password = form.value.passwords.password;

    this.registerService.registerUser(user).subscribe(() => {
      this.router.navigate(['login']);
      this.snackBar.open('Registration successful!', 'OK', { duration: 5000 });
    }, (err: HttpErrorResponse) => {
      if (err.error.emailUsed) {
        this.registerForm.controls['email'].setErrors({ 'taken': true });
      }
      if (err.error.usernameUsed) {
        this.registerForm.controls['username'].setErrors({ 'taken': true });
      }
    });
  }
}
