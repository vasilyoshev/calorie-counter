import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { NgxSpinnerService } from 'ngx-spinner';

import { DiaryService } from './diary.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  summary: any;
  breakfast: any;
  lunch: any;
  dinner: any;
  snack: any;
  day = {
    date: new Date(),
    name: 'Today'
  };

  constructor(
    private diaryService: DiaryService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.diaryService.getDay(this.day.date).subscribe(() => {
      this.summary = this.diaryService.summary;
      this.breakfast = this.diaryService.details.Breakfast;
      this.lunch = this.diaryService.details.Lunch;
      this.dinner = this.diaryService.details.Dinner;
      this.snack = this.diaryService.details.Snack;
      this.spinner.hide();
    });
  }
}
