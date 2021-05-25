import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverDetailPageRoutingModule } from './deliver-detail-routing.module';

import { DeliverDetailPage } from './deliver-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverDetailPageRoutingModule
  ],
  declarations: [DeliverDetailPage]
})
export class DeliverDetailPageModule {}
