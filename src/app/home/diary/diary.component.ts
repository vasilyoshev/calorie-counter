import { ProfileService } from './../../profile/profile.service';
import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';

import { DiaryService } from './diary.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  hasGoal: boolean;
  summary: any;
  meals: Array<any>;
  breakfast: any;
  lunch: any;
  dinner: any;
  snack: any;
  day: any;

  constructor(
    private diaryService: DiaryService,
    private spinner: NgxSpinnerService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.hasGoal = Object.keys(this.profileService.user.goal).length !== 0;

    if (!this.diaryService.currentDay) {
      this.diaryService.currentDay = { name: 'Today', date: new Date() }
    }
    this.day = this.diaryService.currentDay;

    if (!this.diaryService.summary || !this.diaryService.meals) {
      this.spinner.show();
      this.getCurrentDay();
    } else {
      this.summary = this.diaryService.summary;
      this.meals = this.diaryService.meals;
    }
  }

  refreshData() {
    this.spinner.show();
    this.getCurrentDay();
  }

  getCurrentDay() {
    this.diaryService.getDay(this.day.date)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(() => {
        this.summary = this.diaryService.summary;
        this.meals = this.diaryService.meals;
      }, (err) => {
        // TODO handle expired session
      });
  }

  getPreviousDay() {
    this.spinner.show();
    this.day.date.setDate(this.day.date.getDate() - 1);
    if (this.day.name === 'Today') {
      this.day.name = 'Yesterday';
    } else if (this.day.name === 'Tomorrow') {
      this.day.name = 'Today';
    } else if (this.day.date.toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()) {
      this.day.name = 'Tomorrow';
    } else {
      this.day.name = this.day.date.toISOString().slice(0, 10).split('-').reverse().join('.');
    }
    this.getCurrentDay();
  }

  getNextDay() {
    this.spinner.show();
    this.day.date.setDate(this.day.date.getDate() + 1);
    if (this.day.name === 'Today') {
      this.day.name = 'Tomorrow';
    } else if (this.day.name === 'Yesterday') {
      this.day.name = 'Today';
    } else if (this.day.date.toDateString() === new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()) {
      this.day.name = 'Yesterday';
    } else {
      this.day.name = this.day.date.toISOString().slice(0, 10).split('-').reverse().join('.');
    }
    this.getCurrentDay();
  }
}
