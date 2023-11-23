import { Injectable } from "@angular/core";
import { TokenRepository } from "../token/tokenRepository";
import { WishList } from '../../core/models/WishList';

import { Meli } from "src/app/core/models/Meli";
import { WishListService } from "src/app/core/services/wishList/WishlistService.service";
import { Product } from "src/app/core/models/Product";
import { Observable } from "rxjs";

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
        let list: Product[] | undefined
        this.getWishListForId(idWishlist).then((response) => {
            list = response?.products
            if (list !== undefined) {
                let baseList: Product[] = list.concat(product)
                this.wishlistService.editWishList(baseList, idWishlist).subscribe({
                    next: (data) => { console.log("se guardo correctamente" + data) },
                    error: (error) => { console.log("Error al modificar la wishlist" + error) }
                })
            }
        })
    }
 
    deleteProductWishList(idWishlist:number, idProducto: string){
        let list: Product[] | undefined
        this.getWishListForId(idWishlist).then((response) => {
            list = response?.products
            if (list !== undefined) {
                list= list.filter((element)=> element.id !== idProducto)
                this.wishlistService.editWishList(list, idWishlist).subscribe({
                    next: (data) => { console.log("se borro pa" + data) },
                    error: (error) => { console.log("Error al borrar el producto de la wishlist" + error) }
                })
            }
        })
    }

    
    getWishListForId(id: number): Promise<WishList | undefined> {
        return this.wishlistService.getWishList(id)
    }
    
    getAllWishList(idUser: number) {
        this.wishlistService.getAllWishList(idUser).subscribe({
            next: (respose) => { console.log(respose) },
            error: (error) => { console.log(error) }
        })
    }

    deleteWishList(idWishlist: number) {
        this.wishlistService.deleteWishList(idWishlist).subscribe({
            next: (data) => { console.log("se borro" + data) },
            error: (error) => { console.log("error al eliminar" + error) }
        }
        )
    }
}
