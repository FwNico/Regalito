import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Meli } from '../models/Meli';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = "https://api.mercadolibre.com/oauth/token"


  constructor(private http: HttpClient) { }


  public fetchAccessToken(code:any): Promise<Meli | undefined> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      })
    };

    const body = JSON.stringify({
      grant_type: "authorization_code",
      client_id: "1680797094583707",
      client_secret: "sic8N0162V0zSXvKyf2rAK4XhnLVggPQ",
      code: code,
      redirect_uri: "https://localhost:4200/home"
    })

    return this.http.post<Meli>(this.baseURL, body, httpOptions).toPromise()

  }

}




