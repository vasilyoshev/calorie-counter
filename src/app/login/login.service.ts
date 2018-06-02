import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from './../shared/entities/user';

@Injectable()
export class LoginService {

    loggedIn: boolean;

    constructor(private http: HttpClient) {
        this.loggedIn = false;
    }

    login(user: User): Observable<any> {
        return this.http.post('user/login', user, { withCredentials: true });
    }

    logout(): Observable<any> {
        return this.http.post('user/logout', {}, { withCredentials: true });
    }

    isLoggedIn(): Observable<any> {
        return this.http.get('user/login', { withCredentials: true });
    }
}
