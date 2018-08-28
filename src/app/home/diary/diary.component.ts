import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';

import { ProfileService } from '../../profile/profile.service';
import { DiaryService } from './diary.service';
import { DiaryTableData } from '../../shared/entities/diary-table-data';
import { Meal } from '../../shared/entities/meal';

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
    this.date = this.diaryService.currentDate;
    this.summary = this.diaryService.summary;
    this.meals = this.diaryService.meals;
    this.getDay(new Date());
  }

  getDay(date: Date): void {
    const convertedDate = new Date(date);

    this.spinner.show();
    this.diaryService.getDay(convertedDate)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(() => {
        this.summary = this.diaryService.summary;
        this.meals = this.diaryService.meals;
        this.date = this.diaryService.currentDate;
      });
  }
}
