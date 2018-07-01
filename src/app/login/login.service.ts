import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from './../shared/entities/user';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class LoginService {

    loggedIn: boolean;

    constructor(private http: HttpClient) {
    }

    login(user: User): Observable<any> {
        return this.http.post('user/login', user, { withCredentials: true });
    }

    logout(): Observable<any> {
        return this.http.get('user/logout', { withCredentials: true });
    }

    isLoggedIn(): Observable<any> {
        return this.http.get('user/login', { withCredentials: true })
        .pipe(map((res: any) => this.loggedIn = res.loggedIn));
    }
}
