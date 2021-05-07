import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodMenuPage } from './food-menu.page';

const routes: Routes = [
  {
    path: '',
    component: FoodMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodMenuPageRoutingModule {}
