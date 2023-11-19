import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseUser } from '../../models/UserDAO';
import { EMPTY, Observable, catchError, map, of } from 'rxjs';
import { User } from '../../models/User';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private baseURL = "http://localhost:3000/users"

    constructor(private http: HttpClient) { }

    getUserInfo(access_token: any): Observable<ResponseUser> {
        const url = 'https://api.mercadolibre.com/users/me';

        const headers = new HttpHeaders({
            Authorization: `Bearer ${access_token as any}`
        });
        return this.http.get<ResponseUser>(url, { headers })
    }

    getAllUsers(): Observable <User[]>{
        return this.http.get<User[]>(this.baseURL)
    }

    getUserById(id: number): Observable <User>{
        return this.http.get<User>(`${this.baseURL}/${id}`)
    }

    postUser(user: User): Observable<User>{
        return this.http.post<User>(this.baseURL, user, {headers: {'Content-type':'application/json'}})
    }

    deleteUser(id:number | undefined){
        return this.http.delete(`${this.baseURL}/${id}`)
    }

    putUser(user: User): Observable<User>{
        return this.http.put<User>(`${this.baseURL}/${user.id}`, user, {headers: {'Content-type':'application/json'}})
    }

    userExists(id: number): Observable<boolean>{
        return this.http.get<User>(`${this.baseURL}/${id}`)
        .pipe(
            map(resp => true), // Si sale bien retorna true
            catchError(error => of(false)) // Si hay algun error en la solicitud me regresa falso
          );
    }

    getUserByNickname(nickname: string): Observable<User| null>{
        return this.http.get<User[]>(`${this.baseURL}?nickname=${nickname}`)
        .pipe(
            map(users => users.length > 0 ? users[0] : null),
            catchError(error => of(null))
        );
    }

    searchUser(name: string): Observable<User[]>{
        return this.http.get<User[]>(`${this.baseURL}?nickname_like=${name}`).pipe(
            map((resp)=> resp),
            catchError(() => EMPTY)
        );
    }

}