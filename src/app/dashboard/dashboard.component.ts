import { Component, OnInit } from '@angular/core';

import { ProfileService } from './../profile/profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  hasDailyGoal: boolean;

  constructor(public profileService: ProfileService) { }

  ngOnInit() {
  }

}
