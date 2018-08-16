import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoginService } from './../login/login.service';

/**
 * Error handling for gateway timeout (504).
 */
@Injectable()
export class HandleErrorsInterceptor implements HttpInterceptor {

    constructor(
        private loginService: LoginService,
        private snackBar: MatSnackBar,
        private spinner: NgxSpinnerService,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((err) => {
            this.spinner.hide();
            if (err.status === 500) {
                this.snackBar.open(err.error.message, 'OK', { duration: 5000 });
            } else if (err.status === 504) {
                const snackRef = this.snackBar.open('You are offline.', 'Retry');
                snackRef.onAction().subscribe(() => location.reload());
            } else if (err.status === 403) {
                this.loginService.loggedIn = false;
                this.router.navigate(['']);
                const snackRef = this.snackBar.open('Your session has expired!', 'OK');
                // Dismiss snackbar on navigation
                const routerSub = this.router.events.subscribe(() => {
                    snackRef.dismiss();
                    routerSub.unsubscribe();
                });
            } else {
                this.snackBar.open('Something went wrong.', 'OK', { duration: 5000 });
            }
            return throwError(err);
        }));
    }
}
