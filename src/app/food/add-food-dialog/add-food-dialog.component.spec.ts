import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatSelectModule, MatInputModule, MatDatepickerModule, MatDialogModule,
  MatDialogRef, MAT_DIALOG_DATA, MatNativeDateModule, MatSnackBarModule, MatSnackBar
} from '@angular/material';

import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';

import { AddFoodDialogComponent } from './add-food-dialog.component';
import { CalendarComponent } from '../../shared/calendar/calendar.component';
import { TimePickerComponent } from '../../shared/time-picker/time-picker.component';
import { ProfileService } from '../../profile/profile.service';
import { FoodService } from '../food.service';

describe('AddFoodDialogComponent', () => {
  let component: AddFoodDialogComponent;
  let fixture: ComponentFixture<AddFoodDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddFoodDialogComponent,
        CalendarComponent,
        TimePickerComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatDialogModule,
        HttpClientModule,
        MatNativeDateModule,
        NoopAnimationsModule,
        MatSnackBarModule
      ],
      providers: [
        ProfileService,
        FoodService,
        NgxSpinnerService,
        FormBuilder,
        MatSnackBar,
        { provide: MatDialogRef, useValue: { close: (dialogResult: any) => { } } },
        { provide: MAT_DIALOG_DATA, useValue: { calories: 100, protein: 10, carbs: 10, fat: 10 } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodDialogComponent);
    component = fixture.componentInstance;
    TestBed.get(ProfileService).user = { mealTypes: [] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open snackbar on successful food add', () => {
    // GIVEN
    const fb = TestBed.get(FormBuilder);
    const formGroup = fb.group({
      meal: 'Breakfast', other: '', quantity: '100'
    });

    const openSnackbarSpy = jest.spyOn(TestBed.get(MatSnackBar), 'open');
    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    const addToDiarySpy = jest.spyOn(TestBed.get(FoodService), 'addToDiary')
      .mockImplementation(() => of({}));
    const addMealTypeSpy = jest.spyOn(TestBed.get(ProfileService), 'addMealType')
      .mockImplementation(() => of({}));

    // WHEN
    component.onSubmit(formGroup);

    // THEN
    expect(showSpinnerSpy).toHaveBeenCalled();
    expect(hideSpinnerSpy).toHaveBeenCalled();
    expect(addToDiarySpy).toHaveBeenCalled();
    expect(addMealTypeSpy).toHaveBeenCalledTimes(0);
    expect(openSnackbarSpy).toHaveBeenCalledTimes(1);
  });

  it('should add meal type when Other is selected', () => {
    // GIVEN
    const fb = TestBed.get(FormBuilder);
    const formGroup = fb.group({
      meal: 'Other', other: 'Snack', quantity: '100'
    });

    const openSnackbarSpy = jest.spyOn(TestBed.get(MatSnackBar), 'open');
    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    const addToDiarySpy = jest.spyOn(TestBed.get(FoodService), 'addToDiary')
      .mockImplementation(() => of({}));
    const addMealTypeSpy = jest.spyOn(TestBed.get(ProfileService), 'addMealType')
      .mockImplementation(() => of({}));

    // WHEN
    component.onSubmit(formGroup);

    // THEN
    expect(showSpinnerSpy).toHaveBeenCalled();
    expect(hideSpinnerSpy).toHaveBeenCalled();
    expect(addToDiarySpy).toHaveBeenCalled();
    expect(addMealTypeSpy).toHaveBeenCalled();
    expect(openSnackbarSpy).toHaveBeenCalledTimes(2);
  });

  it('should return if no meal is selected', () => {
    // GIVEN
    const fb = TestBed.get(FormBuilder);
    const formGroup = fb.group({
      meal: ['', Validators.required], other: 'Snack', quantity: '100'
    });

    const openSnackbarSpy = jest.spyOn(TestBed.get(MatSnackBar), 'open');
    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    const addToDiarySpy = jest.spyOn(TestBed.get(FoodService), 'addToDiary')
      .mockImplementation(() => of({}));
    const addMealTypeSpy = jest.spyOn(TestBed.get(ProfileService), 'addMealType')
      .mockImplementation(() => of({}));

    // WHEN
    component.onSubmit(formGroup);

    // THEN
    expect(showSpinnerSpy).toHaveBeenCalledTimes(0);
    expect(hideSpinnerSpy).toHaveBeenCalledTimes(0);
    expect(addToDiarySpy).toHaveBeenCalledTimes(0);
    expect(addMealTypeSpy).toHaveBeenCalledTimes(0);
    expect(openSnackbarSpy).toHaveBeenCalledTimes(0);
  });

  it('should return if no Other type is specified', () => {
    // GIVEN
    const fb = TestBed.get(FormBuilder);
    const formGroup = fb.group({
      meal: 'Other', other: ['', Validators.required], quantity: '100'
    });

    const openSnackbarSpy = jest.spyOn(TestBed.get(MatSnackBar), 'open');
    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    const addToDiarySpy = jest.spyOn(TestBed.get(FoodService), 'addToDiary')
      .mockImplementation(() => of({}));
    const addMealTypeSpy = jest.spyOn(TestBed.get(ProfileService), 'addMealType')
      .mockImplementation(() => of({}));

    // WHEN
    component.onSubmit(formGroup);

    // THEN
    expect(showSpinnerSpy).toHaveBeenCalledTimes(0);
    expect(hideSpinnerSpy).toHaveBeenCalledTimes(0);
    expect(addToDiarySpy).toHaveBeenCalledTimes(0);
    expect(addMealTypeSpy).toHaveBeenCalledTimes(0);
    expect(openSnackbarSpy).toHaveBeenCalledTimes(0);
  });
});
