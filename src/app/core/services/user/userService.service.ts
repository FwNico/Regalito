import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseUser } from '../../models/User';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    async getUserInfo(access_token: any): Promise<ResponseUser | undefined> {
        const url = 'https://api.mercadolibre.com/users/me';

        const headers = new HttpHeaders({
            Authorization: `Bearer ${access_token as any}`,
        });

        console.log("headers del user" + headers)

        return this.http.get<ResponseUser>(url, { headers }).toPromise()
    }

}
