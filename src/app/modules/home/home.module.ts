import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiService } from 'src/app/core/services/api.service';
import { HomeRepository } from 'src/app/repository/home/homeRepository';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';
import { UserService } from 'src/app/core/services/user/userService.service';


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
    HomeRepository,
    TokenRepository,
    UserService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
