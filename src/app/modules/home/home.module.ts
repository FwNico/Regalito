import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiService } from 'src/app/core/services/api.service';
import { HomeRepository } from 'src/app/repository/home/homeRepository';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';
import { UserService } from 'src/app/core/services/user/userService.service';
import { CarouselFavComponent } from './home-page/carousel-fav/carousel-fav.component';
import { ProductRepository } from 'src/app/repository/products/ProductsRepository';
import { WishListRepository } from 'src/app/repository/wishList/wishListRepository';
import { CarouselWhislistComponent } from './home-page/carousel-whislist/carousel-whislist.component';




@NgModule({
  declarations: [
    HomePageComponent,
    CarouselFavComponent,
    CarouselWhislistComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    HomeRepository,
    TokenRepository,
    UserService,
    ProductRepository,
    WishListRepository
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
