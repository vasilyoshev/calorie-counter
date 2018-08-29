import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatDividerModule, MatDialogModule } from '@angular/material';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { of, throwError } from 'rxjs';

import { FoodComponent } from './food.component';
import { SearchService } from './../search/search.service';
import { FoodService } from './food.service';

describe('FoodComponent', () => {
  let component: FoodComponent;
  let fixture: ComponentFixture<FoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FoodComponent],
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatDividerModule,
        HttpClientModule,
        MatDialogModule
      ],
      providers: [
        SearchService,
        NgxSpinnerService,
        FoodService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodComponent);
    component = fixture.componentInstance;
    TestBed.get(SearchService).selectedFood = { ndbno: 1234 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set food correctly', () => {
    // GIVEN
    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');

    const mockFood = { calories: 100 };
    const getFoodSpy = jest.spyOn(TestBed.get(FoodService), 'getFood')
      .mockImplementation(() => of(mockFood));
    const routerSpy = jest.spyOn(TestBed.get(Router), 'navigate')
      .mockImplementation(() => { });

    // WHEN
    component.ngOnInit();

    // THEN
    expect(showSpinnerSpy).toHaveBeenCalled();
    expect(hideSpinnerSpy).toHaveBeenCalled();
    expect(component.food).toEqual(mockFood);
    expect(routerSpy).toHaveBeenCalledTimes(0);
  });

  it('should navigate to root on error', () => {
    // GIVEN
    const showSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'show');
    const hideSpinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');

    const mockFood = { calories: 100 };
    const getFoodSpy = jest.spyOn(TestBed.get(FoodService), 'getFood')
      .mockImplementation(() => throwError({}));
    const routerSpy = jest.spyOn(TestBed.get(Router), 'navigate')
      .mockImplementation(() => { });

    // WHEN
    component.ngOnInit();

    // THEN
    expect(showSpinnerSpy).toHaveBeenCalled();
    expect(hideSpinnerSpy).toHaveBeenCalled();
    expect(component.food).toEqual(undefined);
    expect(routerSpy).toHaveBeenCalled();
  });
});
