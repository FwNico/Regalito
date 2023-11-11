import { Address } from "../models/Address";

export interface  IUser{
  id:         number| null;
  nickname:   string| null;
  first_name: string| null;
  last_name:  string| null;
  address:    Address| null;
}