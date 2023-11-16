import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Product } from "../../models/Product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    productsList(access_token: string, userID: number): Observable<Product[]> {
        const url = 'http://localhost:3000/products';

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
            });

        return this.http.get<Product[]>(url, { headers })
    }

}