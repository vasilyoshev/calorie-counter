import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

import { DiaryTableData } from './../../shared/entities/diary-table-data';
import { Meal } from './../../shared/entities/meal';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  summary: Array<DiaryTableData>;
  meals: Array<Meal>;
  currentDate: Date;

  constructor(private http: HttpClient) { }

  getDay(date: Date): Observable<any> {
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
