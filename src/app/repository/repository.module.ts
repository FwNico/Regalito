import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositoryRoutingModule } from './repository-routing.module';
import { LandingComponent } from './landingRepository/landing.component';
import { HomeComponent } from './home/home.component';
import { HomeRepositoryComponent } from './home-repository/home-repository.component';
import { LandingRepositoryComponent } from './landing-repository/landing-repository.component';


@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    HomeRepositoryComponent,
    LandingRepositoryComponent
  ],
  imports: [
    CommonModule,
    RepositoryRoutingModule
  ]
})
export class RepositoryModule { }
