import { FormControl } from '@angular/forms';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  dateFormControl: FormControl;
  date: Date;
  name: string;
  @Input() set day(value: any) {
    this.date = value.date;
    this.name = value.name;
    this.dateFormControl.setValue(this.date);
  }
  @Output() dateChange = new EventEmitter<Date>();

  constructor() {
    this.dateFormControl = new FormControl(new Date());
    this.dateFormControl.disable();
  }

  changeDate(date: Date) {
    this.dateChange.emit(date);
  }
}
