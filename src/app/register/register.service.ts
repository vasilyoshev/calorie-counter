import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { User } from '../shared/entities/user';

@Injectable()
export class RegisterService {
    constructor(private http: HttpClient) { }

    registerUser(user: User) {
        return this.http.post('users/register', user);
    }
}
