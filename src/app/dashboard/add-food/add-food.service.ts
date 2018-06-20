import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/internal/operators/map';

import { Food } from './../../shared/entities/food';

@Injectable({
  providedIn: 'root'
})
export class AddFoodService {

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

  addToBreakfast(food: Food) {
    return this.http.post('user/addFood', { food: food, type: 'Breakfast' }, { withCredentials: true }).subscribe();
  }
}
