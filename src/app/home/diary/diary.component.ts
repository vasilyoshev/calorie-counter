import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';

import { ProfileService } from './../../profile/profile.service';
import { DiaryService } from './diary.service';
import { DiaryTableData } from './../../shared/entities/diary-table-data';
import { Meal } from './../../shared/entities/meal';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  hasGoal: boolean;
  summary: Array<DiaryTableData>;
  meals: Array<Meal>;
  date: Date;
  dateFormControl: FormControl;

  constructor(
    private diaryService: DiaryService,
    private spinner: NgxSpinnerService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.hasGoal = Object.keys(this.profileService.user.goal).length !== 0;

    if (!this.diaryService.currentDate) {
      this.diaryService.currentDate = new Date();
    }
    this.date = this.diaryService.currentDate;

    this.getDay(new Date());
  }

  getDay(date: Date | number): void {
    this.spinner.show();
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    this.diaryService.getDay(date)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(() => {
        this.summary = this.diaryService.summary;
        this.meals = this.diaryService.meals;

        let newDate = new Date(this.date);
        if (date instanceof Date) { // to avoid ts error
          newDate = new Date(newDate.setDate(date.getDate()));
          newDate = new Date(newDate.setMonth(date.getMonth()));
          newDate = new Date(newDate.setFullYear(date.getFullYear()));
        }

        this.date = newDate;
        this.diaryService.currentDate = this.date;
      }, (err) => {
        // TODO handle expired session
      });
  }
}
