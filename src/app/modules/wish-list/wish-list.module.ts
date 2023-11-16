import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWishListComponent } from './add-wish-list/add-wish-list.component';
import { WishListRepository } from 'src/app/repository/wishList/wishListRepository';



@NgModule({
  declarations: [
    AddWishListComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    WishListRepository
  ]
})
export class WishListModule { }
