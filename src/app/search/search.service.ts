import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';

import { Food } from '../shared/entities/food';
import { SearchResults } from '../shared/entities/SearchResults';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  selectedFood: Food;
  searchQuery: string;
  results: Array<Food>;

  constructor(private http: HttpClient) { }

  search(queries: Observable<any>): Observable<SearchResults> {
    return queries.pipe(
      switchMap(query => {
        return this.http.post<SearchResults>('food/search',
          { term: query.term, max: query.pageSize, offset: query.offset },
          { withCredentials: true }
        );
      })
    );
  }
}
