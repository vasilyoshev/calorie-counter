import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatSnackBarModule, MatInputModule } from '@angular/material';
import { Router } from '@angular/router';

import { of, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatCardModule,
        MatSnackBarModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        RegisterService,
        FormBuilder,
        NgxSpinnerService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
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
    const registerSpy = jest.spyOn(TestBed.get(RegisterService), 'registerUser');
    const fb = TestBed.get(FormBuilder);
    const formGroup = fb.group({
      fname: ['', [Validators.required]]
    });

    // WHEN
    component.submit(formGroup);

    // THEN
    expect(registerSpy).toHaveBeenCalledTimes(0);
    expect(showSpinnerSpy).toHaveBeenCalledTimes(0);
    expect(hideSpinnerSpy).toHaveBeenCalledTimes(0);
  });

  it('should call navigate to login on successful reg', () => {
    // GIVEN
    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    const routerSpy = jest.spyOn(TestBed.get(Router), 'navigate')
      .mockImplementation(() => { });
    const registerSpy = jest.spyOn(TestBed.get(RegisterService), 'registerUser')
      .mockImplementation(() => of(true));
    const fb = TestBed.get(FormBuilder);
    const formGroup = fb.group({
      passwords: fb.group({
        password: ['pass', [Validators.required]]
      })
    });

    // WHEN
    component.submit(formGroup);

    // THEN
    expect(registerSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['login']);
    expect(showSpinnerSpy).toHaveBeenCalled();
    expect(hideSpinnerSpy).toHaveBeenCalled();
  });

  it('should set user taken error', () => {
    // GIVEN
    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    const registerSpy = jest.spyOn(TestBed.get(RegisterService), 'registerUser')
      .mockImplementation(() => throwError({ error: { usernameUsed: true } }));
    const fb = TestBed.get(FormBuilder);
    const formGroup = fb.group({
      passwords: fb.group({
        password: ['pass', [Validators.required]]
      })
    });

    // WHEN
    component.submit(formGroup);

    // THEN
    expect(registerSpy).toHaveBeenCalled();
    expect(component.registerForm.controls['username'].hasError('taken')).toBeTruthy();
    expect(showSpinnerSpy).toHaveBeenCalled();
    expect(hideSpinnerSpy).toHaveBeenCalled();
  });

  it('should set email taken error', () => {
    // GIVEN
    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    const registerSpy = jest.spyOn(TestBed.get(RegisterService), 'registerUser')
      .mockImplementation(() => throwError({ error: { emailUsed: true } }));
    const fb = TestBed.get(FormBuilder);
    const formGroup = fb.group({
      passwords: fb.group({
        password: ['pass', [Validators.required]]
      })
    });

    // WHEN
    component.submit(formGroup);

    // THEN
    expect(registerSpy).toHaveBeenCalled();
    expect(component.registerForm.controls['email'].hasError('taken')).toBeTruthy();
    expect(showSpinnerSpy).toHaveBeenCalled();
    expect(hideSpinnerSpy).toHaveBeenCalled();
  });
});
