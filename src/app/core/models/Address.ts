import { IAddress } from "../interfaces/IAddress";

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