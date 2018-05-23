import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }

    authenticateUser(user) {
        return this.http.post('users/authenticate', user);
    }
}
