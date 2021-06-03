import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login-in',
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
  {
    path: 'deliver-detail',
    loadChildren: () => import('./deliver-detail/deliver-detail.module').then( m => m.DeliverDetailPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'home-customer',
    loadChildren: () => import('./home-customer/home-customer.module').then( m => m.HomeCustomerPageModule)
  },
  {
    path: 'home-restaurant',
    loadChildren: () => import('./home-restaurant/home-restaurant.module').then( m => m.HomeRestaurantPageModule)
  },
  {
    path: 'home-deliver',
    loadChildren: () => import('./home-deliver/home-deliver.module').then( m => m.HomeDeliverPageModule)
  },
  {
    path: 'restaurant-detail',
    loadChildren: () => import('./restaurant-detail/restaurant-detail.module').then( m => m.RestaurantDetailPageModule)
  },
  {
    path: 'restaurant-order',
    loadChildren: () => import('./restaurant-order/restaurant-order.module').then( m => m.RestaurantOrderPageModule)
  },
  {
    path: 'restaurant-setting',
    loadChildren: () => import('./restaurant-setting/restaurant-setting.module').then( m => m.RestaurantSettingPageModule)
  },
  {
    path: 'restaurant-add-food',
    loadChildren: () => import('./restaurant-add-food/restaurant-add-food.module').then( m => m.RestaurantAddFoodPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
