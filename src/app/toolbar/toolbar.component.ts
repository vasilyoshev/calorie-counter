import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  onLogoutClick() {
    this.authService.logout();
    alert('You have been logged out.');
    this.router.navigate(['/login']);
    return false;
  }

}
