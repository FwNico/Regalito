import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiService } from 'src/app/core/services/api.service';
import { HomeRepository } from 'src/app/repository/home/homeRepository';
import { UserRepository } from 'src/app/repository/user/userRepository';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers: [
    UserRepository,
    HomeRepository,
    TokenRepository
  ]
})
export class HomeModule { }
