import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
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
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['name', 'group'];

  constructor(
    private searchService: SearchService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.pageSize = 25;
    this.offset = 0;
  }

  ngOnInit() {
    this.spinner.show(); // possible bug TODO
    this.dataSource = new MatTableDataSource(this.results);
    this.dataSource.paginator = this.paginator;
    this.query = this.searchService.searchQuery;
    this.searchService.search(this.searchQuery$)
      .subscribe((res: any) => {
        this.results = res.results;
        this.query = res.query;
        this.totalResults = res.total;
        this.dataSource.data = this.results;

        this.spinner.hide(); // possible bug TODO
      }, (err: any) => {
        console.log('search results component'); // TODO handle
        console.log(err);
        this.spinner.hide();
      });

    this.searchQuery$.next({
      term: this.query,
      offset: this.offset,
      pageSize: this.pageSize
    });
  }

  onPaginatorChange(event: PageEvent) {
    this.spinner.show();
    this.offset = this.pageSize * event.pageIndex;
    this.pageSize = event.pageSize;
    this.searchQuery$.next({
      term: this.query,
      offset: this.offset,
      pageSize: this.pageSize
    });
  }

  onSearch(query: any) {
    if (!(query instanceof Event)) { // fix bug where event is fired twice TODO
      this.searchQuery$.next({
        term: query,
        offset: this.offset,
        pageSize: this.pageSize
      });
    }
  }

  goToFood(food: Food) {
    this.searchService.selectedFood = food;
    this.router.navigate(['/food', food.name]);
  }
}
