import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from './../shared/entities/user';

@Injectable()
export class LoginService {

    isLoggedIn: boolean;

    constructor(private http: HttpClient) {
        this.isLoggedIn = !!localStorage.getItem('id_token');
    }

    authenticateUser(user: User): Observable<any> {
        return this.http.post('user/authenticate', user);
    }

    setToken(token: string) {
        localStorage.setItem('id_token', token);
    }

    logoutUser(): void {
        localStorage.clear();
        this.isLoggedIn = false;
    }
}
