import { Product } from '../models/Product';

export interface IWishlist {
    id: number | null,
    idUser: number,
    nombre: string
    products: Product[] 
}