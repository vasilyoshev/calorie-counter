import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { FoodService } from './food.service';

describe('FoodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([FoodService], (service: FoodService) => {
    expect(service).toBeTruthy();
  }));
});
