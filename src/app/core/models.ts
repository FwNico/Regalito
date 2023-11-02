import { IProduct, IUser } from "./interfaces";

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

export class User implements IUser {

  id: number | null;
  userName: string | null;
  email: string | null;
  password: string | null;

  constructor(user?: any) {
    this.id = user.id != null ? user.id : null;
    this.userName = user.userName != null ? user.userName : null;
    this.email = user.email != null ? user.email : null;
    this.password = user.password != null ? user.password : null;
  }

}