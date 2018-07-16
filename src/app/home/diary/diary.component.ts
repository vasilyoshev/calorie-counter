import { FormControl } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';

import { ProfileService } from './../../profile/profile.service';
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
  dateFormControl: FormControl;

  constructor(
    private diaryService: DiaryService,
    private spinner: NgxSpinnerService,
    private profileService: ProfileService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.hasGoal = Object.keys(this.profileService.user.goal).length !== 0;

    if (!this.diaryService.currentDay) {
      this.diaryService.currentDay = { name: 'Today', date: new Date() };
    }
    this.day = this.diaryService.currentDay;
    this.dateFormControl = new FormControl(this.day.date);
    this.dateFormControl.disable();

    if (!this.diaryService.summary || !this.diaryService.meals) {
      this.spinner.show();
      this.getDay(new Date());
    } else {
      this.summary = this.diaryService.summary;
      this.meals = this.diaryService.meals;
    }
  }

  refreshData() {
    this.spinner.show();
    this.getDay(this.day.date);
  }

  getDay(date: Date) {
    this.spinner.show();
    date = new Date(date);
    // this.dateFormControl.setValue(date);
    this.diaryService.getDay(date)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(() => {
        this.summary = this.diaryService.summary;
        this.meals = this.diaryService.meals;
        this.day.date.setDate(date.getDate());
        if (date.toDateString() === new Date().toDateString()) {
          this.day.name = 'Today';
        } else if (date.toDateString()
          === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()) {
          this.day.name = 'Tomorrow';
        } else if (date.toDateString()
          === new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()) {
          this.day.name = 'Yesterday';
        } else {
          this.day.name = '';
        }
        this.ref.markForCheck();
      }, (err) => {
        // TODO handle expired session
      });
  }
}
