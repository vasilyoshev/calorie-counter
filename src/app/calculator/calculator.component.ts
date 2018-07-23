import { Goal } from './../shared/entities/goal';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ProfileService } from './../profile/profile.service';
import { AddGoalService } from './../add-goal/add-goal.service';
import { CalculatorService } from './calculator.service';
import { MacroData } from './macro-data';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  calculatorForm: FormGroup;

  dataSource: MatTableDataSource<MacroData>;
  data: Array<MacroData>;
  displayedColumns = ['macro', 'calories', 'grams', 'percent'];

  ree: number;
  tdee: number;
  goalCalories: number;
  proteinCals: number;
  carbsCals: number;
  fatCals: number;

  constructor(
    private fb: FormBuilder,
    private calculatorService: CalculatorService,
    private addGoalService: AddGoalService,
    private profileService: ProfileService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.calculatorForm = this.fb.group({
      age: ['', [Validators.required, Validators.min(5), Validators.max(120), Validators.pattern(/^\d+$/)]],
      gender: ['', [Validators.required]],
      weight: ['', [Validators.required, Validators.min(20), Validators.max(500), Validators.pattern(/^\d+$/)]],
      height: ['', [Validators.required, Validators.min(50), Validators.max(300), Validators.pattern(/^\d+$/)]],
      activity: ['', [Validators.required]],
      goal: ['', [Validators.required]]
    });
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    // resting energy expenditure
    this.ree = this.calculatorService.getRee(form.value.gender, +form.value.weight, +form.value.height, +form.value.age);
    // total daily energy expendure
    this.tdee = this.calculatorService.getTdee(this.ree, form.value.activity);

    this.goalCalories = Math.round(this.calculatorService.getGoalCalories(this.tdee, form.value.goal));

    const proteinGrams = Math.round(form.value.weight * 2); // 2g per 1kg personal weight
    this.proteinCals = proteinGrams * 4;
    this.fatCals = Math.round(0.25 * this.tdee);
    this.carbsCals = Math.round(this.goalCalories - this.proteinCals - this.fatCals);

    this.data = new Array<MacroData>();
    this.data.push({
      macro: 'Protein',
      calories: this.proteinCals,
      grams: proteinGrams,
      percent: Math.round(this.proteinCals * 100 / this.goalCalories)
    });

    const carbsGrams = Math.round(this.carbsCals / 4);
    this.data.push({
      macro: 'Carbs',
      calories: this.carbsCals,
      grams: carbsGrams,
      percent: Math.round(this.carbsCals * 100 / this.goalCalories)
    });

    const fatGrams = Math.round(this.fatCals / 9);
    this.data.push({
      macro: 'Fat',
      calories: this.fatCals,
      grams: fatGrams,
      percent: Math.round(this.fatCals * 100 / this.goalCalories)
    });

    this.dataSource = new MatTableDataSource(this.data);
  }

  setGoal(): void {
    const dailyGoal = new Goal();
    dailyGoal.username = this.profileService.user.username;
    dailyGoal.calories = this.goalCalories;
    dailyGoal.protein = this.proteinCals;
    dailyGoal.carbs = this.carbsCals;
    dailyGoal.fat = this.fatCals;

    this.addGoalService.setDailyGoal(dailyGoal)
      .subscribe((data: any) => {
        this.profileService.user.goal = data.goal;
        this.router.navigate(['']);
        this.snackBar.open('Goal added!', 'OK', { duration: 5000 });
      }, (err: any) => {
        this.snackBar.open('Something went wrong.', 'OK');
      });
  }
}
