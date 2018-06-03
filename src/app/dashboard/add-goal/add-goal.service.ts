import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddGoalService {

  calories: any; // could be string from ngModel
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

  constructor(private fb: FormBuilder) {
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
  }

  calcDefaultMacros() {
    this.calories = +this.calories;
    this.proteinCals.next(Math.round(4 / 10 * this.calories));
    this.carbsCals.next(Math.round(4 / 10 * this.calories));
    this.fatCals.next(Math.round(2 / 10 * this.calories));
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

  setCarbsCals(event: any, protein: any) {
    const carbsCals = event.target.value;
    if (/^\d+$/.test(carbsCals)) {
      if (carbsCals > this.calories - protein) {
        this.carbsCals.next(this.calories - protein);
        return;
      }
      this.carbsCals.next(carbsCals);
    }
  }

  setFatCals(event: any, protein: any) {
    const fatCals = event.target.value;
    if (/^\d+$/.test(fatCals)) {
      if (fatCals > this.calories - protein) {
        this.carbsCals.next(this.calories - protein);
        return;
      }
      this.proteinCals.next(fatCals);
    }
  }

  setProteinGrams(event: any) {
    const proteinGrams = event.target.value;
    if (/^\d+$/.test(event.target.value)) {
      if (proteinGrams * 4 > this.calories) {
        this.proteinGrams.next(this.calories / 4);
        return;
      }
      this.proteinGrams.next(+event.target.value);
    }
  }

  setCarbsGrams(event: any, protein: any) {
    const carbsGrams = event.target.value;
    if (/^\d+$/.test(event.target.value)) {
      if (carbsGrams * 4 > this.calories - protein) {
        this.carbsGrams.next((this.calories - protein) / 4);
        return;
      }
      this.carbsGrams.next(+event.target.value);
    }
  }

  setFatGrams(event: any, protein: any) {
    const fatGrams = event.target.value;
    if (/^\d+$/.test(event.target.value)) {
      if (fatGrams * 9 > this.calories - protein) {
        this.fatGrams.next((this.calories - protein) / 9);
        return;
      }
      this.fatGrams.next(+event.target.value);
    }
  }

  setProteinPercent(event: any) {
    this.proteinPercent.next(event.value);
  }

  setCarbsPercent(event: any) {
    this.carbsPercent.next(event.value);
  }

  setFatPercent(event: any) {
    this.fatPercent.next(event.value);
  }

  formatProteinCalsOnBlur(event: any) {
    if (!event.target.value) {
      this.proteinCals.next(0);
      return;
    }
  }

  formatProteinGramsOnBlur(event: any) {
    if (!event.target.value) {
      this.proteinGrams.next(0);
      return;
    }
  }

  formatCarbsCalsOnBlur(event: any) {
    if (!event.target.value) {
      this.carbsCals.next(0);
      return;
    }
  }

  formatCarbsGramsOnBlur(event: any) {
    if (!event.target.value) {
      this.carbsGrams.next(0);
      return;
    }
  }

  formatFatCalsOnBlur(event: any) {
    if (!event.target.value) {
      this.fatCals.next(0);
      return;
    }
  }

  formatFatGramsOnBlur(event: any) {
    if (!event.target.value) {
      this.fatGrams.next(0);
      return;
    }
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
