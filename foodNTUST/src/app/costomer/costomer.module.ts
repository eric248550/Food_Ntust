import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CostomerPageRoutingModule } from './costomer-routing.module';

import { CostomerPage } from './costomer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CostomerPageRoutingModule
  ],
  declarations: [CostomerPage]
})
export class CostomerPageModule {}
