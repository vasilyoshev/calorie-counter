import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { ProfileService } from '../profile/profile.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatCheckboxModule,
        RouterTestingModule,
        HttpClientModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        LoginService,
        NgxSpinnerService,
        ProfileService,
        FormBuilder
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return if form is invalid', () => {
    // GIVEN
    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    const loginSpy = jest.spyOn(TestBed.get(LoginService), 'login');
    const fb = TestBed.get(FormBuilder);
    const formGroup = fb.group({
      username: ['', [Validators.required]]
    });

    // WHEN
    component.submit(formGroup);

    // THEN
    expect(loginSpy).toHaveBeenCalledTimes(0);
    expect(showSpinnerSpy).toHaveBeenCalledTimes(0);
    expect(hideSpinnerSpy).toHaveBeenCalledTimes(0);
  });

  it('should navigate to root on successful login', () => {
    // GIVEN
    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    const routerSpy = jest.spyOn(TestBed.get(Router), 'navigate')
      .mockImplementation(() => { });
    const loginSpy = jest.spyOn(TestBed.get(LoginService), 'login')
      .mockImplementation(() => of({}));
    const getProfileSpy = jest.spyOn(TestBed.get(ProfileService), 'getProfile')
      .mockImplementation(() => of({}));

    const fb = TestBed.get(FormBuilder);
    const formGroup = fb.group({
      username: ['test', [Validators.required]]
    });

    // WHEN
    component.submit(formGroup);

    // THEN
    expect(loginSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['']);
    expect(showSpinnerSpy).toHaveBeenCalledTimes(2);
    expect(hideSpinnerSpy).toHaveBeenCalledTimes(2);
    expect(getProfileSpy).toHaveBeenCalled();
  });

  it('should set loggedIn to false on error ', () => {
    // GIVEN
    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    const routerSpy = jest.spyOn(TestBed.get(Router), 'navigate')
      .mockImplementation(() => { });
    const loginSpy = jest.spyOn(TestBed.get(LoginService), 'login')
      .mockImplementation(() => throwError(of()));
    const getProfileSpy = jest.spyOn(TestBed.get(ProfileService), 'getProfile');

    const fb = TestBed.get(FormBuilder);
    const formGroup = fb.group({
      username: ['test', [Validators.required]]
    });

    // WHEN
    component.submit(formGroup);

    // THEN
    expect(loginSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledTimes(0);
    expect(showSpinnerSpy).toHaveBeenCalledTimes(1);
    expect(hideSpinnerSpy).toHaveBeenCalledTimes(1);
    expect(getProfileSpy).toHaveBeenCalledTimes(0);
    expect(TestBed.get(LoginService).loggedIn).toBe(false);
  });
});
