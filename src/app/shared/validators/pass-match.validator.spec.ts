import { FormBuilder, Validators } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';

import { ValidatePassMatch } from './pass-match.validator';

describe('TimePickerComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({ providers: [FormBuilder] })
            .compileComponents();
    }));

    it('should return notsame if passwords do not match', () => {
        const fb = TestBed.get(FormBuilder);
        const result = ValidatePassMatch(fb.group({
            password: ['test1', [Validators.required]],
            confirmPassword: ['test', [Validators.required]]
        }, { validator: ValidatePassMatch }));
        expect(result).toEqual({ notsame: true });
    });

    it('should return null if passwords match', () => {
        const fb = TestBed.get(FormBuilder);
        const result = ValidatePassMatch(fb.group({
            password: ['test', [Validators.required]],
            confirmPassword: ['test', [Validators.required]]
        }, { validator: ValidatePassMatch }));
        expect(result).toEqual(null);
    });
});
