import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatSelectModule, MatInputModule, MatDatepickerModule,
  MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatNativeDateModule
} from '@angular/material';

import { AddFoodDialogComponent } from './add-food-dialog.component';
import { CalendarComponent } from '../../shared/calendar/calendar.component';
import { TimePickerComponent } from '../../shared/time-picker/time-picker.component';
import { ProfileService } from '../../profile/profile.service';

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
        NoopAnimationsModule
      ],
      providers: [
        ProfileService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
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
});
