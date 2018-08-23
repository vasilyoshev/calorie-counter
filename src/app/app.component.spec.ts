import { HttpClientModule } from '@angular/common/http';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';

import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginService } from './login/login.service';
import { ProfileService } from './profile/profile.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ToolbarComponent
      ],
      imports: [
        RouterTestingModule,
        NgxSpinnerModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        HttpClientModule
      ],
      providers: [
        LoginService,
        ProfileService,
        NgxSpinnerService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
  it('should get profile and close spinner when logged in', () => {
    // GIVEN
    jest.spyOn(TestBed.get(LoginService), 'isLoggedIn')
      .mockImplementation(() => of(true));

    const profileServiceSpy = jest.spyOn(TestBed.get(ProfileService), 'getProfile')
      .mockImplementation(() => of());

    const spinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    // WHEN
    component.checkIfLoggedIn();

    // THEN
    expect(profileServiceSpy).toHaveBeenCalledTimes(1);
    expect(spinnerSpy).toHaveBeenCalledTimes(1);
  });

  it('should get close spinner when NOT logged in', () => {
    // GIVEN
    jest.spyOn(TestBed.get(LoginService), 'isLoggedIn')
      .mockImplementation(() => of(false));

    const spinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    // WHEN
    component.checkIfLoggedIn();

    // THEN
    expect(spinnerSpy).toHaveBeenCalledTimes(1);
  });
});
