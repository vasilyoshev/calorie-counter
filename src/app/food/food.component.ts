import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';

import { SearchService } from './../search/search.service';
import { AddFoodDialogComponent } from './add-food-dialog/add-food-dialog.component';
import { Food } from './../shared/entities/food';
import { FoodService } from './food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  food: Food;

  constructor(
    private foodService: FoodService,
    private searchService: SearchService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.foodService.getFood(this.searchService.selectedFood.ndbno)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe((food: Food) => {
        this.food = food;
      },
        (err) => {
          alert('food component' + err); // TODO
        });
  }

  openDialog(): void {
    if (this.food) {
      this.dialog.open(AddFoodDialogComponent, { data: this.food });
    } // TODO handle this if
  }
}
