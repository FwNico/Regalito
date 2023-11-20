import { Observable, catchError, map, of } from "rxjs";
import { Regalito } from "../../models/Regalito";
import { HttpClient } from "@angular/common/http";

export class RegalitoService {

    private baseURL = "http://localhost:3000/regalito"

    constructor(private http: HttpClient) {
    }

    createRegalito(regalito: Regalito): Observable<Regalito> {
        return this.http.post<Regalito>(this.baseURL, regalito)
    }

    deleteRegalito(id: number): Observable<boolean> {
        const url = `${this.baseURL}/${id}`
        return this.http.delete(url).pipe(
            map(resp => true),
            catchError(error => of(false))
        );
    }

    //SOLAMENTE TRAE REGALOS ENVIADOS POR LA PERSONA
    regalitosSend(id: number): Observable<Regalito[]> {
        const url = `${this.baseURL}?=idUserEmit${id}`
        return this.http.get<Regalito[]>(url)
    }

    //SOLAMENTE TRAE REGALOS RECIBIDOS
    regalitoRecived(id: number) {
        const url = `${this.baseURL}?=idUserRecived${id}`
        return this.http.get<Regalito[]>(url)
    }
}