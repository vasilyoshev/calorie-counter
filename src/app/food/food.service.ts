import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

import { Food } from '../shared/entities/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  getFood(ndbno: string): Observable<Food> {
    return this.http
      .post<Food>('food/get-food', { ndbno: ndbno }, { withCredentials: true });
  }

  addToDiary(food: Food, quantity: number, type: string, date: Date): Observable<any> {
    return this.http.post('user/add-food', { food: food, quantity: quantity, type: type, date: date }, { withCredentials: true });
  }
}
