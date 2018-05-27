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
    user.name = form.value.name;
    user.username = form.value.username;
    user.email = form.value.email;
    user.password = form.value.password;

    this.registerService.registerUser(user).subscribe((data: any) => {
      if (data.success) {
        alert('You are now registered and can log in.');
        this.router.navigate(['login']);
      } else {
        alert('Something went wrong.');
      }
    });
  }
}
