import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddGoalService {

  calories: number;
  proteinPercent: number;
  proteinGrams: number;
  proteinCals: number;
  carbsPercent: number;
  carbsGrams: number;
  carbsCals: number;
  fatPercent: number;
  fatGrams: number;
  fatCals: number;

  calcMacros() {
    this.proteinCals = 4 / 10 * this.calories;
    this.carbsCals = 4 / 10 * this.calories;
    this.fatCals = 2 / 10 * this.calories;
    this.proteinGrams = this.proteinCals / 4;
    this.carbsGrams = this.carbsCals / 4;
    this.fatGrams = this.fatCals / 9;
    this.proteinPercent = this.proteinCals / this.calories * 100;
    this.carbsPercent = this.carbsCals / this.calories * 100;
    this.fatPercent = this.fatCals / this.calories * 100;
  }

  calcProtein(calories: number): number {
    return 4 / 10 * calories;
  }

  calcCarbs(calories: number): number {
    return 4 / 10 * calories;
  }

  calcFat(calories: number): number {
    return 2 / 10 * calories;
  }
}
