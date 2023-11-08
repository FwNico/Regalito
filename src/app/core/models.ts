import {IProduct, IUserMeli, IAddress} from "./interfaces";

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

export class User implements IUserMeli{
  id: number | null;
  nickname: string | null;
  first_name: string | null;
  last_name: string | null;
  address: Address | null;

  constructor(user?: any){
    this.id = user.id != null ? user.id : null;
    this.nickname = user.nickname != null ? user.nickname : null;
    this.first_name = user.first_name != null ? user.first_name : null;
    this.last_name = user.last_name != null ? user.last_name : null;
    this.address = user.address != null ? user.address : null;
  }
}

export class Address implements IAddress{
  state:    string | null;
  city:     string| null;
  address:  string| null;
  zip_code: string| null;

  constructor(addres?: any){
    this.state = addres.state != null ? addres.state : null;
    this.city  = addres.city != null ? addres.city : null;
    this.address = addres.address != null ? addres.address : null;
    this.zip_code = addres.zip_code != null ? addres.zip_code : null;
  }
}
