import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeCustomerPageRoutingModule } from './home-customer-routing.module';

import { HomeCustomerPage } from './home-customer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeCustomerPageRoutingModule
  ],
  declarations: [HomeCustomerPage]
})
export class HomeCustomerPageModule {}
