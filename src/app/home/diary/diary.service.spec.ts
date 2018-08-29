import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { DiaryService } from './diary.service';
import { of } from 'rxjs';

describe('DiaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiaryService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([DiaryService], (service: DiaryService) => {
    expect(service).toBeTruthy();
  }));

  it('should set service properties accordingly', inject([DiaryService], (service: DiaryService) => {
    // GIVEN
    const mealDate = '2018-08-27T15:18:54.734Z';
    const postDaySpy = jest.spyOn(TestBed.get(HttpClient), 'post')
      .mockImplementation(() => of({summary: [], meals: [{date: mealDate}]}));

    // WHEN
    service.getDay(new Date('2018-08-26T21:00:00.000Z')).subscribe();

    // THEN
    expect(postDaySpy).toHaveBeenCalled();
    expect(service.summary).toEqual([]);
    expect(service.meals[0].date).toEqual(mealDate);
    expect(service.meals[0].time).toEqual('18:18'); // local time GMT+3
    expect(service.currentDate.getDate()).toEqual(27);
    expect(service.currentDate.getMonth()).toEqual(7);
    expect(service.currentDate.getFullYear()).toEqual(2018);
  }));
});
