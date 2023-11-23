import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Product } from "../../models/Product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseURL = "http://localhost:3000/products"

    constructor(private http: HttpClient) { }

    productsList(access_token: string, userID: number): Observable<Product[]> {
        const url = 'http://localhost:3000/products';

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
            });

        return this.http.get<Product[]>(url, { headers })
    }

    getProductById(id: string): Observable<Product>{
        return this.http.get<Product>(`${this.baseURL}/${id}`);
    }

}