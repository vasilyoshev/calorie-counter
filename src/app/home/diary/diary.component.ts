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
  date: Date;
  dateFormControl: FormControl;

  constructor(
    private diaryService: DiaryService,
    private spinner: NgxSpinnerService,
    private profileService: ProfileService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.hasGoal = Object.keys(this.profileService.user.goal).length !== 0;

    if (!this.diaryService.currentDate) {
      this.diaryService.currentDate = new Date();
    }
    this.date = this.diaryService.currentDate;

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
    this.getDay(this.date);
  }

  getDay(date: any) {
    this.spinner.show();
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    // this.dateFormControl.setValue(date);
    this.diaryService.getDay(date)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(() => {
        this.summary = this.diaryService.summary;
        this.meals = this.diaryService.meals;
        // new ref in order for change detection to trigger calendar component input
        this.date = new Date(this.date.setDate(date.getDate()));
        this.diaryService.currentDate = this.date;
        this.ref.markForCheck();
      }, (err) => {
        // TODO handle expired session
      });
  }
}
