import { User } from "./models";

export interface IProduct {
    id: string | null;
    name: string | null;
    image: string | null;
    price: number | null;
  }
  
  export interface IUser {
    id: number | null;
    userName: string | null;
    email: string | null;
    password: string | null;
  }
  
  export interface LoginRespone {
    user: User,
    token: string
  }