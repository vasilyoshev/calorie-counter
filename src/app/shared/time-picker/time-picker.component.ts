import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {

  @Output() timeChange = new EventEmitter<any>();

  hour: String;
  minute: String;

  hours: Array<Number>;
  minutes: Array<Number>;

  constructor() {
    this.hours = [];
    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }
    this.minutes = [];
    for (let i = 0; i < 60; i++) {
      this.minutes.push(i);
    }

    const date = new Date();
    this.hour = date.getHours().toString();
    this.minute = date.getMinutes().toString();
  }

  ngOnInit() {
    this.emitTime();
  }

  emitTime() {
    this.timeChange.emit({
      hour: +this.hour,
      minute: +this.minute
    });
  }
}
