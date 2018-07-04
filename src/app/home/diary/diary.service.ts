import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ProfileService } from './../../profile/profile.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  summary: Array<any>;
  meals: any;

  constructor(
    public profileService: ProfileService,
    private http: HttpClient
  ) {
  }

  getDay(date: any) {
    return this.http.post('user/get-day', { date: date }, { withCredentials: true })
      .pipe(
        map((res: any) => {
          this.summary = res.summary;
          this.meals = res.meals;
          for (let i = 0; i < this.meals.length; i++) {
            // convert mongoose Date to JS local time Date
            const mealDate = new Date(this.meals[i].date);
            this.meals[i].time = mealDate.getHours() + ':' + mealDate.getMinutes();
          }
        })
      );
  }
}
