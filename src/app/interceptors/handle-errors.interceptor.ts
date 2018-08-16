import { MatSnackBar } from '@angular/material';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError, of } from 'rxjs';
import { retryWhen, mergeMap, map, catchError } from 'rxjs/operators';

/**
 * Error handling for gateway timeout (504).
 */
@Injectable()
export class HandleErrorsInterceptor implements HttpInterceptor {

    snackBar: MatSnackBar;
    spinner: NgxSpinnerService;

    constructor(inj: Injector) {
        this.snackBar = inj.get(MatSnackBar);
        this.spinner = inj.get(NgxSpinnerService);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((err) => {
            this.spinner.hide();
            if (err.status === 500) {
                this.snackBar.open(err.error.message, 'OK', { duration: 5000 });
            } else if (err.status === 504) {
                const snackRef = this.snackBar.open('You are offline.', 'Retry');
                snackRef.onAction().subscribe(() => location.reload());
            } else {
                this.snackBar.open('Something went wrong.', 'OK', { duration: 5000 });
            }
            return throwError(err);
        }));
    }
}
