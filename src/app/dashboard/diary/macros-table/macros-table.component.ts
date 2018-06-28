import { MatTableDataSource } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-macros-table',
  templateUrl: './macros-table.component.html',
  styleUrls: ['./macros-table.component.scss']
})
export class MacrosTableComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  @Input() data: any;
  displayedColumns = ['name', 'calories', 'protein', 'carbs', 'fat'];
  @Input() quantity: Boolean;

  constructor() { }

  ngOnInit() {
    if (this.quantity) {
      this.displayedColumns.push('quantity');
    }
    this.dataSource = new MatTableDataSource(this.data);
  }

}
