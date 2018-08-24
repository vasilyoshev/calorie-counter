import { FormBuilder, Validators } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';

import { ValidatePassMatch } from './pass-match.validator';

describe('TimePickerComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({ providers: [FormBuilder] })
            .compileComponents();
    }));

    it('should return notsame if passwords do not match', () => {
        // GIVEN
        const fb = TestBed.get(FormBuilder);
        // WHEN
        const result = ValidatePassMatch(fb.group({
            password: ['test1', [Validators.required]],
            confirmPassword: ['test', [Validators.required]]
        }, { validator: ValidatePassMatch }));
        // THEN
        expect(result).toEqual({ notsame: true });
    });

    it('should return null if passwords match', () => {
        // GIVEN
        const fb = TestBed.get(FormBuilder);
        // WHEN
        const result = ValidatePassMatch(fb.group({
            password: ['test', [Validators.required]],
            confirmPassword: ['test', [Validators.required]]
        }, { validator: ValidatePassMatch }));
        // THEN
        expect(result).toEqual(null);
    });
});
