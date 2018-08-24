import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatIconModule, MatInputModule, MatTableModule, MatPaginatorModule, PageEvent } from '@angular/material';

import { of, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { SearchComponent } from './../search/search.component';
import { SearchResultsComponent } from './search-results.component';
import { SearchService } from './../search/search.service';
import { Food } from './../shared/entities/food';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchResultsComponent,
        SearchComponent
      ],
      imports: [
        MatPaginatorModule,
        NoopAnimationsModule,
        MatIconModule,
        MatTableModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatInputModule,
        RouterTestingModule,
        MatCardModule
      ],
      providers: [
        SearchService,
        NgxSpinnerService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set results and hide spinner on search success', () => {
    // GIVEN
    jest.spyOn(TestBed.get(SearchService), 'search')
      .mockImplementation(() => of({ results: 'test' }));
    const spinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(component.results).toEqual('test');
    expect(spinnerSpy).toHaveBeenCalledTimes(1);
  });

  it('should hide spinner and navigate to root on search failure', () => {
    // GIVEN
    const routerSpy = jest.spyOn(TestBed.get(Router), 'navigate');
    const spinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    jest.spyOn(TestBed.get(SearchService), 'search')
      .mockImplementation(() => throwError(of()));

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(spinnerSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledWith(['']);
  });

  it('should set page size and show spinner onPaginatorChange()', () => {
    // GIVEN
    const spinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const pageEvent = new PageEvent();
    pageEvent.pageSize = 1;

    // WHEN
    component.onPaginatorChange(pageEvent);

    // THEN
    expect(spinnerSpy).toHaveBeenCalledTimes(1);
    expect(component.pageSize).toEqual(pageEvent.pageSize);
  });

  it('should reset pageIndex if paginator exists', () => {
    // GIVEN
    jest.spyOn(TestBed.get(SearchService), 'search')
      .mockImplementation(() => of({ results: 'test' }));

    // WHEN
    fixture.detectChanges();
    component.onSearch('query');

    // THEN
    expect(component.paginator.pageIndex).toEqual(0);
  });

  it('should navigate to food correctly', () => {
    // GIVEN
    const routerSpy = jest.spyOn(TestBed.get(Router), 'navigate');
    const food = new Food();
    food.name = 'kiwi';

    // WHEN
    component.goToFood(food);
    // THEN
    expect(routerSpy).toHaveBeenCalledWith(['/food', food.name]);
  });
});
