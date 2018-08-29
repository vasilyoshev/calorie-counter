import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Goal } from '../shared/entities/goal';

@Injectable({
  providedIn: 'root'
})
export class AddGoalService {

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.getFormGroup().get('formArray'); }

  calories: number;
  proteinCals: number;
  proteinGrams: number;
  proteinPercent: number;
  carbsCals: number;
  carbsGrams: number;
  carbsPercent: number;
  fatCals: number;
  fatGrams: number;
  fatPercent: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.calories = 2000;
  }

  setDailyGoal(dailyGoal: Goal): Observable<any> {
    return this.http.post('user/set-goal', dailyGoal, { withCredentials: true });
  }

  calcDefaultMacros(): void {
    this.calories = +this.calories;
    this.proteinCals = Math.round(4 / 10 * this.calories);
    this.carbsCals = Math.round(4 / 10 * this.calories);
    this.fatCals = Math.round(2 / 10 * this.calories);
    this.proteinGrams = Math.round(this.proteinCals / 4);
    this.carbsGrams = Math.round(this.carbsCals / 4);
    this.fatGrams = Math.round(this.fatCals / 9);
    this.proteinPercent = Math.round(this.proteinCals / this.calories * 100);
    this.carbsPercent = Math.round(this.carbsCals / this.calories * 100);
    this.fatPercent = Math.round(this.fatCals / this.calories * 100);
  }

  setProteinCals(event: any): void {
    const cals = event.target.value;
    if (/^\d+$/.test(cals)) {
      if (cals > this.calories) {
        this.proteinCals = this.calories;
      } else {
        this.proteinCals = cals;
      }
      this.proteinGrams = Math.round(this.proteinCals / 4);
      this.proteinPercent = this.proteinCals / this.calories * 100;

      this.carbsCals = Math.round((this.calories - this.proteinCals) * 0.666666);
      this.carbsGrams = Math.round(this.carbsCals / 4);
      this.carbsPercent = this.carbsCals / this.calories * 100;

      this.fatCals = this.calories - this.proteinCals - this.carbsCals;
      this.fatGrams = Math.round(this.fatCals / 9);
      this.fatPercent = this.fatCals / this.calories * 100;
    }
  }

  setCarbsCals(event: any): void {
    const cals = event.target.value;
    if (/^\d+$/.test(cals)) {
      if (cals > this.calories - this.proteinCals) {
        this.carbsCals = this.calories - this.proteinCals;
      } else {
        this.carbsCals = cals;
      }
      this.carbsGrams = Math.round(this.carbsCals / 4);
      this.carbsPercent = this.carbsCals / this.calories * 100;

      this.fatCals = this.calories - this.proteinCals - this.carbsCals;
      this.fatGrams = Math.round(this.fatCals / 9);
      this.fatPercent = this.fatCals / this.calories * 100;
    }
  }

  setFatCals(event: any): void {
    const cals = event.target.value;
    if (/^\d+$/.test(cals)) {
      if (cals > this.calories - this.proteinCals) {
        this.fatCals = this.calories - this.proteinCals;
      } else {
        this.fatCals = cals;
      }
      this.fatGrams = Math.round(this.fatCals / 9);
      this.fatPercent = this.fatCals / this.calories * 100;

      this.carbsCals = this.calories - this.proteinCals - this.fatCals;
      this.carbsGrams = Math.round(this.carbsCals / 4);
      this.carbsPercent = this.carbsCals / this.calories * 100;
    }
  }

  setProteinGrams(event: any): void {
    const grams = event.target.value;
    if (/^\d+$/.test(grams)) {
      if (grams * 4 > this.calories) {
        this.proteinGrams = this.calories / 4;
      } else {
        this.proteinGrams = +grams;
      }
      this.proteinCals = this.proteinGrams * 4;
      this.proteinPercent = this.proteinCals / this.calories * 100;

      this.carbsCals = Math.round((this.calories - this.proteinCals) * 0.666666); // make it const
      this.carbsGrams = Math.round(this.carbsCals / 4);
      this.carbsPercent = this.carbsCals / this.calories * 100;

      this.fatCals = this.calories - this.proteinCals - this.carbsCals;
      this.fatGrams = Math.round(this.fatCals / 9);
      this.fatPercent = this.fatCals / this.calories * 100;
    }
  }

  setCarbsGrams(event: any): void {
    const grams = event.target.value;
    if (/^\d+$/.test(grams)) {
      if (grams * 4 > this.calories - this.proteinCals) {
        this.carbsGrams = Math.round((this.calories - this.proteinCals) / 4);
      } else {
        this.carbsGrams = +grams;
      }
      this.carbsCals = this.carbsGrams * 4;
      this.carbsPercent = this.carbsCals / this.calories * 100;

      this.fatCals = this.calories - this.proteinCals - this.carbsCals;
      this.fatGrams = Math.round(this.fatCals / 9);
      this.fatPercent = this.fatCals / this.calories * 100;
    }
  }

  setFatGrams(event: any): void {
    const grams = event.target.value;
    if (/^\d+$/.test(grams)) {
      if (grams * 9 > this.calories - this.proteinCals) {
        this.fatGrams = Math.round((this.calories - this.proteinCals) / 9);
      } else {
        this.fatGrams = +grams;
      }
      this.fatCals = this.fatGrams * 9;
      this.fatPercent = this.fatCals / this.calories * 100;

      this.carbsCals = this.calories - this.proteinCals - this.fatCals;
      this.carbsGrams = Math.round(this.carbsCals / 4);
      this.carbsPercent = this.carbsCals / this.calories * 100;
    }
  }

  setProteinPercent(event: any): void {
    this.proteinPercent = event.value;
    this.proteinCals = Math.round(this.proteinPercent / 100 * this.calories);
    this.proteinGrams = Math.round(this.proteinCals / 4);

    this.carbsCals = Math.round((this.calories - this.proteinCals) * 0.666666);
    this.carbsGrams = Math.round(this.carbsCals / 4);
    this.carbsPercent = this.carbsCals / this.calories * 100;

    this.fatCals = this.calories - this.proteinCals - this.carbsCals;
    this.fatGrams = Math.round(this.fatCals / 9);
    this.fatPercent = this.fatCals / this.calories * 100;
  }

  setCarbsPercent(event: any): void {
    if (event.value > 100 - this.proteinPercent) {
      this.carbsPercent = 100 - this.proteinPercent;
    } else {
      this.carbsPercent = event.value;
    }
    this.carbsCals = Math.round(this.carbsPercent / 100 * this.calories);
    this.carbsGrams = Math.round(this.carbsCals / 4);

    this.fatCals = this.calories - this.proteinCals - this.carbsCals;
    this.fatGrams = Math.round(this.fatCals / 9);
    this.fatPercent = this.fatCals / this.calories * 100;
  }

  setFatPercent(event: any): void {
    if (event.value > 100 - this.proteinPercent) {
      this.fatPercent = 100 - this.proteinPercent;
    } else {
      this.fatPercent = event.value;
    }
    this.fatCals = Math.round(this.fatPercent / 100 * this.calories);
    this.fatGrams = Math.round(this.fatCals / 9);

    this.carbsCals = this.calories - this.proteinCals - this.fatCals;
    this.carbsGrams = Math.round(this.carbsGrams / 4);
    this.carbsPercent = this.carbsCals / this.calories * 100;
  }

  resetProtein(event: any): void {
    this.proteinCals = 0;
    this.proteinGrams = 0;
    this.proteinPercent = 0;

    this.carbsCals = Math.round((this.calories - this.proteinCals) * 0.666666); // make it const
    this.carbsGrams = Math.round(this.carbsCals / 4);
    this.carbsPercent = this.carbsCals / this.calories * 100;

    this.fatCals = this.calories - this.proteinCals - this.carbsCals;
    this.fatGrams = Math.round(this.fatCals / 9);
    this.fatPercent = this.fatCals / this.calories * 100;
  }

  resetCarbs(event: any): void {
    this.carbsCals = 0;
    this.carbsGrams = 0;
    this.carbsPercent = 0;

    this.fatCals = this.calories - this.proteinCals;
    this.fatGrams = Math.round(this.fatCals / 9);
    this.fatPercent = this.fatCals / this.calories * 100;
  }

  resetFat(event: any): void {
    this.fatCals = 0;
    this.fatGrams = 0;
    this.fatPercent = 0;

    this.carbsCals = this.calories - this.proteinCals;
    this.carbsGrams = Math.round(this.carbsCals / 4);
    this.carbsPercent = this.carbsCals / this.calories * 100;
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      formArray: this.fb.array([
        this.fb.group({
          calories: [2000, [Validators.min(100), Validators.max(20000), Validators.required, Validators.pattern(/^\d+$/)]]
        }),
        this.fb.group({
          protein: ['', [Validators.min(0), Validators.max(20000), Validators.required, Validators.pattern(/^\d+$/)]],
          carbs: ['', [Validators.min(0), Validators.max(20000), Validators.required, Validators.pattern(/^\d+$/)]],
          fat: ['', [Validators.min(0), Validators.max(20000), Validators.required, Validators.pattern(/^\d+$/)]]
        })
      ])
    });
  }
}
