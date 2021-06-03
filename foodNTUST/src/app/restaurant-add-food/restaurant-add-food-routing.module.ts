import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantAddFoodPage } from './restaurant-add-food.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantAddFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantAddFoodPageRoutingModule {}
