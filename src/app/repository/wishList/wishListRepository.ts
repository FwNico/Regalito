import { Injectable } from "@angular/core";
import { TokenRepository } from "../token/tokenRepository";
import { WishList } from '../../core/models/WishList';

import { Meli } from "src/app/core/models/Meli";
import { WishListService } from "src/app/core/services/wishList/WishlistService.service";

@Injectable({
    providedIn: 'root'
})
export class WishListRepository {

    meli: Meli
    constructor(private tokenAcces: TokenRepository, private wishlistService: WishListService) {
        this.meli = tokenAcces.getAccessToken() as Meli
    }

    saveWishlist(wishList: WishList): boolean {
        let response: boolean = false

        this.wishlistService.saveWishList(wishList, this.meli.user_id).subscribe(
            (next) => {
                (next != null) ? response = true : false
            },
            (error) => {
                console.log("error del fallo del guardado de la wishlist")
            },
            () => response = false
        )
        return response
    }
}