import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

import { DiaryService } from './diary.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  summaryData: MatTableDataSource<any>;
  displayedColumns = ['name', 'calories', 'protein', 'carbs', 'fat'];

  constructor(private diaryService: DiaryService) {
    this.summaryData = new MatTableDataSource(this.diaryService.summary);
  }

  ngOnInit() {
  }

}
