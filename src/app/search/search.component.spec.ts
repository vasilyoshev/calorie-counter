import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatIconModule,
        MatInputModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit if there is query', () => {
    // GIVEN
    const routerSpy = jest.spyOn(TestBed.get(Router), 'navigate')
      .mockImplementation(() => { });
    const searchSpy = jest.spyOn(component.search, 'emit');
    const formGroup = new FormGroup({
      query: new FormControl('query'),
    });

    // WHEN
    component.submit(formGroup);

    // THEN
    expect(routerSpy).toHaveBeenCalledWith(['search', formGroup.value.query]);
    expect(searchSpy).toHaveBeenCalledWith(formGroup.value.query);
  });
});
