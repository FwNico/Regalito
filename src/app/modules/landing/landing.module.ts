import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComponent } from '../auth/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    LandingPageComponent, 
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule 
  ]
})
export class LandingModule { }
