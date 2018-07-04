import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/internal/operators/map';

import { User } from './../shared/entities/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  user: User;

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get('user/profile', { withCredentials: true })
      .pipe(
        map((user: any) => {
          this.user = user;
        })
      );
  }

  setMealTypes(types: Array<string>) {
    return this.http.post('user/set-meal-types', { mealTypes: types }, { withCredentials: true });
  }
}
