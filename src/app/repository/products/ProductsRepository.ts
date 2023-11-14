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
        this.tokenAcces = tokenRepository.getAccessToken() as Meli
    }

    getProductsList() {
        (this.tokenAcces != null) ? this.service.productsList(this.tokenAcces.access_token, this.tokenAcces.user_id).subscribe((response) => {
            console.log(response)
        }) : console.log("rompio")
    }
}