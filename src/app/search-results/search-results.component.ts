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
  }

  ngOnInit(): void {
    this.spinner.show();
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.query = this.searchService.searchQuery;
    this.searchService.search(this.searchQuery$)
      .subscribe((res: any) => {
        this.query = this.searchService.searchQuery;
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
      offset: 0,
      pageSize: this.pageSize
    });
  }

  onPaginatorChange(event: PageEvent): void {
    this.spinner.show();
    this.pageSize = event.pageSize;
    this.searchQuery$.next({
      term: this.query,
      offset: this.pageSize * event.pageIndex,
      pageSize: this.pageSize
    });
  }

  onSearch(query: any): void {
    if (this.paginator) { // when searching after previous no results page
      this.paginator.pageIndex = 0;
    }
    this.searchQuery$.next({
      term: query,
      offset: 0,
      pageSize: this.pageSize
    });
  }

  goToFood(food: Food): void {
    this.searchService.selectedFood = food;
    this.router.navigate(['/food', food.name]);
  }
}
