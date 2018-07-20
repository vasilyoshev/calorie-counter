import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { finalize } from 'rxjs/internal/operators/finalize';
import { NgxSpinnerService } from 'ngx-spinner';

import { DiaryService } from './../../home/diary/diary.service';
import { ProfileService } from './../../profile/profile.service';
import { FoodService } from './../food.service';

@Component({
  selector: 'app-add-food-dialog',
  templateUrl: './add-food-dialog.component.html',
  styleUrls: ['./add-food-dialog.component.scss']
})
export class AddFoodDialogComponent implements OnInit {

  selectedMeal: string;
  addFoodForm: FormGroup;
  mealTypes: Array<string>;
  otherSelected: boolean;
  date: Date;

  constructor(
    public dialogRef: MatDialogRef<AddFoodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public food: any,
    private fb: FormBuilder,
    private foodService: FoodService,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
    private diaryService: DiaryService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.date = this.diaryService.currentDate;
    this.mealTypes = this.profileService.user.mealTypes;
    this.addFoodForm = this.fb.group({
      quantity: ['100', [Validators.required]],
      meal: ['', [Validators.required]],
      other: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form: FormGroup) {
    let meal = form.value.meal;
    if (form.value.meal === 'Other') {
      this.addFoodForm.setControl('other', new FormControl(form.value.other, Validators.required));
      meal = form.value.other;
    } else {
      this.addFoodForm.setControl('other', new FormControl());
    }

    if (!form.valid) {
      return;
    }

    this.spinner.show();
    this.foodService.addToDiary(this.food, form.value.quantity, meal, this.date)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(() => {
        if (form.value.meal === 'Other') {
          this.mealTypes.push(meal);
          this.profileService.setMealTypes(this.mealTypes).subscribe();
        }
        this.dialogRef.close();
        this.router.navigate(['']);
        this.snackBar.open('Food added to diary!', 'OK', { duration: 5000 });
      });
  }

  changeTime(hour: number, minute: number) {
    this.date = new Date(this.date.setHours(hour));
    this.date = new Date(this.date.setMinutes(minute));
  }
}
