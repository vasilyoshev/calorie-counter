import { FormControl } from '@angular/forms';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  dateFormControl: FormControl;
  dayName: string;
  @Output() dateChange = new EventEmitter<Date>();
  @Input() set date(date: Date) {
    if (date.toDateString() === new Date().toDateString()) {
      this.dayName = 'Today';
    } else if (date.toDateString()
      === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()) {
      this.dayName = 'Tomorrow';
    } else if (date.toDateString()
      === new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()) {
      this.dayName = 'Yesterday';
    } else {
      this.dayName = '';
    }
    this.dateFormControl.setValue(date);
  }

  constructor() {
    this.dateFormControl = new FormControl(new Date());
    this.dateFormControl.disable();
  }
}
