import { MatTableDataSource, MatTable } from '@angular/material';
import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-macros-table',
  templateUrl: './macros-table.component.html',
  styleUrls: ['./macros-table.component.scss']
})
export class MacrosTableComponent implements OnInit, OnChanges {

  dataSource: MatTableDataSource<any>;
  @Input() data: any;
  displayedColumns = ['name', 'calories', 'protein', 'carbs', 'fat'];
  @Input() quantity: Boolean;

  constructor() {
  }

  ngOnInit() {
    if (this.quantity) {
      this.displayedColumns.splice(1, 0, 'quantity');
    }
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.data = this.data;
    }
  }
}
