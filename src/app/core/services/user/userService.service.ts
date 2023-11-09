import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseUser } from '../../models/User';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private baseURL = "https://api.mercadolibre.com/oauth/token"

    constructor(private http: HttpClient) { }

    async getUserInfo(access_token: any): Promise<ResponseUser | undefined> {
        const url = 'https://api.mercadolibre.com/users/me';

        const headers = new HttpHeaders({
            Authorization: `Bearer ${access_token as any}`
        });
        return this.http.get<ResponseUser>(url, { headers }).toPromise()
    }

}
