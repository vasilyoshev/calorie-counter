import { ReactiveFormsModule } from '@angular/forms';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RegisterService } from './register.service';

describe('DiaryService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RegisterService],
            imports: [
                HttpClientModule,
                ReactiveFormsModule
            ]
        });
    });

    it('should be created', inject([RegisterService], (service: RegisterService) => {
        expect(service).toBeTruthy();
    }));
});
