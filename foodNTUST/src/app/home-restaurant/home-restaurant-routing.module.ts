import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeRestaurantPage } from './home-restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: HomeRestaurantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRestaurantPageRoutingModule {}
