import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { Food } from './../shared/entities/food';
import { SearchService } from './../search/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  query: string;
  results: Array<Food>;
  pageSize: number;
  totalResults: number;
  offset: number;
  searchQuery$ = new Subject<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Food>;
  displayedColumns = ['name', 'group'];

  constructor(
    private searchService: SearchService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.pageSize = 25;
    this.offset = 0;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.dataSource = new MatTableDataSource(this.results);
    this.dataSource.paginator = this.paginator;
    this.query = this.searchService.searchQuery;
    this.searchService.search(this.searchQuery$)
      .subscribe((res: any) => {
        this.results = res.results;
        this.totalResults = res.total;
        this.dataSource.data = this.results;
        this.spinner.hide();
      }, (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.router.navigate(['']);
        this.snackBar.open(err.error.message, 'OK', { duration: 5000 });
      });

    this.searchQuery$.next({
      term: this.query,
      offset: this.offset,
      pageSize: this.pageSize
    });
  }

  onPaginatorChange(event: PageEvent): void {
    this.spinner.show();
    this.offset = this.pageSize * event.pageIndex;
    this.pageSize = event.pageSize;
    this.searchQuery$.next({
      term: this.query,
      offset: this.offset,
      pageSize: this.pageSize
    });
  }

  onSearch(query: any): void {
    if (!(query instanceof Event)) { // fix bug where event is fired twice TODO
      this.searchQuery$.next({
        term: query,
        offset: this.offset,
        pageSize: this.pageSize
      });
    }
  }

  goToFood(food: Food): void {
    this.searchService.selectedFood = food;
    this.router.navigate(['/food', food.name]);
  }
}
