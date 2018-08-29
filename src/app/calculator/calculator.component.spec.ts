import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  MatCardModule, MatSelectModule, MatTableModule,
  MatSnackBarModule, MatInputModule, MatSnackBar
} from '@angular/material';

import { of, throwError } from 'rxjs';

import { CalculatorComponent } from './calculator.component';
import { AddGoalService } from '../add-goal/add-goal.service';
import { ProfileService } from '../profile/profile.service';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatTableModule,
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      providers: [
        FormBuilder,
        MatSnackBar,
        AddGoalService,
        ProfileService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly fill data property', () => {
    // GIVEN
    const fb = TestBed.get(FormBuilder);
    const formGroup = fb.group({
      gender: 'male',
      weight: '75',
      height: '175',
      age: '25',
      activity: 'light',
      goal: 'lose'
    });

    // WHEN
    component.submit(formGroup);

    // THEN
    const expectedData = [
      { 'calories': 600, 'grams': 150, 'macro': 'Protein', 'percent': 32 },
      { 'calories': 703, 'grams': 176, 'macro': 'Carbs', 'percent': 37 },
      { 'calories': 593, 'grams': 66, 'macro': 'Fat', 'percent': 31 }
    ];
    expect(component.data).toEqual(expectedData);
  });

  it('should return if form is invalid', () => {
    // GIVEN
    const fb = TestBed.get(FormBuilder);
    const formGroup = fb.group({
      gender: ['', [Validators.required]]
    });

    // WHEN
    component.submit(formGroup);

    // THEN
    expect(formGroup.valid).toBeFalsy();
    expect(component.data).toEqual(undefined);
  });

  it('should navigate to root on successful goal add', () => {
    // GIVEN
    TestBed.get(ProfileService).user = { username: 'test' };
    const snackBarSpy = jest.spyOn(TestBed.get(MatSnackBar), 'open');
    const routerSpy = jest.spyOn(TestBed.get(Router), 'navigate')
      .mockImplementation(() => { });
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setDailyGoal')
      .mockImplementation(() => of({}));

    // WHEN
    component.setGoal();

    // THEN
    expect(setGoalSpy).toHaveBeenCalled();
    expect(snackBarSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should NOT navigate to root on goal add error', () => {
    // GIVEN
    TestBed.get(ProfileService).user = { username: 'test' };
    const snackBarSpy = jest.spyOn(TestBed.get(MatSnackBar), 'open');
    const routerSpy = jest.spyOn(TestBed.get(Router), 'navigate')
      .mockImplementation(() => { });
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setDailyGoal')
      .mockImplementation(() => throwError({}));

    // WHEN
    component.setGoal();

    // THEN
    expect(setGoalSpy).toHaveBeenCalled();
    expect(snackBarSpy).toHaveBeenCalledTimes(0);
    expect(routerSpy).toHaveBeenCalledTimes(0);
  });
});
