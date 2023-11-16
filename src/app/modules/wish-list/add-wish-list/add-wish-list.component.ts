import { Component } from '@angular/core';
import { WishList } from '../../../core/models/WishList';
import { Product } from 'src/app/core/models/Product';
import { WishListRepository } from 'src/app/repository/wishList/wishListRepository';

@Component({
  selector: 'app-add-wish-list',
  templateUrl: './add-wish-list.component.html',
  styleUrls: ['./add-wish-list.component.css']
})
export class AddWishListComponent {
  constructor(private wishListRepository: WishListRepository) { }

  createWishtList(name: string, listProducts: Product[]) {
    const wishList = new WishList(name, listProducts)

    this.wishListRepository.saveWishlist(wishList)
  }
}
