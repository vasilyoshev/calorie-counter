import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar, MatTableDataSource } from '@angular/material';

import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';

import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  name: string;
  username: string;
  email: string;

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['calories', 'protein', 'carbs', 'fat'];

  mealTypes: Array<string>;
  readonly separatorKeysCodes: Array<number> = [ENTER, COMMA];


  constructor(
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.name = this.profileService.user.fname + ' ' + this.profileService.user.lname;
    this.username = this.profileService.user.username;
    this.email = this.profileService.user.email;

    this.mealTypes = this.profileService.user.mealTypes;
    if (this.profileService.user.goal.calories) {
      this.dataSource = new MatTableDataSource([{
        calories: this.profileService.user.goal.calories,
        protein: this.profileService.user.goal.protein,
        carbs: this.profileService.user.goal.carbs,
        fat: this.profileService.user.goal.fat
      }]);
    }
  }

  addType(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if (value) {
      this.spinner.show();
      this.mealTypes.push(value);
      this.profileService.setMealTypes(this.mealTypes)
        .pipe(finalize(() => this.spinner.hide())).subscribe((res: any) => {
          this.snackBar.open(res.message, 'OK', { duration: 5000 });
        }, (err: HttpErrorResponse) => {
          this.snackBar.open(err.error.message, 'OK', { duration: 5000 });
        });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeType(type: string): void {
    this.spinner.show();
    const index = this.mealTypes.indexOf(type);

    if (index >= 0) {
      this.mealTypes.splice(index, 1);
      this.profileService.setMealTypes(this.mealTypes)
        .pipe(finalize(() => this.spinner.hide())).subscribe((res: any) => {
          this.snackBar.open(res.message, 'OK', { duration: 5000 });
        }, (err: HttpErrorResponse) => {
          this.snackBar.open(err.error.message, 'OK', { duration: 5000 });
        });
    }
  }
}
