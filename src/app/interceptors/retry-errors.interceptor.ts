import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { retryWhen, mergeMap } from 'rxjs/operators';

/**
 * Retry server errors (status code 500) 5 times before continuing.
 */
@Injectable()
export class RetryErrorsInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const maxRetryAttempts = 4;
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
