import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeRestaurantPageRoutingModule } from './home-restaurant-routing.module';

import { HomeRestaurantPage } from './home-restaurant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeRestaurantPageRoutingModule
  ],
  declarations: [HomeRestaurantPage]
})
export class HomeRestaurantPageModule {}
