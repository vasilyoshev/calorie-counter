import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { finalize } from 'rxjs/internal/operators/finalize';
import { NgxSpinnerService } from 'ngx-spinner';

import { Goal } from '../shared/entities/goal';
import { ProfileService } from '../profile/profile.service';
import { AddGoalService } from './add-goal.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.scss']
})
export class AddGoalComponent implements OnInit {

  addGoalForm: FormGroup;
  @Output() addGoal = new EventEmitter();

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.addGoalForm.get('formArray'); }

  constructor(
    public addGoalService: AddGoalService,
    private profileService: ProfileService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.addGoalForm = this.addGoalService.getFormGroup();
    this.calcDefaultMacros();
  }

  onSubmit(form: FormGroup): void {
    this.addGoalForm.updateValueAndValidity();
    if (!form.valid) {
      return;
    }

    const dailyGoal = new Goal();
    dailyGoal.username = this.profileService.user.username;
    dailyGoal.calories = Number(form.value.formArray[0].calories);
    dailyGoal.protein = form.value.formArray[1].protein;
    dailyGoal.carbs = form.value.formArray[1].carbs;
    dailyGoal.fat = form.value.formArray[1].fat;

    this.spinner.show();
    this.addGoalService.setDailyGoal(dailyGoal)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe((data: any) => {
        this.profileService.user.goal = data.goal;
        this.router.navigate(['']);
        this.snackBar.open(data.message, 'OK', { duration: 5000 });
        this.addGoal.emit();
      }, (err: HttpErrorResponse) => {
        this.snackBar.open(err.error.message, 'OK', { duration: 5000 });
      });
  }

  formatLabel(value: number | null): string {
    return value ? value + '%' : 0 + '%';
  }

  calcDefaultMacros(): void {
    this.addGoalService.calcDefaultMacros();
    this.formArray.get([1]).get('protein').setValue(this.addGoalService.proteinCals);
    this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
    this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
  }

  setProteinCals(event: any): void {
    if (event.target.value) {
      this.addGoalService.setProteinCals(event);
      this.formArray.get([1]).get('protein').setValue(this.addGoalService.proteinCals);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
    }
  }

  setCarbsCals(event: any): void {
    if (event.target.value) {
      this.addGoalService.setCarbsCals(event);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
    }
  }

  setFatCals(event: any): void {
    if (event.target.value) {
      this.addGoalService.setFatCals(event);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
    }
  }

  setProteinGrams(event: any): void {
    if (event.target.value) {
      this.addGoalService.setProteinGrams(event);
      this.formArray.get([1]).get('protein').setValue(this.addGoalService.proteinCals);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
    }
  }

  setCarbsGrams(event: any): void {
    if (event.target.value) {
      this.addGoalService.setCarbsGrams(event);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
    }
  }

  setFatGrams(event: any): void {
    if (event.target.value) {
      this.addGoalService.setFatGrams(event);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
    }
  }

  setProteinPercent(event: any): void {
    this.addGoalService.setProteinPercent(event);
    this.formArray.get([1]).get('protein').setValue(this.addGoalService.proteinCals);
    this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
    this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
  }

  setCarbsPercent(event: any): void {
    this.addGoalService.setCarbsPercent(event);
    this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
    this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
  }

  setFatPercent(event: any): void {
    this.addGoalService.setFatPercent(event);
    this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
    this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
  }

  formatProteinOnBlur(event: any): void {
    if (!event.target.value) {
      this.addGoalService.formatProteinOnBlur(event);
      this.formArray.get([1]).get('protein').setValue(this.addGoalService.proteinCals);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
    }
  }

  formatCarbsOnBlur(event: any): void {
    if (!event.target.value) {
      this.addGoalService.formatCarbsOnBlur(event);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
    }
  }

  formatFatOnBlur(event: any): void {
    if (!event.target.value) {
      this.addGoalService.formatFatOnBlur(event);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
    }
  }
}
