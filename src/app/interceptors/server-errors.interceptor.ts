import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { retryWhen, mergeMap } from 'rxjs/operators';

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const maxRetryAttempts = 5;
        const targetStatusCode = 500;
        return next.handle(req).pipe(retryWhen((errors) => {
            return errors.pipe(mergeMap((error, i) => {
                const retryAttempt = i + 1;
                if (retryAttempt > maxRetryAttempts || error.status !== targetStatusCode) {
                    return throwError(error);
                }
                return of(true);
            }));
        }));
    }
}
