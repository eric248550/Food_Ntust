import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'costomer',
    loadChildren: () => import('./costomer/costomer.module').then( m => m.CostomerPageModule)
  },
  {
    path: 'deliver',
    loadChildren: () => import('./deliver/deliver.module').then( m => m.DeliverPageModule)
  },
  {
    path: 'food-menu/:restaurant_ID',
    loadChildren: () => import('./food-menu/food-menu.module').then( m => m.FoodMenuPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'food-detail/:restaurant_ID/:food_ID',
    loadChildren: () => import('./food-detail/food-detail.module').then( m => m.FoodDetailPageModule)
  },
  {
    path: 'login-in',
    loadChildren: () => import('./login-in/login-in.module').then( m => m.LoginInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'restaurant',
    loadChildren: () => import('./restaurant/restaurant.module').then( m => m.RestaurantPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
