import { Injectable, booleanAttribute } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseUser } from '../../models/UserDAO';
import { DbService } from '../db/db.service';
import { User } from '../../models';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private baseURL = "http://localhost:3000/users"

    constructor(private http: HttpClient, private dbService: DbService) { }

    async getUserInfo(access_token: any): Promise<ResponseUser | undefined> {
        const url = 'https://api.mercadolibre.com/users/me';

        const headers = new HttpHeaders({
            Authorization: `Bearer ${access_token as any}`
        });
        return this.http.get<ResponseUser>(url, { headers }).toPromise()
    }

    
    /* devuelven promesas para que las trabaje el componente con una funcion
    por ejemplo: public addUser(user: User){
                      this.userService.addUser(user).then(data => )
                  }

    public addUser(user: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.dbService.addUser(user).subscribe({
                next: data => resolve(data),
                error: error => reject(error)
            })
        });
    }

    public deleteUser(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject)=>{
            this.dbService.deleteUser(id).subscribe({
                next: (bool) => resolve(bool),
                error: error => reject (error)
            })
        });
    }

    public getUser(id:number): Promise<User> {
        return new Promise<User>((resolve, reject)=> {
            this.dbService.getUserById(id).subscribe({
                next: user => {
                    if(user != null){
                        resolve(user);
                    }else{
                        reject("User not found")
                    }
                },
                error: error => reject (error)
            })
        });
    } */

    /* addUser(user: User): Promise<any>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.baseURL, user, httpOptions).toPromise();

        getUserById(id: number): Promise <any>{
        return this.http.get(`${this.baseURL}/${id}`).toPromise();
    }
    } */

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


}
