import { MatTableModule, MatTableDataSource } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacrosTableComponent } from './macros-table.component';

describe('MacrosTableComponent', () => {
  let component: MacrosTableComponent;
  let fixture: ComponentFixture<MacrosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MacrosTableComponent],
      imports: [
        MatTableModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacrosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly without quantity', () => {
    expect(component.displayedColumns).toEqual(['name', 'calories', 'protein', 'carbs', 'fat']);
  });

  it('should initialize correctly with quantity', () => {
    // GIVEN
    component.hasQuantity = true;

    // WHEN
    component.ngOnInit();

    // THEN
    expect(component.displayedColumns).toEqual(['name', 'quantity', 'calories', 'protein', 'carbs', 'fat']);
  });

  it('should set dataSource data correctly', () => {
    // GIVEN
    component.data = [{ name: 'test', quantity: 100, calories: 100, protein: 10, carbs: 10, fat: 10 }];
    component.dataSource = new MatTableDataSource();

    // WHEN
    component.ngOnChanges();

    // THEN
    expect(component.dataSource.data).toEqual(component.data);
  });
});
