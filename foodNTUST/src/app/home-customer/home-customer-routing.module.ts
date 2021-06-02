import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeCustomerPage } from './home-customer.page';

const routes: Routes = [
  {
    path: '',
    component: HomeCustomerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeCustomerPageRoutingModule {}
