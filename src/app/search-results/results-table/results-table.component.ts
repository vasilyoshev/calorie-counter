import { MatTableDataSource } from '@angular/material';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit {

  @Input() results: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['name', 'group'];

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.results);
  }
}
