import {IProduct, IUser} from "./interfaces";

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

/*
export class User implements UserMeli{
  id: number | null;
  nickname: string | null;
  first_name: string | null;
  last_name: string | null;
  address: Address | null;

  constructor(id?:number,nickname?: string, first_name?: string, last_name?: string, address: Address){
    this.id = id != null ? id : null;
    this.nickname = nickname != null ? nickname : null;
    this.first_name = first_name != null ? first_name : null;
    this.last_name = last_name != null ? last_name : null;
    this.address = address != null ? address : null;
  }
}

export class address implements Address{
  state:    string | null;
  city:     string| null;
  address:  string| null;
  zip_code: string| null;

  constructor(state: string| null, city: string| null, address: string| null, zip_code : string| null){
    this.state = state != null ? state : null;
    this.city  = city != null ? city : null;
    this.address = address != null ? address : null;
    this.zip_code = zip_code != null ? zip_code : null;
  }
}
*/