import { TestBed, inject } from '@angular/core/testing';

import { AddFoodService } from './add-food.service';

describe('AddFoodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddFoodService]
    });
  });

  it('should be created', inject([AddFoodService], (service: AddFoodService) => {
    expect(service).toBeTruthy();
  }));
});
