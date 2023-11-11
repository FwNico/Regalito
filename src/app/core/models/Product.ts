import { IProduct } from "../interfaces/IProduct";

export class Product implements IProduct {

    id: string | null;
    name: string | null;
    image: string | null;
    price: number | null;
  
    constructor(product?: any) {
      this.id = product.id != null ? product.id : null;
      this.name = product.name != null ? product.name : null;
      this.image = product.image != null ? product.image : null;
      this.price = product.price != null ? product.price : null;
    }
  }