import { IWishlist } from "../interfaces/IWishList";
import { Product } from "./Product";

export class WishList implements IWishlist {
    idList: string;
    name: string;
    product: Product[] | null;

    constructor( name: string, product: Product[] | null, ) {
        this.idList = ""
        this.name = name
        this.product = product
    }

}