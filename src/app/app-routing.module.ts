import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { LandingPageComponent } from './modules/landing/landing-page/landing-page.component';
import { Error404Component } from './shared/components/error404/error404.component';
import { ViewUserComponent } from './modules/user/view-user/view-user.component';
import { ListRegalitosComponent } from './modules/regalito/list-regalitos/list-regalitos.component';

const routes: Routes = [

  {
    path: 'landing',
    component: LandingPageComponent,
    loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
  },

  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'home',
    component: HomePageComponent,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'user/:userId',
    component: ViewUserComponent,
    loadChildren: ()=> import("./modules/user/user.module").then(u => u.UserModule)
  },

  {
    path:'regalito',
    component: ListRegalitosComponent,
    loadChildren: ()=> import("./modules/regalito/regalito.module").then(u => u.RegalitoModule)
  },
  
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },

  {
    path:'**',
    component: Error404Component
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
