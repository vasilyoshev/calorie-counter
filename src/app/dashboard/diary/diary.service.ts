import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ProfileService } from './../../profile/profile.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  cals: number;
  protein: number;
  carbs: number;
  fat: number;

  goalCals: number;
  goalProtein: number;
  goalCarbs: number;
  goalFat: number;

  summary: Array<any>;
  details: Object;

  constructor(
    public profileService: ProfileService,
    private http: HttpClient
  ) {
    this.cals = 500;
    this.protein = 500;
    this.carbs = 500;
    this.fat = 500;
    this.goalCals = profileService.user.goal.calories;
    this.goalProtein = profileService.user.goal.protein;
    this.goalCarbs = profileService.user.goal.carbs;
    this.goalFat = profileService.user.goal.fat;
    // this.summary = [
    //   {name: 'Daily Goal', calories: this.goalCals, protein: this.goalProtein, carbs: this.goalCarbs, fat: this.goalFat},
    //   {name: 'Total', calories: 500, protein: 100, carbs: 100, fat: 50},
    //   {name: 'Remaining', calories: this.goalCals - this.cals, protein: 100, carbs: 100, fat: 50}
    // ];
  }

  getDay(date: any) {
    return this.http.post('user/get-day', { date: date }, { withCredentials: true })
      .pipe(
        map((res: any) => {
          this.summary = res.summary;
          this.details = res.details;
        })
      );
  }
}
