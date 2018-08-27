import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { User } from '../shared/entities/user';
import { ValidatePassMatch } from '../shared/validators/pass-match.validator';

@Injectable()
export class RegisterService {
    constructor(
        private http: HttpClient,
        private fb: FormBuilder
    ) { }

    registerUser(user: User): Observable<any> {
        return this.http.post('user/register', user);
    }

    getFormGroup(): FormGroup {
        return this.fb.group({
            fname: ['', [Validators.required]],
            lname: ['', [Validators.required]],
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            passwords: this.fb.group({
                password: ['', [Validators.required]],
                confirmPassword: ['', [Validators.required]]
            }, { validator: ValidatePassMatch })
        });
    }
}
