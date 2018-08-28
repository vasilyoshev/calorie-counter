import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('DiaryService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoginService],
            imports: [HttpClientModule]
        });
    });

    it('should be created', inject([LoginService], (service: LoginService) => {
        expect(service).toBeTruthy();
    }));

    it('should set login from response to true', inject([LoginService], (service: LoginService) => {
        // GIVEN
        const getProfileSpy = jest.spyOn(TestBed.get(HttpClient), 'get')
            .mockImplementation(() => of({ loggedIn: true }));

        // WHEN
        service.isLoggedIn().subscribe();

        // THEN
        expect(getProfileSpy).toHaveBeenCalled();
        expect(service.loggedIn).toBe(true);
    }));

    it('should set login from response to false', inject([LoginService], (service: LoginService) => {
        // GIVEN
        const getProfileSpy = jest.spyOn(TestBed.get(HttpClient), 'get')
            .mockImplementation(() => of({ loggedIn: false }));

        // WHEN
        service.isLoggedIn().subscribe();

        // THEN
        expect(getProfileSpy).toHaveBeenCalled();
        expect(service.loggedIn).toBe(false);
    }));
});
