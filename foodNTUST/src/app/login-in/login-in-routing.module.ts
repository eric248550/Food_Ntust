import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginInPage } from './login-in.page';

const routes: Routes = [
  {
    path: '',
    component: LoginInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginInPageRoutingModule {}
