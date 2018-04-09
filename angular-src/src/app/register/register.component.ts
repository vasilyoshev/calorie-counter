import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';

import { ValidateService } from './../validate.service';

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
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService
  ) { }

  onSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    if(!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('Please fill in all fields',
    {cssClass: 'alert-danger', timeout: 3000});
      return;
    }

    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show('Please use a valid email',
    {cssClass: 'alert-danger', timeout: 3000});
      return;
    }
  }
}
