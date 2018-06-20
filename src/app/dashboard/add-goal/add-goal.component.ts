import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ProfileService } from './../../profile/profile.service';
import { AddGoalService } from './add-goal.service';
import { DashboardService } from './../dashboard.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.scss']
})
export class AddGoalComponent implements OnInit {

  addGoalForm: FormGroup;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.addGoalForm.get('formArray'); }

  constructor(
    public addGoalService: AddGoalService,
    private dashboardService: DashboardService,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit() {
    this.addGoalForm = this.addGoalService.getFormGroup();
  }

  onSubmit(form: FormGroup) {
    this.addGoalForm.updateValueAndValidity();
    if (!form.valid) {
      return;
    }

    const dailyGoal = {
      username: this.profileService.user.username,
      calories: Number(form.value.formArray[0].calories),
      protein: form.value.formArray[1].protein,
      carbs: form.value.formArray[1].carbs,
      fat: form.value.formArray[1].fat
    };

    this.dashboardService.setDailyGoal(dailyGoal)
      .subscribe((data: any) => {
        if (data.success) {
          this.profileService.user.goal = data.user.goals[data.user.goals.length - 1];
          this.router.navigate(['']);
        } else {
          alert('Something went wrong add goal.');
        }
      });
  }

  formatLabel(value: number | null) {
    return value ? value + '%' : 0 + '%';
  }

  calcDefaultMacros() {
    this.addGoalService.calcDefaultMacros();
    this.formArray.get([1]).get('protein').setValue(this.addGoalService.proteinCals);
    this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
    this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
  }

  setProteinCals(event: any) {
    if (event.target.value) {
      this.addGoalService.setProteinCals(event);
      this.formArray.get([1]).get('protein').setValue(this.addGoalService.proteinCals);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
    }
  }

  setCarbsCals(event: any) {
    if (event.target.value) {
      this.addGoalService.setCarbsCals(event);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
    }
  }

  setFatCals(event: any) {
    if (event.target.value) {
      this.addGoalService.setFatCals(event);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
    }
  }

  setProteinGrams(event: any) {
    if (event.target.value) {
      this.addGoalService.setProteinGrams(event);
      this.formArray.get([1]).get('protein').setValue(this.addGoalService.proteinCals);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
    }
  }

  setCarbsGrams(event: any) {
    if (event.target.value) {
      this.addGoalService.setCarbsGrams(event);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
    }
  }

  setFatGrams(event: any) {
    if (event.target.value) {
      this.addGoalService.setFatGrams(event);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
    }
  }

  setProteinPercent(event: any) {
    this.addGoalService.setProteinPercent(event);
    this.formArray.get([1]).get('protein').setValue(this.addGoalService.proteinCals);
    this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
    this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
  }

  setCarbsPercent(event: any) {
    this.addGoalService.setCarbsPercent(event);
    this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
    this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
  }

  setFatPercent(event: any) {
    this.addGoalService.setFatPercent(event);
    this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
    this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
  }

  formatProteinOnBlur(event: any) {
    if (!event.target.value) {
      this.addGoalService.formatProteinOnBlur(event);
      this.formArray.get([1]).get('protein').setValue(this.addGoalService.proteinCals);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
    }
  }

  formatCarbsOnBlur(event: any) {
    if (!event.target.value) {
      this.addGoalService.formatCarbsOnBlur(event);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
    }
  }

  formatFatOnBlur(event: any) {
    if (!event.target.value) {
      this.addGoalService.formatFatOnBlur(event);
      this.formArray.get([1]).get('fat').setValue(this.addGoalService.fatCals);
      this.formArray.get([1]).get('carbs').setValue(this.addGoalService.carbsCals);
    }
  }
}
