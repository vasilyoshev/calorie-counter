import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from './../shared/entities/user';

@Injectable()
export class LoginService {

    isLoggedIn: boolean;

    constructor(private http: HttpClient) {
        this.isLoggedIn = false;
    }

    authenticateUser(user: User): Observable<any> {
        return this.http.post('user/authenticate', user, { withCredentials: true });
    }

    logoutUser(): Observable<any> {
        return this.http.get('user/logout', { withCredentials: true });
    }
}
