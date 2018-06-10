import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddGoalService {

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.getFormGroup().get('formArray'); }

  calories: any; // could be string from ngModel
  proteinCals: number;
  proteinGrams: number;
  proteinPercent: number;
  carbsCals: number;
  carbsGrams: number;
  carbsPercent: number;
  fatCals: number;
  fatGrams: number;
  fatPercent: number;

  constructor(private fb: FormBuilder) {
    this.calories = 2000;
  }

  calcDefaultMacros() {
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

  setProteinCals(event: any) {
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

  setCarbsCals(event: any) {
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

  setFatCals(event: any) {
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

  setProteinGrams(event: any) {
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

  setCarbsGrams(event: any) {
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

  setFatGrams(event: any) {
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

  setProteinPercent(event: any) {
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

  setCarbsPercent(event: any) {
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

  setFatPercent(event: any) {
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

  formatProteinOnBlur(event: any) {
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

  formatCarbsOnBlur(event: any) {
    this.carbsCals = 0;
    this.carbsGrams = 0;
    this.carbsPercent = 0;

    this.fatCals = this.calories - this.proteinCals;
    this.fatGrams = Math.round(this.fatCals / 9);
    this.fatPercent = this.fatCals / this.calories * 100;
  }

  formatFatOnBlur(event: any) {
    this.fatCals = 0;
    this.fatGrams = 0;
    this.fatPercent = 0;

    this.carbsCals = this.calories - this.proteinCals;
    this.carbsGrams = Math.round(this.carbsCals / 4);
    this.carbsPercent = this.carbsCals / this.calories * 100;
  }

  getFormGroup() {
    return this.fb.group({
      formArray: this.fb.array([
        this.fb.group({
          calories: ['', [Validators.min(100), Validators.max(20000), Validators.required, Validators.pattern(/^\d+$/)]]
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
