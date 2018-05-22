import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tokenNotExpired } from 'angular2-jwt';

import { environment } from './../environments/environment';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user) {
    return this.http.post('users/register', user);
  }

  authenticateUser(user) {
    return this.http.post('users/authenticate', user);
  }

  getProfile() {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get('users/profile', { headers: headers });
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
