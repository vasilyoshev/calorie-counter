import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileService } from './profile.service';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {
  MatCardModule, MatDividerModule, MatChipsModule, MatTableModule,
  MatIconModule, MatInputModule, MatSnackBarModule
} from '@angular/material';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        MatCardModule,
        MatDividerModule,
        MatChipsModule,
        MatTableModule,
        MatIconModule,
        MatInputModule,
        HttpClientModule,
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      providers: [ProfileService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    TestBed.get(ProfileService).user = {
      fname: 'Fname',
      lname: 'Lname',
      goal: { calories: 1000 }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
