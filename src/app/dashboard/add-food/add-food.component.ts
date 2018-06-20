import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/internal/Subscription';

import { Food } from './../../shared/entities/food';
import { AddFoodService } from './add-food.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit, OnDestroy {

  routeParamsSub: Subscription;
  food: Food;

  constructor(
    private route: ActivatedRoute,
    private addFoodService: AddFoodService
  ) { }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.addFoodService.getFood(+params['ndbno'])
        .subscribe((food: any) => {
          if (food.error) {
            console.log('does not exist');
          }
          this.food = food;
        },
          (err) => {
            console.log(err);
          });
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }
}
