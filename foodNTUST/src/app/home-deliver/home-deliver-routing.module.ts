import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDeliverPage } from './home-deliver.page';

const routes: Routes = [
  {
    path: '',
    component: HomeDeliverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDeliverPageRoutingModule {}
