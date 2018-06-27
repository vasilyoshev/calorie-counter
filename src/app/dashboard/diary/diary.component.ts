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

  displayedColumns = ['name', 'calories', 'protein', 'carbs', 'fat'];
  summaryDataSource: MatTableDataSource<any>;
  day = {
    date: new Date(),
    name: 'Today'
  };

  constructor(
    private diaryService: DiaryService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.spinner.show();
    this.diaryService.getDay(this.day.date).subscribe(() => {
      this.summaryDataSource = new MatTableDataSource(this.diaryService.summary);
      this.spinner.hide();
    });
  }
}
