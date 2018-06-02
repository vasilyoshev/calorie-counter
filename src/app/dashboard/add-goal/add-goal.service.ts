import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddGoalService {

  calories: number;
  protein: number;
  carbs: number;
  fat: number;

  proteinCals: Subject<number>;
  proteinGrams: Subject<number>;
  proteinPercent: Subject<number>;
  carbsCals: Subject<number>;
  carbsGrams: Subject<number>;
  carbsPercent: Subject<number>;
  fatCals: Subject<number>;
  fatGrams: Subject<number>;
  fatPercent: Subject<number>;

  constructor() {
    this.calories = 2000;
    this.proteinCals = new Subject<number>();
    this.proteinGrams = new Subject<number>();
    this.proteinPercent = new Subject<number>();
    this.carbsCals = new Subject<number>();
    this.carbsGrams = new Subject<number>();
    this.carbsPercent = new Subject<number>();
    this.fatCals = new Subject<number>();
    this.fatGrams = new Subject<number>();
    this.fatPercent = new Subject<number>();

    this.proteinCals.subscribe((cals) => {
      if (this.protein !== cals) {
        this.protein = cals;
        this.proteinGrams.next(cals / 4);
        this.proteinPercent.next(this.protein / this.calories * 100);
      }
    });
    this.proteinGrams.subscribe((grams) => {
      this.proteinCals.next(grams * 4);
    });
    this.proteinPercent.subscribe((percent) => {
      this.proteinCals.next(percent * this.calories / 100);
    });
  }

  calcDefaultMacros() {
    this.proteinCals.next(4 / 10 * this.calories);
    // this.proteinGrams.next(this.proteinCals.subscribe((cals: number) => {
    //   return cals / 4;
    // }));`
    // this.proteinPercent.next();
    // this.carbsCals.next();
    // this.carbsGrams.next();
    // this.carbsPercent.next();
    // this.fatCals.next();
    // this.fatGrams.next();
    // this.fatPercent.next();

    // this.proteinCals = 4 / 10 * this.calories;
    // this.carbsCals = 4 / 10 * this.calories;
    // this.fatCals = 2 / 10 * this.calories;
    // this.proteinGrams = this.proteinCals / 4;
    // this.carbsGrams = this.carbsCals / 4;
    // this.fatGrams = this.fatCals / 9;
    // this.proteinPercent = this.proteinCals / this.calories * 100;
    // this.carbsPercent = this.carbsCals / this.calories * 100;
    // this.fatPercent = this.fatCals / this.calories * 100;
  }

  calcProteinDefault(): number {
    return 4 / 10 * this.calories;
  }

  calcCarbsDefault(calories: number): number {
    return 4 / 10 * calories;
  }

  calcFatDefault(calories: number): number {
    return 2 / 10 * calories;
  }

  setProteinCals(event: any) {
    const proteinCals = event.target.value;
    if (/^\d+$/.test(proteinCals)) {
      if (proteinCals > this.calories) {
        this.proteinCals.next(this.calories);
        return;
      }
      this.proteinCals.next(proteinCals);
    }
  }

  fillProteinCalsIfEmpty(event: any) {
    if (!event.target.value) {
      this.proteinCals.next(this.calcProteinDefault());
      return;
    }
  }

  setProteinGrams(event: any) {
    if (/^\d+$/.test(event.target.value)) {
      this.proteinGrams.next(event.target.value);
    }
  }

  fillProteinGramsIfEmpty(event: any) {
    if (!event.target.value) {
      this.proteinGrams.next(this.calcProteinDefault() / 4);
      return;
    }
  }

  setProteinPercent(event: any) {
    this.proteinPercent.next(event.value);
  }
}
