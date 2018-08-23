import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { AddGoalService } from './add-goal.service';

describe('AddGoalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddGoalService],
      imports: [
        ReactiveFormsModule,
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([AddGoalService], (service: AddGoalService) => {
    expect(service).toBeTruthy();
  }));
});
