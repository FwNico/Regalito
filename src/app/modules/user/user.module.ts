import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselWhislistComponent } from '../home/home-page/carousel-whislist/carousel-whislist.component';
import { HomeModule } from '../home/home.module';
import { WishListRepository } from 'src/app/repository/wishList/wishListRepository';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';
import { RegalitoRepository } from 'src/app/repository/regalito/RegalitoRepository';




@NgModule({
  declarations: [
    ViewUserComponent,
    AddUserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeModule
  ],
  providers: [
    WishListRepository,
    TokenRepository,
    RegalitoRepository
  ]
})
export class UserModule { }
