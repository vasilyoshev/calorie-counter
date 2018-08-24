import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';

import { ValidatePassMatch } from './pass-match.validator';

describe('TimePickerComponent', () => {
    let component: StubComponent;
    let fixture: ComponentFixture<StubComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StubComponent],
            imports: [ReactiveFormsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StubComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    template: '<form [formGroup]="formGroup">' +
        '<input name="pass">' +
        '<input name="confirmPass">' +
        '</form>'
})
class StubComponent {
    pass = 'pass';
    confirmPass = 'pass';
    formGroup: FormGroup;

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]]
        }, { validator: ValidatePassMatch });
    }



}
