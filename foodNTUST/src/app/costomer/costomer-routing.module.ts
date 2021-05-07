import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostomerPage } from './costomer.page';

const routes: Routes = [
  {
    path: '',
    component: CostomerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CostomerPageRoutingModule {}
