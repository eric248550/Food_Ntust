import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantAddFoodPageRoutingModule } from './restaurant-add-food-routing.module';

import { RestaurantAddFoodPage } from './restaurant-add-food.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantAddFoodPageRoutingModule
  ],
  declarations: [RestaurantAddFoodPage]
})
export class RestaurantAddFoodPageModule {}
