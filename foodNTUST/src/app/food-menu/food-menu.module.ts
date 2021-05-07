import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodMenuPageRoutingModule } from './food-menu-routing.module';

import { FoodMenuPage } from './food-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodMenuPageRoutingModule
  ],
  declarations: [FoodMenuPage]
})
export class FoodMenuPageModule {}
