import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoginService } from './../login/login.service';

@Injectable()
export class LoggedOutGuard implements CanActivate {

    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    canActivate(): boolean {
        if (this.loginService.loggedIn === false) { // loggedIn on refresh always false
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}
