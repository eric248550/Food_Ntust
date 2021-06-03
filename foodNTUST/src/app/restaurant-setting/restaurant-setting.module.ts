import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantSettingPageRoutingModule } from './restaurant-setting-routing.module';

import { RestaurantSettingPage } from './restaurant-setting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantSettingPageRoutingModule
  ],
  declarations: [RestaurantSettingPage]
})
export class RestaurantSettingPageModule {}
