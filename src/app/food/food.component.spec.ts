import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatDividerModule, MatDialogModule } from '@angular/material';

import { FoodComponent } from './food.component';
import { SearchService } from './../search/search.service';

describe('FoodComponent', () => {
  let component: FoodComponent;
  let fixture: ComponentFixture<FoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodComponent ],
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatDividerModule,
        HttpClientModule,
        MatDialogModule
      ],
      providers: [
        SearchService
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
});
