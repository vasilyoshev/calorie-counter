import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { NgxSpinnerService } from 'ngx-spinner';

import { AddFoodDialogComponent } from './add-food-dialog/add-food-dialog.component';
import { Food } from './../shared/entities/food';
import { FoodService } from './food.service';
import { SearchService } from '../dashboard/search/search.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  food: Food;

  constructor(
    public foodService: FoodService,
    private searchService: SearchService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.foodService.getFood(this.searchService.selectedFood.ndbno)
      .subscribe((food: any) => {
        if (food.error) {
          console.log('does not exist');
        }
        this.food = food;
        this.spinner.hide();
      },
        (err) => {
          console.log(err);
        });
  }

  openDialog() {
    this.dialog.open(AddFoodDialogComponent, {
      // width: '250px',
      data: this.food
    });
  }
}
