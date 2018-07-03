import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/internal/operators/map';

import { Food } from './../shared/entities/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  getFood(ndbno: number) {
    return this.http
      .post('food/getFood', { ndbno: ndbno }, { withCredentials: true })
      .pipe(
        map((res: any) => {
          return res.food;
        })
      );
  }

  addToDiary(food: Food, quantity: number, type: string) {
    const date = new Date()
    return this.http.post('user/addFood', { food: food, quantity: quantity, type: type, date: date }, { withCredentials: true });
  }
}
