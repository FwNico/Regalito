import { Address, User } from "./models";

export interface IProduct {
    id: string | null;
    name: string | null;
    image: string | null;
    price: number | null;
}
  
export interface  IUserMeli{
  id:         number| null;
  nickname:   string| null;
  first_name: string| null;
  last_name:  string| null;
  address:    Address| null;
}

export interface IAddress {
  state:    string| null;
  city:     string| null;
  address:  string| null;
  zip_code: string| null;
}


  export interface LoginRespone {
    user: User,
    token: string
  }
  