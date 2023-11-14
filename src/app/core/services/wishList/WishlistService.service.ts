import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { WishList } from "../../models/WishList";

@Injectable({
    providedIn: 'root'
})
export class WishListService {

    private baseURL = "http://localhost:3000/whistlist"

    constructor(private http: HttpClient) { }

    public saveWishList(wishtlist: WishList, idUser: number): Observable<WishList> {
        return this.http.patch<WishList>(this.baseURL, wishtlist, { headers: { 'Content-type': 'application/json', id: idUser.toString() } })
    }
}