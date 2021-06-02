import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantOrderPage } from './restaurant-order.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantOrderPageRoutingModule {}
