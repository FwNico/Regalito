import { Product } from "../models/Product";

export interface IRegalito {
    id:            number | null;
    idUserEmit:    number;
    idUserRecived: number;
    status:        string;
    product:     Product;
}