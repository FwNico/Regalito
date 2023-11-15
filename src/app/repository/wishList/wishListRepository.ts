import { Injectable } from "@angular/core";
import { TokenRepository } from "../token/tokenRepository";
import { WishList } from '../../core/models/WishList';

import { Meli } from "src/app/core/models/Meli";
import { WishListService } from "src/app/core/services/wishList/WishlistService.service";
import { Product } from "src/app/core/models/Product";

@Injectable({
    providedIn: 'root'
})
export class WishListRepository {

    private meli: Meli
    constructor(private tokenAcces: TokenRepository, private wishlistService: WishListService) {
        this.meli = tokenAcces.getAccessToken() as Meli
    }

    saveWishlist(wishList: WishList): boolean {
        let response: boolean = false

        this.wishlistService.saveWishList(wishList).subscribe({
            next: (data) => { response = true },
            error: (error) => { console.log(error) }
        })

        return response
    }

    editWishList(product: Product[], idWishlist: number) {

        this.wishlistService.editWishList(product, idWishlist).subscribe({
            next: (data) => { console.log(data) },
            error: (error) => { console.log(error) }
        })
    }

    getWishListForId(id: number) {
        this.wishlistService.getWishList(id).subscribe({
            next: (response) => { console.log(response) },
            error: (error) => { console.log(error) }
        })
    }

    getAllWishList(idUser: number) {
        this.wishlistService.getAllWishList(idUser).subscribe({
            next: (respose) => { console.log(respose) },
            error: (error) => { console.log(error) }
        })
    }

}
