import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {
  MatCardModule, MatStepperModule, MatSliderModule,
  MatDividerModule, MatSnackBarModule, MatInputModule
} from '@angular/material';

import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import 'hammerjs';

import { AddGoalComponent } from './add-goal.component';
import { ProfileService } from '../profile/profile.service';
import { AddGoalService } from './add-goal.service';

describe('AddGoalComponent', () => {
  let component: AddGoalComponent;
  let fixture: ComponentFixture<AddGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddGoalComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatCardModule,
        MatStepperModule,
        MatCardModule,
        MatSliderModule,
        MatDividerModule,
        MatSnackBarModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        FormBuilder,
        ProfileService,
        AddGoalService,
        NgxSpinnerService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to root on successful goal add', () => {
    // GIVEN
    TestBed.get(ProfileService).user = { username: 'test' };
    const fb = TestBed.get(FormBuilder);
    const formGroup = fb.group({
      formArray: fb.array([
        fb.group({
          calories: 1000
        }),
        fb.group({
          protein: 1000,
          carbs: 0,
          fat: 0
        })
      ])
    });

    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    const routerSpy = jest.spyOn(TestBed.get(Router), 'navigate')
      .mockImplementation(() => { });
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setDailyGoal')
      .mockImplementation(() => of({ goal: 2000 }));

    // WHEN
    component.submit(formGroup);

    // THEN
    const expectedGoal = {
      username: 'test',
      calories: 1000,
      protein: 1000,
      carbs: 0,
      fat: 0
    };
    expect(showSpinnerSpy).toHaveBeenCalled();
    expect(hideSpinnerSpy).toHaveBeenCalled();
    expect(setGoalSpy).toHaveBeenCalledWith(expectedGoal);
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should return if form is invalid', () => {
    // GIVEN
    const formGroup = TestBed.get(FormBuilder).group({
      test: ['', [Validators.required]]
    });

    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    const routerSpy = jest.spyOn(TestBed.get(Router), 'navigate');
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setDailyGoal');

    // WHEN
    component.submit(formGroup);

    // THEN
    expect(showSpinnerSpy).toHaveBeenCalledTimes(0);
    expect(hideSpinnerSpy).toHaveBeenCalledTimes(0);
    expect(setGoalSpy).toHaveBeenCalledTimes(0);
    expect(routerSpy).toHaveBeenCalledTimes(0);
  });

  it('should call setProteinCals if value is not empty', () => {
    // GIVEN
    const inputEvent = { target: { value: 100 } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setProteinCals');

    // WHEN
    component.setProteinCals(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalled();
  });

  it('should NOT call setProteinCals if value is empty', () => {
    // GIVEN
    const inputEvent = { target: { value: undefined } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setProteinCals');

    // WHEN
    component.setProteinCals(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalledTimes(0);
  });

  it('should call setCarbsCals if value is not empty', () => {
    // GIVEN
    const inputEvent = { target: { value: 100 } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setCarbsCals');

    // WHEN
    component.setCarbsCals(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalled();
  });

  it('should NOT call setCarbsCals if value is empty', () => {
    // GIVEN
    const inputEvent = { target: { value: undefined } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setCarbsCals');

    // WHEN
    component.setCarbsCals(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalledTimes(0);
  });

  it('should call setFatCals if value is not empty', () => {
    // GIVEN
    const inputEvent = { target: { value: 100 } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setFatCals');

    // WHEN
    component.setFatCals(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalled();
  });

  it('should NOT call setFatCals if value is empty', () => {
    // GIVEN
    const inputEvent = { target: { value: undefined } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setFatCals');

    // WHEN
    component.setFatCals(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalledTimes(0);
  });

  it('should call setProteinGrams if value is not empty', () => {
    // GIVEN
    const inputEvent = { target: { value: 100 } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setProteinGrams');

    // WHEN
    component.setProteinGrams(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalled();
  });

  it('should NOT call setProteinGrams if value is empty', () => {
    // GIVEN
    const inputEvent = { target: { value: undefined } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setProteinGrams');

    // WHEN
    component.setProteinGrams(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalledTimes(0);
  });

  it('should call setCarbsGrams if value is not empty', () => {
    // GIVEN
    const inputEvent = { target: { value: 100 } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setCarbsGrams');

    // WHEN
    component.setCarbsGrams(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalled();
  });

  it('should NOT call setCarbsGrams if value is empty', () => {
    // GIVEN
    const inputEvent = { target: { value: undefined } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setCarbsGrams');

    // WHEN
    component.setCarbsGrams(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalledTimes(0);
  });

  it('should call setFatGrams if value is not empty', () => {
    // GIVEN
    const inputEvent = { target: { value: 100 } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setFatGrams');

    // WHEN
    component.setFatGrams(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalled();
  });

  it('should NOT call setFatGrams if value is empty', () => {
    // GIVEN
    const inputEvent = { target: { value: undefined } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setFatGrams');

    // WHEN
    component.setFatGrams(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalledTimes(0);
  });

  it('should call setProteinPercent if value is not empty', () => {
    // GIVEN
    const inputEvent = { target: { value: 100 } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setProteinPercent');

    // WHEN
    component.setProteinPercent(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalled();
  });

  it('should call setCarbsPercent if value is not empty', () => {
    // GIVEN
    const inputEvent = { target: { value: 100 } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setCarbsPercent');

    // WHEN
    component.setCarbsPercent(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalled();
  });

  it('should call setFatPercent if value is not empty', () => {
    // GIVEN
    const inputEvent = { target: { value: 100 } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'setFatPercent');

    // WHEN
    component.setFatPercent(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalled();
  });





  it('should call resetProtein if value is not empty', () => {
    // GIVEN
    const inputEvent = { target: { value: 100 } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'resetProtein');

    // WHEN
    component.formatProteinOnBlur(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalledTimes(0);
  });

  it('should NOT call resetProtein if value is empty', () => {
    // GIVEN
    const inputEvent = { target: { value: undefined } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'resetProtein');

    // WHEN
    component.formatProteinOnBlur(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalled();
  });

  it('should call resetCarbs if value is not empty', () => {
    // GIVEN
    const inputEvent = { target: { value: 100 } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'resetCarbs');

    // WHEN
    component.formatCarbsOnBlur(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalledTimes(0);
  });

  it('should NOT call resetCarbs if value is empty', () => {
    // GIVEN
    const inputEvent = { target: { value: undefined } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'resetCarbs');

    // WHEN
    component.formatCarbsOnBlur(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalled();
  });

  it('should call resetFat if value is not empty', () => {
    // GIVEN
    const inputEvent = { target: { value: 100 } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'resetFat');

    // WHEN
    component.formatFatOnBlur(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalledTimes(0);
  });

  it('should NOT call resetFat if value is empty', () => {
    // GIVEN
    const inputEvent = { target: { value: undefined } };
    const setGoalSpy = jest.spyOn(TestBed.get(AddGoalService), 'resetFat');

    // WHEN
    component.formatFatOnBlur(inputEvent);

    // THEN
    expect(setGoalSpy).toHaveBeenCalled();
  });
});
