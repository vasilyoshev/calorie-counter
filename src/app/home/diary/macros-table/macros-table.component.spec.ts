import { MatTableModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacrosTableComponent } from './macros-table.component';

describe('MacrosTableComponent', () => {
  let component: MacrosTableComponent;
  let fixture: ComponentFixture<MacrosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacrosTableComponent ],
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
});
