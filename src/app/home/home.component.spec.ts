import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  MatCardModule, MatIconModule, MatExpansionModule, MatSliderModule, MatDividerModule,
  MatStepperModule, MatDatepickerModule, MatTableModule, MatInputModule
} from '@angular/material';

import { HomeComponent } from './home.component';
import { DiaryComponent } from './diary/diary.component';
import { AddGoalComponent } from '../add-goal/add-goal.component';
import { MacrosTableComponent } from './diary/macros-table/macros-table.component';
import { SearchComponent } from './../search/search.component';
import { CalendarComponent } from './../shared/calendar/calendar.component';
import { LoginService } from './../login/login.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        DiaryComponent,
        AddGoalComponent,
        CalendarComponent,
        SearchComponent,
        MacrosTableComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatExpansionModule,
        MatSliderModule,
        MatDividerModule,
        MatStepperModule,
        MatInputModule,
        RouterTestingModule,
        HttpClientModule,
        MatDatepickerModule,
        MatTableModule
      ],
      providers: [
        LoginService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
