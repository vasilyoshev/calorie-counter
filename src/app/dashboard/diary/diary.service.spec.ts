import { TestBed, inject } from '@angular/core/testing';

import { DiaryService } from './diary.service';

describe('DiaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiaryService]
    });
  });

  it('should be created', inject([DiaryService], (service: DiaryService) => {
    expect(service).toBeTruthy();
  }));
});
