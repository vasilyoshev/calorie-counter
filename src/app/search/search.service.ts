import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';

import { Food } from './../shared/entities/food';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  selectedFood: Food;

  constructor(private http: HttpClient) { }

  search(terms: Observable<string>): Observable<Array<Food>> {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term))
    );
  }

  searchEntries(term: string): Observable<Array<Food>> {
    if (term) {
      return this.http
        .post('food/search', { term: term, max: 5 }, { withCredentials: true })
        .pipe(
          map((res: any) => {
            return res.results;
          })
        );
    } else {
      return of([]);
    }
  }
}
