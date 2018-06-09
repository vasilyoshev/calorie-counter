import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoginService } from './../login/login.service';

@Injectable()
export class LoggedOutGuard implements CanActivate {

    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    canActivate() {
        if (this.loginService.loggedIn) {
            this.router.navigate(['']);
            return false;
        }
        return true;
        // return !this.loginService.loggedIn ? true : this.router.navigate(['']);
    }
}
