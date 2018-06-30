import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

import { SearchService } from './search.service';
import { Food } from './../../shared/entities/food';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  results: Array<Food>;
  searchTerm$ = new Subject<string>();

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.searchService.search(this.searchTerm$)
      .subscribe((results: Array<Food>) => {
        this.results = results;
      });
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  onSubmit(form: FormGroup) {
    console.log('submitted');
  }

  goToFood(food: Food) {
    this.searchService.selectedFood = food;
    this.router.navigate(['/food', food.name]);
  }
}
