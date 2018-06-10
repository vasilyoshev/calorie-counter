import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoginService } from './../login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    canActivate() {
        if (!this.loginService.loggedIn) { // loggedIn on refresh always false
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}
