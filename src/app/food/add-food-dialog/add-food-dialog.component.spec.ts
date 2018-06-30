import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodDialogComponent } from './add-food-dialog.component';

describe('AddFoodDialogComponent', () => {
  let component: AddFoodDialogComponent;
  let fixture: ComponentFixture<AddFoodDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFoodDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
