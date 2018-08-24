import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule, MatIconModule, MatExpansionModule, MatStepperModule,
  MatSliderModule, MatDividerModule, MatDatepickerModule, MatTableModule,
  MatNativeDateModule, MatSnackBarModule, MatInputModule
} from '@angular/material';

import { DiaryComponent } from './diary.component';
import { CalendarComponent } from './../../shared/calendar/calendar.component';
import { SearchComponent } from '../../search/search.component';
import { AddGoalComponent } from './../../add-goal/add-goal.component';
import { MacrosTableComponent } from './macros-table/macros-table.component';
import { ProfileService } from './../../profile/profile.service';

describe('DiaryComponent', () => {
  let component: DiaryComponent;
  let fixture: ComponentFixture<DiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DiaryComponent,
        SearchComponent,
        AddGoalComponent,
        CalendarComponent,
        MacrosTableComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatExpansionModule,
        MatStepperModule,
        MatSliderModule,
        MatDividerModule,
        MatDatepickerModule,
        MatTableModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [ProfileService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryComponent);
    component = fixture.componentInstance;
    TestBed.get(ProfileService).user = { goal: {} };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
