import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { ProfileService } from './profile.service';
import { of, throwError } from 'rxjs';
import { User } from '../shared/entities/user';

describe('ProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService, HttpTestingController],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([ProfileService], (service: ProfileService) => {
    expect(service).toBeTruthy();
  }));

  it('should set user on getProfile()', inject([ProfileService],
    (service: ProfileService) => {
      // GIVEN
      const user = new User();
      const getProfileSpy = jest.spyOn(TestBed.get(HttpClient), 'get')
        .mockImplementation(() => of(user));

      // WHEN
      service.getProfile().subscribe();

      // THEN
      expect(getProfileSpy).toHaveBeenCalled();
      expect(service.user).toEqual(user);
    }));

  it('should successfully set meal type', inject([ProfileService],
    (service: ProfileService) => {
      // GIVEN
      service.user = new User();
      service.user.mealTypes = [];
      const setMealTypesSpy = jest.spyOn(service, 'setMealTypes')
        .mockImplementation(() => of({}));

      // WHEN
      service.addMealType('Breakfast');

      // THEN
      expect(setMealTypesSpy).toHaveBeenCalled();
      expect(service.user.mealTypes[0]).toEqual('Breakfast');
    }));

  it('should unset meal type on error', inject([ProfileService], (service: ProfileService) => {
    // GIVEN
    service.user = new User();
    service.user.mealTypes = [];
    const setMealTypesSpy = jest.spyOn(service, 'setMealTypes')
      .mockImplementation(() => throwError({}));

    // WHEN
    service.addMealType('Breakfast').subscribe();

    // THEN
    expect(setMealTypesSpy).toHaveBeenCalled();
    expect(service.user.mealTypes.length).toEqual(0);
  }));

  it('should remove type if it is part of mealTypes', inject([ProfileService], (service: ProfileService) => {
    // GIVEN
    service.user = new User();
    service.user.mealTypes = ['Breakfast'];
    const spliceSpy = jest.spyOn(service.user.mealTypes, 'splice');
    const setMealTypesSpy = jest.spyOn(service, 'setMealTypes')
      .mockImplementation(() => of({}));

    // WHEN
    service.removeMealType('Breakfast').subscribe();

    // THEN
    expect(spliceSpy).toHaveBeenCalled();
    expect(setMealTypesSpy).toHaveBeenCalled();
  }));

  it('should re-add type if http error arises', inject([ProfileService], (service: ProfileService) => {
    // GIVEN
    service.user = new User();
    service.user.mealTypes = ['Breakfast'];
    const spliceSpy = jest.spyOn(service.user.mealTypes, 'splice');
    const pushSpy = jest.spyOn(service.user.mealTypes, 'push');
    const setMealTypesSpy = jest.spyOn(service, 'setMealTypes')
      .mockImplementation(() => throwError({}));

    // WHEN
    service.removeMealType('Breakfast').subscribe();

    // THEN
    expect(spliceSpy).toHaveBeenCalled();
    expect(setMealTypesSpy).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalled();
  }));
});
