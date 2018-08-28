import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule, MatDividerModule, MatChipsModule, MatTableModule,
  MatIconModule, MatInputModule, MatSnackBarModule, MatSnackBar
} from '@angular/material';

import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        MatCardModule,
        MatDividerModule,
        MatChipsModule,
        MatTableModule,
        MatIconModule,
        MatInputModule,
        HttpClientModule,
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      providers: [
        ProfileService,
        NgxSpinnerService,
        MatSnackBar
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    TestBed.get(ProfileService).user = {
      fname: 'Fname',
      lname: 'Lname',
      goal: { calories: 1000 }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addMealType if chip value is valid', () => {
    // GIVEN
    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    const addMealTypeSpy = jest.spyOn(TestBed.get(ProfileService), 'addMealType')
      .mockImplementation(() => of({ message: 'test' }));
    const openSnackBarSpy = jest.spyOn(TestBed.get(MatSnackBar), 'open');

    // WHEN
    const dummyElement = document.createElement('input');
    dummyElement.value = 'valid';
    const chipInputEvent = { input: dummyElement, value: dummyElement.value };
    component.addType(chipInputEvent);

    // THEN
    expect(showSpinnerSpy).toHaveBeenCalled();
    expect(addMealTypeSpy).toHaveBeenCalled();
    expect(hideSpinnerSpy).toHaveBeenCalled();
    expect(openSnackBarSpy).toHaveBeenCalled();
  });

  it('should NOT call addMealType if chip value is NOT valid', () => {
    // GIVEN
    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    const addMealTypeSpy = jest.spyOn(TestBed.get(ProfileService), 'addMealType')
      .mockImplementation(() => of({ message: 'test' }));
    const openSnackBarSpy = jest.spyOn(TestBed.get(MatSnackBar), 'open');

    // WHEN
    const chipInputEvent = { input: null, value: '' };
    component.addType(chipInputEvent);

    // THEN
    expect(showSpinnerSpy).toHaveBeenCalledTimes(0);
    expect(addMealTypeSpy).toHaveBeenCalledTimes(0);
    expect(hideSpinnerSpy).toHaveBeenCalledTimes(0);
    expect(openSnackBarSpy).toHaveBeenCalledTimes(0);
  });

  it('should open snack bar on removeType', () => {
    // GIVEN
    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    const removeMealTypeSpy = jest.spyOn(TestBed.get(ProfileService), 'removeMealType')
      .mockImplementation(() => of({ message: 'test' }));
    const openSnackBarSpy = jest.spyOn(TestBed.get(MatSnackBar), 'open');
    // WHEN

    component.removeType('test');

    // THEN
    expect(showSpinnerSpy).toHaveBeenCalled();
    expect(removeMealTypeSpy).toHaveBeenCalled();
    expect(hideSpinnerSpy).toHaveBeenCalled();
    expect(openSnackBarSpy).toHaveBeenCalled();
  });
});
