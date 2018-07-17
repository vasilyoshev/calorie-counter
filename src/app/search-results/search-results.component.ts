import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { finalize } from 'rxjs/internal/operators/finalize';
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
  searchTerm$ = new Subject<string>();

  constructor(
    private searchService: SearchService,
    private spinner: NgxSpinnerService
  ) {
    this.query = this.searchService.searchQuery;
  }

  ngOnInit() {
    this.spinner.show(); // possible bug TODO
    this.searchService.search(this.searchTerm$)
      .subscribe((results: Array<Food>) => {
        this.results = results;
        this.spinner.hide(); // possible bug TODO
      });

    this.searchTerm$.next(this.query);
  }
}
