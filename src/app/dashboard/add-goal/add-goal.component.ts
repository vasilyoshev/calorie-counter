import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { DashboardService } from './../dashboard.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.scss']
})
export class AddGoalComponent implements OnInit {

  addGoalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.addGoalForm = this.fb.group({
      calories: [''],
      protein: [''],
      carbs: [''],
      fat: ['']
    });
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }

    const dailyGoal = {
      calories: form.value.calories,
      protein: form.value.protein,
      carbs: form.value.carbs,
      fat: form.value.fat
    };

    this.dashboardService.setDailyGoal(dailyGoal)
      .subscribe((data: any) => {
        if (data.success) {

        } else {
          alert('Something went wrong.');
        }
      });
  }
}
