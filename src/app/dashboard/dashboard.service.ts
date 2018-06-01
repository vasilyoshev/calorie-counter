import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  setDailyGoal(dailyGoal: any) {
    return this.http.post('user/set-goal', dailyGoal, { withCredentials: true });
  }
}
