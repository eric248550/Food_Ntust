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
    path: 'food-menu',
    loadChildren: () => import('./food-menu/food-menu.module').then( m => m.FoodMenuPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./auth/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'food-detail',
    loadChildren: () => import('./food-detail/food-detail.module').then( m => m.FoodDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
