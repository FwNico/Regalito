import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = "https://api.mercadolibre.com/oauth/token"


  constructor(private http: HttpClient) { }


  public fetchAccessToken(code:any): Promise<any> {
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

    return this.http.post(this.baseURL, body, httpOptions).toPromise()

  }

  public getUserInfo(access_token: any): void {
    const url = 'https://api.mercadolibre.com/users/me';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${access_token}`
    });
  
    this.http.get(url, { headers }).subscribe(
      (response) => {
        // Aquí puedes manejar la respuesta del servidor
        console.log(response);
      },
      (error) => {
        // Aquí puedes manejar el error en caso de que ocurra
        console.error(error);
      }
    );
  }


}




