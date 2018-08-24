import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';

describe('DiaryService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoginService],
            imports: [
                HttpClientModule
            ]
        });
    });

    it('should be created', inject([LoginService], (service: LoginService) => {
        expect(service).toBeTruthy();
    }));
});
