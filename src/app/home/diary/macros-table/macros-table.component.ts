import { MatTableDataSource } from '@angular/material';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { DiaryTableData } from '../../../shared/entities/diary-table-data';

@Component({
  selector: 'app-macros-table',
  templateUrl: './macros-table.component.html',
  styleUrls: ['./macros-table.component.scss']
})
export class MacrosTableComponent implements OnInit, OnChanges {

  @Input() data: Array<DiaryTableData>;
  @Input() hasQuantity: boolean;
  dataSource: MatTableDataSource<DiaryTableData>;
  displayedColumns = ['name', 'calories', 'protein', 'carbs', 'fat'];

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
