import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductsDAO } from "../../models/Product";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    favoritesList(access_token: string): Promise<ProductsDAO[] | undefined> {
        const url = 'https://api.mercadolibre.com/users/me/bookmarks';

        const headers = new HttpHeaders({
            Authorization: `Bearer ${access_token as any}`,
            'Content-Type': 'application/json',
            
        });

        console.log("headers del favorit products" + headers)
        return this.http.get<ProductsDAO[]>(url, { headers }).toPromise()
    }

}