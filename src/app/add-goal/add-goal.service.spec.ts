import { TestBed, inject } from '@angular/core/testing';

import { AddGoalService } from './add-goal.service';

describe('AddGoalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddGoalService]
    });
  });

  it('should be created', inject([AddGoalService], (service: AddGoalService) => {
    expect(service).toBeTruthy();
  }));
});
