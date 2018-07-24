import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { SearchService } from './search.service';
import { Food } from './../shared/entities/food';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  results: Array<Food>;
  @Output() submit = new EventEmitter<string>();
  @Input() placeholder: string;

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  onSubmit(form: FormGroup): void {
    if (form.value.query) {
      this.searchService.searchQuery = form.value.query;
      this.router.navigate(['search', form.value.query]);
      this.submit.emit(form.value.query);
    }
  }
}
