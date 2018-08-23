import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule, MatStepperModule, MatFormFieldModule,
  MatSliderModule, MatDividerModule, MatSnackBarModule, MatInputModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { AddGoalComponent } from './add-goal.component';

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
        MatFormFieldModule,
        MatSliderModule,
        MatDividerModule,
        MatSnackBarModule,
        MatInputModule,
        NoopAnimationsModule
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
});
