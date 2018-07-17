import { Component } from '@angular/core';

import { Subject } from 'rxjs';

import { Food } from './../shared/entities/food';
import { SearchService } from './../search/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {

  query: string;
  results: Array<Food>;
  searchTerm$ = new Subject<string>();

  constructor(private searchService: SearchService) {
    this.query = this.searchService.searchQuery;

    this.searchService.search(this.searchTerm$)
      .subscribe((results: Array<Food>) => {
        this.results = results;
      });

    this.searchTerm$.next(this.query);
  }
}
