import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { RegisterService } from './register.service';
import { User } from '../shared/entities/user';
import { ValidatePassMatch } from '../shared/validators/pass-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.registerService.getFormGroup();
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    const user = new User();
    user.fname = form.value.fname;
    user.lname = form.value.lname;
    user.username = form.value.username;
    user.email = form.value.email;
    user.password = form.value.password;

    this.registerService.registerUser(user).subscribe((data: any) => {
      this.router.navigate(['login']);
    }, (err: any) => {
      if (err.error.emailUsed || err.error.usernameUsed) {
        if (err.error.emailUsed) {
          this.registerForm.controls['email'].setErrors({ 'taken': true });
        }
        if (err.error.usernameUsed) {
          this.registerForm.controls['username'].setErrors({ 'taken': true });
        }
      } else {
        alert('Something went wrong in register component.');
      }
    });
  }
}
