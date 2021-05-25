import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliverDetailPage } from './deliver-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DeliverDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliverDetailPageRoutingModule {}
