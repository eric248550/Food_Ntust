import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantSettingPage } from './restaurant-setting.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantSettingPageRoutingModule {}
