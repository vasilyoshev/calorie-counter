import { MatTableDataSource, MatTable } from '@angular/material';
import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';

import { DiaryTableData } from '../../../shared/entities/diary-table-data';

@Component({
  selector: 'app-macros-table',
  templateUrl: './macros-table.component.html',
  styleUrls: ['./macros-table.component.scss']
})
export class MacrosTableComponent implements OnInit, OnChanges {

  dataSource: MatTableDataSource<DiaryTableData>;
  @Input() data: Array<DiaryTableData>;
  displayedColumns = ['name', 'calories', 'protein', 'carbs', 'fat'];
  @Input() hasQuantity: boolean;

  constructor() {
  }

  ngOnInit() {
    if (this.hasQuantity) {
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
