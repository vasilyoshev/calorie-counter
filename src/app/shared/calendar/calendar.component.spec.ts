import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [
        MatNativeDateModule,
        NoopAnimationsModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDatepickerModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set day name to Today for new Date', () => {
    // WHEN
    component.date = new Date();

    // THEN
    expect(component.dayName).toBe('Today');
  });

  it('should set day name to Tomorrow for tomorrow date', () => {
    // WHEN
    component.date = new Date(new Date().setDate(new Date().getDate() + 1));

    // THEN
    expect(component.dayName).toBe('Tomorrow');
  });

  it('should set day name to Yesterday for yesterday date', () => {
    // WHEN
    component.date = new Date(new Date().setDate(new Date().getDate() - 1));

    // THEN
    expect(component.dayName).toBe('Yesterday');
  });

  it('should set day name to empty string for other date date', () => {
    // WHEN
    component.date = new Date(new Date().setDate(new Date().getDate() - 2));

    // THEN
    expect(component.dayName).toBe('');
  });
});
