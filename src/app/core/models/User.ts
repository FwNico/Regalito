import { IUser } from "../interfaces/IUser";
import { Address } from "./Address";

export class User implements IUser{
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