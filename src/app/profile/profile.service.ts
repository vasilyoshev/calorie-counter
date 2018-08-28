import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

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

  addMealType(type: string): Observable<any> {
    this.user.mealTypes.push(type);
    return this.setMealTypes().pipe(catchError((err: any) => {
      const index = this.user.mealTypes.indexOf(type);
      if (index >= 0) {
        this.user.mealTypes.splice(index, 1);
      }
      return throwError(err);
    }));
  }

  removeMealType(type: string): Observable<any> {
    this.user.mealTypes.splice(this.user.mealTypes.indexOf(type), 1);

    return this.setMealTypes().pipe(catchError((err: any) => {
      this.user.mealTypes.push(type);
      return throwError(err);
    }));
  }

  setMealTypes(): Observable<any> {
    return this.http.post('user/set-meal-types', { mealTypes: this.user.mealTypes }, { withCredentials: true });
  }
}
