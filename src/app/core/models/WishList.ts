import { IWishlist } from "../interfaces/IWishList";
import { Product } from "./Product";

export class WishList implements IWishlist {
    id: number | null;
    idUser: number;
    nombre: string;
    products: Product[] ;

    constructor(name: string, product: Product[], idUser: number) {
        this.id = null
        this.idUser = idUser
        this.nombre = name
        this.products = product
    }
}