import { TestBed, inject } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatorService]
    });
  });

  it('should be created', inject([CalculatorService], (service: CalculatorService) => {
    expect(service).toBeTruthy();
  }));

  it('should return correct REE for male', inject([CalculatorService], (service: CalculatorService) => {
    // GIVEN
    const gender = 'male';
    const weight = 75;
    const height = 175;
    const age = 25;

    // WHEN
    const result = service.getRee(gender, weight, height, age);
    // THEN
    expect(result).toEqual(1723.75);
  }));

  it('should return correct REE for female', inject([CalculatorService], (service: CalculatorService) => {
    // GIVEN
    const gender = 'female';
    const weight = 75;
    const height = 175;
    const age = 25;

    // WHEN
    const result = service.getRee(gender, weight, height, age);
    // THEN
    expect(result).toEqual(1557.75);
  }));

  it('should return correct TDEE for sedentary', inject([CalculatorService], (service: CalculatorService) => {
    // GIVEN
    const ree = 1500;
    const activity = 'sedentary';

    // WHEN
    const result = service.getTdee(ree, activity);
    // THEN
    expect(result).toEqual(1800);
  }));

  it('should return correct TDEE for light', inject([CalculatorService], (service: CalculatorService) => {
    // GIVEN
    const ree = 1500;
    const activity = 'light';

    // WHEN
    const result = service.getTdee(ree, activity);
    // THEN
    expect(result).toEqual(2062.5);
  }));

  it('should return correct TDEE for moderate', inject([CalculatorService], (service: CalculatorService) => {
    // GIVEN
    const ree = 1500;
    const activity = 'moderate';

    // WHEN
    const result = service.getTdee(ree, activity);
    // THEN
    expect(result).toEqual(2325);
  }));

  it('should return correct TDEE for high', inject([CalculatorService], (service: CalculatorService) => {
    // GIVEN
    const ree = 1500;
    const activity = 'high';

    // WHEN
    const result = service.getTdee(ree, activity);
    // THEN
    expect(result).toEqual(2587.5);
  }));

  it('should return correct goal calories for losing weight', inject([CalculatorService], (service: CalculatorService) => {
    // GIVEN
    const tdee = 1500;
    const goal = 'lose';

    // WHEN
    const result = service.getGoalCalories(tdee, goal);
    // THEN
    expect(result).toEqual(1200);
  }));

  it('should return correct goal calories for maintaining weight', inject([CalculatorService], (service: CalculatorService) => {
    // GIVEN
    const tdee = 1500;
    const goal = 'maintain';

    // WHEN
    const result = service.getGoalCalories(tdee, goal);
    // THEN
    expect(result).toEqual(1500);
  }));

  it('should return correct goal calories for gaining weight', inject([CalculatorService], (service: CalculatorService) => {
    // GIVEN
    const tdee = 1500;
    const goal = 'gain';

    // WHEN
    const result = service.getGoalCalories(tdee, goal);
    // THEN
    expect(result).toEqual(1800);
  }));
});
