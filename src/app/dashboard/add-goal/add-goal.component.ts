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

  addGoalForm: FormGroup;
  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.addGoalForm.get('formArray'); }

  constructor(
    public addGoalService: AddGoalService,
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.addGoalForm = this.fb.group({
      formArray: this.fb.array([
        this.fb.group({
          calories: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
        }),
        this.fb.group({
          protein: ['', [Validators.pattern(/^\d+$/)]],
          carbs: ['', [Validators.pattern(/^\d+$/)]],
          fat: ['', [Validators.pattern(/^\d+$/)]]
        })
      ])
    });
  }

  onSubmit(form: FormGroup) {
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
}
