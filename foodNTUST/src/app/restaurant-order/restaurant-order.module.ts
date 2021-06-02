import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantOrderPageRoutingModule } from './restaurant-order-routing.module';

import { RestaurantOrderPage } from './restaurant-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantOrderPageRoutingModule
  ],
  declarations: [RestaurantOrderPage]
})
export class RestaurantOrderPageModule {}
