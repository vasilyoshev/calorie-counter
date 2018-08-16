import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';

import { Food } from '../shared/entities/food';
import { SearchResult } from '../shared/entities/SearchResult';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  selectedFood: Food;
  searchQuery: string;
  results: Array<Food>;

  constructor(private http: HttpClient) { }

  search(queries: Observable<any>): Observable<SearchResult> {
    return queries.pipe(
      switchMap(query => this.searchEntries(query.term, query.pageSize, query.offset))
    );
  }

  searchEntries(term: string, max: number, offset: number): Observable<SearchResult> {
    return this.http
      .post('food/search', { term: term, max: max, offset: offset }, { withCredentials: true })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
