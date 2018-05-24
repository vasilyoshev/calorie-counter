import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { User } from './../shared/entities/user';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }

    authenticateUser(user: User): Observable<any> {
        return this.http.post('users/authenticate', user);
    }
}
