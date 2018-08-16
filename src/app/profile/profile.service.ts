import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

import { User } from '../shared/entities/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  user: User;

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    return this.http.get('user/profile', { withCredentials: true })
      .pipe(
        map((user: User) => {
          this.user = user;
        })
      );
  }

  setMealTypes(types: Array<string>): Observable<any> {
    return this.http.post('user/set-meal-types', { mealTypes: types }, { withCredentials: true });
  }
}
