import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe((profile: any) => {
      this.user = profile.user;
    }, err => {
      // console.log(err);
      return false;
    });
  }
}
