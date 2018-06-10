import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

import { ProfileService } from './../../profile/profile.service';

const ELEMENT_DATA = [
  {name: 'Banana', calories: 500, protein: 100, carbs: 100, fat: 50},
  {name: 'Rice', calories: 400, protein: 20, carbs: 200, fat: 234}
];

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns = ['name', 'calories', 'protein', 'carbs', 'fat'];

  constructor(public profileService: ProfileService) { }

  ngOnInit() {
  }

}
