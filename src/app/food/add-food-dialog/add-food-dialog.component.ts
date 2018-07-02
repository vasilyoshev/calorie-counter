import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FoodService } from './../food.service';
import { Food } from './../../shared/entities/food';

@Component({
  selector: 'app-add-food-dialog',
  templateUrl: './add-food-dialog.component.html',
  styleUrls: ['./add-food-dialog.component.scss']
})
export class AddFoodDialogComponent implements OnInit {

  selectedMeal: string;
  addFoodForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddFoodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Food,
    private fb: FormBuilder,
    private foodService: FoodService
  ) { }

  ngOnInit() {
    this.addFoodForm = this.fb.group({
      quantity: ['100', [Validators.required]],
      meal: ['', [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }

    this.foodService.addToDiary(this.data, form.value.quantity, form.value.meal).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
