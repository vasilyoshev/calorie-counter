import { ProfileService } from './../../profile/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  constructor(public profileService: ProfileService) { }

  ngOnInit() {
  }

}
