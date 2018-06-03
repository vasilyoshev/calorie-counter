import { ProfileService } from './../../profile/profile.service';
import { AddGoalService } from './add-goal.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { DashboardService } from './../dashboard.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.scss']
})
export class AddGoalComponent implements OnInit {

  calories: any;
  protein: number;
  carbs: number;
  fat: number;

  addGoalForm: FormGroup;
  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.addGoalForm.get('formArray'); }

  constructor(
    public addGoalService: AddGoalService,
    private dashboardService: DashboardService,
    private profileService: ProfileService
  ) {
    this.calories = 2000;
  }

  ngOnInit() {
    this.addGoalForm = this.addGoalService.getFormGroup();

    // PROTEIN
    this.addGoalService.proteinCals.subscribe((cals: number) => {
      if (this.protein !== cals) {
        this.protein = cals;
        this.addGoalService.proteinGrams.next(cals / 4);
        this.addGoalService.proteinPercent.next(this.protein / this.calories * 100);
        this.addGoalService.carbsCals.next((this.calories - this.protein) * 0.666666);
      }
      this.formArray.get([1]).get('protein').setValue(this.protein);
    });
    this.addGoalService.proteinGrams.subscribe((grams: number) => {
      if (this.protein !== grams * 4) {
        this.addGoalService.proteinCals.next(Math.round(grams * 4));
      }
    });
    this.addGoalService.proteinPercent.subscribe((percent: number) => {
      if (this.protein !== percent * this.calories / 100) {
        this.addGoalService.proteinCals.next(Math.round(percent * this.calories / 100));
      }
    });

    // CARBS
    this.addGoalService.carbsCals.subscribe((cals: number) => {
      if (this.carbs !== cals) {
        this.carbs = cals;
        this.addGoalService.carbsGrams.next(cals / 4);
        this.addGoalService.carbsPercent.next(this.carbs / this.calories * 100);
        this.addGoalService.fatCals.next((this.calories - this.protein) * 0.333333);
      }
      this.formArray.get([1]).get('carbs').setValue(this.carbs);
    });
    this.addGoalService.carbsGrams.subscribe((grams: number) => {
      if (this.carbs !== grams * 4) {
        this.addGoalService.carbsCals.next(Math.round(grams * 4));
      }
    });
    this.addGoalService.carbsPercent.subscribe((percent: number) => {
      if (this.carbs !== percent * this.calories / 100) {
        this.addGoalService.carbsCals.next(Math.round(percent * this.calories / 100));
      }
    });

    // FAT
    this.addGoalService.fatCals.subscribe((cals: number) => {
      if (this.fat !== cals) {
        this.fat = cals;
        this.addGoalService.fatGrams.next(cals / 9);
        this.addGoalService.fatPercent.next(this.fat / this.calories * 100);
      }
      this.formArray.get([1]).get('fat').setValue(this.fat);
    });
    this.addGoalService.fatGrams.subscribe((grams: number) => {
      if (this.fat !== grams * 9) {
        this.addGoalService.fatCals.next(Math.round(grams * 9));
      }
    });
    this.addGoalService.fatPercent.subscribe((percent: number) => {
      if (this.fat !== percent * this.calories / 100) {
        this.addGoalService.fatCals.next(Math.round(percent * this.calories / 100));
      }
    });
  }

  onSubmit(form: FormGroup) {
    this.addGoalForm.updateValueAndValidity();
    if (!form.valid) {
      return;
    }

    const dailyGoal = {
      username: this.profileService.user.username,
      calories: form.value.formArray[0].calories,
      protein: form.value.formArray[1].protein,
      carbs: form.value.formArray[1].carbs,
      fat: form.value.formArray[1].fat
    };

    this.dashboardService.setDailyGoal(dailyGoal)
      .subscribe((data: any) => {
        if (data.success) {
          this.profileService.user.goal = data.user.goals[data.user.goals.length - 1];
        } else {
          alert('Something went wrong add goal.');
        }
      });
  }

  formatLabel(value: number | null) {
    return value ? value + '%' : 0 + '%';
  }
}
