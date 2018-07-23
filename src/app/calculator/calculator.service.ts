import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  getRee(gender: string, weight: number, height: number, age: number): number {
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }

  getTdee(ree: number, activity: string): number {
    switch (activity) {
      case 'sedentary':
        return ree * 1.2;
      case 'light':
        return ree * 1.375;
      case 'moderate':
        return ree * 1.55;
      case 'high':
        return ree * 1.725;
    }
  }

  getGoalCalories(tdee: number, goal: string): number {
    switch (goal) {
      case 'lose':
        return tdee - (tdee * 0.20);
      case 'maintain':
        return tdee;
      case 'gain':
        return tdee + (tdee * 0.20);
    }
  }
}
