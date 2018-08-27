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
            switch (err.status) {
                case 500:
                    this.snackBar.open(err.error.message, 'OK', { duration: 5000 });
                    break;
                case 504:
                    const offlineSnackRef = this.snackBar.open('You are offline.', 'Retry');
                    offlineSnackRef.onAction().subscribe(() => location.reload());
                    break;
                case 400:
                    this.snackBar.open(err.error.message, 'OK', { duration: 5000 });
                    break;
                case 403:
                    this.loginService.loggedIn = false;
                    this.router.navigate(['']);
                    const sessionSnackRef = this.snackBar.open('Your session has expired!', 'OK');
                    // Dismiss snackbar on navigation
                    const routerSub = this.router.events.subscribe(() => {
                        sessionSnackRef.dismiss();
                        routerSub.unsubscribe();
                    });
                    break;
                case 422:
                    this.snackBar.open('Input is invalid.', 'OK', { duration: 5000 });
                    break;
                default:
                    this.snackBar.open('Something went wrong.', 'OK', { duration: 5000 });
            }
            // rethrow error to be handled by other interceptors or components in spacific cases
            return throwError(err);
        }));
    }
}
