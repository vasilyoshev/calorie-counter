import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoginService } from '../login/login.service';

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
                    if (response instanceof HttpErrorResponse && response.status === 403) {
                        this.loginService.loggedIn = false;
                        this.router.navigate(['']);
                        this.snackBar.open('Your session has expired!', 'OK', { duration: 5000 });
                    }
                    return throwError(response);
                })
            );
    }
}
