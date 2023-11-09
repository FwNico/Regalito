import { ProductService } from "src/app/core/services/products/products.service";
import { TokenRepository } from "../token/tokenRepository";
import { Meli } from "src/app/core/models/Meli";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProductRepository {

    tokenAcces: Meli | null
    constructor(private tokenRepository: TokenRepository, private service: ProductService) {
        this.tokenAcces = tokenRepository.getAccessToken()
    }

    getListFavorites() {
        (this.tokenAcces != null) ? this.service.favoritesList(this.tokenAcces.access_token).
            then((response) => {
                console.log(JSON.stringify(response, null, 3))
            }) : console.log("rompio")
    }
}