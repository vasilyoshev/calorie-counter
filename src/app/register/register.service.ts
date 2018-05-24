import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { User } from '../shared/entities/user';
import { ValidatePassMatch } from '../shared/validators/pass-match.validator';

@Injectable()
export class RegisterService {
    constructor(
        private http: HttpClient,
        private fb: FormBuilder
    ) { }

    registerUser(user: User): Observable<any> {
        return this.http.post('users/register', user);
    }

    getFormGroup() {
        return this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]],
        }, { validator: ValidatePassMatch });
    }
}
