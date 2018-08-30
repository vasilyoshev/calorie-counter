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

  it('should set protein cals correctly when exceeding total cals', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { target: { value: 500 } };
    service.calories = 400;

    // WHEN
    service.setProteinCals(event);

    // THEN
    expect(service.proteinCals).toEqual(service.calories);
  }));

  it('should set protein cals correctly when NOT exceeding total cals', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { target: { value: 300 } };
    service.calories = 400;

    // WHEN
    service.setProteinCals(event);

    // THEN
    expect(service.proteinCals).toEqual(event.target.value);
  }));

  it('should set carbs cals correctly when exceeding total cals - prot cals', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { target: { value: 500 } };
    service.calories = 400;
    service.proteinCals = 200;

    // WHEN
    service.setCarbsCals(event);

    // THEN
    expect(service.carbsCals).toEqual(service.calories - service.proteinCals);
  }));

  it('should set carbs cals correctly when NOT exceeding total cals - prot cals', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { target: { value: 100 } };
    service.calories = 400;
    service.proteinCals = 200;

    // WHEN
    service.setCarbsCals(event);

    // THEN
    expect(service.carbsCals).toEqual(event.target.value);
  }));

  it('should set fat cals correctly when exceeding total cals - prot cals', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { target: { value: 500 } };
    service.calories = 400;
    service.proteinCals = 200;

    // WHEN
    service.setFatCals(event);

    // THEN
    expect(service.fatCals).toEqual(service.calories - service.proteinCals);
  }));

  it('should set fat cals correctly when NOT exceeding total cals - prot cals', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { target: { value: 100 } };
    service.calories = 400;
    service.proteinCals = 200;

    // WHEN
    service.setFatCals(event);

    // THEN
    expect(service.fatCals).toEqual(event.target.value);
  }));

  it('should set protein grams correctly when exceeding total cals', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { target: { value: 200 } };
    service.calories = 400;

    // WHEN
    service.setProteinGrams(event);

    // THEN
    expect(service.proteinGrams).toEqual(service.calories / 4);
  }));

  it('should set protein grams correctly when NOT exceeding total cals', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { target: { value: 25 } };
    service.calories = 400;

    // WHEN
    service.setProteinGrams(event);

    // THEN
    expect(service.proteinGrams).toEqual(event.target.value);
  }));

  it('should set carbs grams correctly when exceeding total cals - prot cals', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { target: { value: 200 } };
    service.calories = 400;
    service.proteinCals = 200;

    // WHEN
    service.setCarbsGrams(event);

    // THEN
    expect(service.carbsGrams).toEqual((service.calories - service.proteinCals) / 4);
  }));

  it('should set carbs grams correctly when NOT exceeding total cals - prot cals', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { target: { value: 25 } };
    service.calories = 400;
    service.proteinCals = 200;

    // WHEN
    service.setCarbsGrams(event);

    // THEN
    expect(service.carbsGrams).toEqual(event.target.value);
  }));

  it('should set fat grams correctly when exceeding total cals - prot cals', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { target: { value: 200 } };
    service.calories = 400;
    service.proteinCals = 200;

    // WHEN
    service.setFatGrams(event);

    // THEN
    expect(service.fatGrams).toEqual(Math.round((service.calories - service.proteinCals) / 9));
  }));

  it('should set fat grams correctly when NOT exceeding total cals - prot cals', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { target: { value: 10 } };
    service.calories = 400;
    service.proteinCals = 200;

    // WHEN
    service.setFatGrams(event);

    // THEN
    expect(service.fatGrams).toEqual(event.target.value);
  }));

  it('should set carbs % correctly when exceeding (total - protein %)', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { value: 60 };
    service.proteinPercent = 50;

    // WHEN
    service.setCarbsPercent(event);

    // THEN
    expect(service.carbsPercent).toEqual(100 - service.proteinPercent);
  }));

  it('should set carbs % correctly when NOT exceeding (total - protein %)', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { value: 40 };
    service.proteinPercent = 50;

    // WHEN
    service.setCarbsPercent(event);

    // THEN
    expect(service.carbsPercent).toEqual(event.value);
  }));

  it('should set fat % correctly when exceeding (total - protein %)', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { value: 60 };
    service.proteinPercent = 50;

    // WHEN
    service.setFatPercent(event);

    // THEN
    expect(service.fatPercent).toEqual(100 - service.proteinPercent);
  }));

  it('should set fat % correctly when NOT exceeding (total - protein %)', inject([AddGoalService], (service: AddGoalService) => {
    // GIVEN
    const event = { value: 40 };
    service.proteinPercent = 50;

    // WHEN
    service.setFatPercent(event);

    // THEN
    expect(service.fatPercent).toEqual(event.value);
  }));
});
