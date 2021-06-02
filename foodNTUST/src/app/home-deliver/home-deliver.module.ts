import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeDeliverPageRoutingModule } from './home-deliver-routing.module';

import { HomeDeliverPage } from './home-deliver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeDeliverPageRoutingModule
  ],
  declarations: [HomeDeliverPage]
})
export class HomeDeliverPageModule {}
