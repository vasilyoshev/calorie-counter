import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name: string;
  username: string;
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    if (!this.validateRegister(user)) {
      alert('Please fill in all fields.');
      return;
    }

    if (!this.validateEmail(user.email)) {
      alert('Please use a valid email.');
      return;
    }

    this.authService.registerUser(user).subscribe((data: any) => {
      if (data.success) {
        alert('You are now registered and can log in.');
        this.router.navigate(['/login']);
      } else {
        alert('Something went wrong.');
        this.router.navigate(['/register']);
      }
    });
  }

  private validateRegister(user: any) {
    if (user.name === undefined || user.username === undefined
    || user.email === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
  }

  private validateEmail(email: string) {
    const re = new RegExp (['^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]',
    '{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'].join(''));
    return true; // re.test(email.toLowerCase());
  }
}
