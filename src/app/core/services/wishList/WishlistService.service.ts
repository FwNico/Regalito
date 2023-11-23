import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { WishList } from '../../models/WishList';
import { Product } from "../../models/Product";

@Injectable({
    providedIn: 'root'
})
export class WishListService {


    private baseURL = "http://localhost:3000/wishlist"
    
    public wishListsSubject: BehaviorSubject<WishList[]> = new BehaviorSubject<WishList[]>([]);
    public wishLists$: Observable<WishList[]> = this.wishListsSubject.asObservable();

    constructor(private http: HttpClient) {     
    }

    //GUARDA UNA NUEVA WISHLIST
    public saveWishList(wishtlist: WishList): Observable<WishList> {
        return this.http.post<WishList>(this.baseURL, wishtlist, { headers: { 'Content-type': 'application/json' } })
    }

    //WIP METODO PARA EDITAR UNA WISHLIST, FALTA CONSULTAR DATOS POSTERIORES PARA NO TENER PERDIDAS
    public editWishList(products: Product[], id: number): Observable<WishList> {
        const url = `${this.baseURL}/${id}`
        const partialUpdate = { products: products }
        return this.http.patch<WishList>(url, partialUpdate)
    }

    //METODO PARA OBTENER UNA WISHLIST DE UN USUARIO PASANDOLE ID DE LA LISTA
    
    public getWishList(id: number): Promise<WishList | undefined> {
        const url = `${this.baseURL}/${id}`
        return this.http.get<WishList>(url).toPromise()
    }
    
    //METODO PARA OBTENER TODAS LAS WISHLSIT DE UN USUARIO
    public getAllWishList(idUser: number): Observable<WishList[]> {
        const url = `${this.baseURL}?idUser=${idUser}`;
        return this.http.get<WishList[]>(url)
    }
    
    
    //METODO PARA BORRAR UNA WISHLIST
    deleteWishList(id: number): Observable<any>{
        const url = `${this.baseURL}/${id}`;
        return this.http.delete<any>(url)
    }
    
}