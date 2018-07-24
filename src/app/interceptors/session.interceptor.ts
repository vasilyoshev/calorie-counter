import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { LoginService } from './../login/login.service';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

    constructor(
        private loginService: LoginService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(req).pipe(
                catchError((response: HttpEvent<any>) => {
                    if (response instanceof HttpErrorResponse && response.error
                        && response.error.message === 'You must be logged in.') {
                        this.loginService.loggedIn = false;
                        this.router.navigate(['']); // TODO add session expired screen
                        this.snackBar.open('You must be logged in!', 'OK', { duration: 5000 });
                    }
                    return throwError(response);
                })
            );
    }
}
