import { Product } from '../models/Product';

export interface IWishlist {
    idList:string,
    name:string
    product: Product[] | null
}