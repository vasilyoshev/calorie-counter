import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToolbarComponent } from './toolbar.component';
import { LoginService } from './../login/login.service';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule
      ],
      providers: [
        LoginService,
        NgxSpinnerService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigate to home on successful logout', async(() => {
    // GIVEN
    const routerSpy = jest.spyOn(TestBed.get(Router), 'navigate')
      .mockImplementation(() => { });
    jest.spyOn(TestBed.get(LoginService), 'logout')
      .mockImplementation(() => of(true));

    // WHEN
    component.onLogout();

    // THEN
    expect(routerSpy).toHaveBeenCalledWith(['']);
  }));

  it('should hide spinner on logout', async(() => {
    // GIVEN
    const spinnerSpy = jest.spyOn(TestBed.get(NgxSpinnerService), 'hide');
    jest.spyOn(TestBed.get(LoginService), 'logout')
      .mockImplementation(() => of());

    // WHEN
    component.onLogout();

    // THEN
    expect(spinnerSpy).toHaveBeenCalledTimes(1);
  }));
});
