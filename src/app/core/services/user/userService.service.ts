import { Injectable, booleanAttribute } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseUser } from '../../models/UserDAO';
import { DbService } from '../db/db.service';
import { User } from '../../models';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private baseURL = "http://localhost:3000"

    constructor(private http: HttpClient, private dbService: DbService) { }

    async getUserInfo(access_token: any): Promise<ResponseUser | undefined> {
        const url = 'https://api.mercadolibre.com/users/me';

        const headers = new HttpHeaders({
            Authorization: `Bearer ${access_token as any}`
        });
        return this.http.get<ResponseUser>(url, { headers }).toPromise()
    }

    
    //devuelven promesas para que las trabaje el componente con una funcion
    // por ejemplo: public addUser(user: User){
    //                  this.userService.addUser(user).then(data => )
    //              }

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
    }

}
