import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/internal/operators/map';

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
          return res.food.foods[0].food;
        })
      );
  }
}
