import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginInPageRoutingModule } from './login-in-routing.module';

import { LoginInPage } from './login-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginInPageRoutingModule
  ],
  declarations: [LoginInPage]
})
export class LoginInPageModule {}
