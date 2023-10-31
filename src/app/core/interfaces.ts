import { User } from "./models";

export interface IProduct {
    id: number | null;
    name: string | null;
    description: string | null;
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