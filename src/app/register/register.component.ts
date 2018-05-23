import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { RegisterService } from './register.service';
import { User } from '../shared/entities/user';
import { ValidatePassMatch } from '../shared/validators/pass-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isValid: boolean;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.isValid = true;
   }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: ValidatePassMatch });
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      this.isValid = false;
      return;
    }
    const user = new User();
    user.name = form.value.name;
    user.username = form.value.username;
    user.email = form.value.email;
    user.password = form.value.password;

    this.registerService.registerUser(user).subscribe((data: any) => {
      if (data.success) {
        alert('You are now registered and can log in.');
        this.router.navigate(['/login']);
      } else {
        alert('Something went wrong.');
      }
    });
  }
}
