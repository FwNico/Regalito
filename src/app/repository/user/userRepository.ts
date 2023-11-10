import { ApiService } from "src/app/core/services/api/api.service"
import { TokenRepository } from "../token/tokenRepository";
import { UserService } from "src/app/core/services/user/userService.service";
import { Observable, Subject } from 'rxjs';
import { ResponseUser } from '../../core/models/UserDAO';
import { Meli } from "src/app/core/models/Meli";
import { Injectable } from "@angular/core";
import { User } from "src/app/core/models";
import { DbService } from "src/app/core/services/db/db.service";

@Injectable({
    providedIn: 'root'
})
export class UserRepository {
    //este es el observalbe que los componentes van a escuchar, como valor inicial tendra null
    userObserver: Observable<ResponseUser | null>

    //esta variable se utiliza para que se pueda actualizar el valor del observable
    userSubjet: Subject<ResponseUser>

    //token para hacer peticiones
    tokenAcces: Meli | null
    
    constructor(private userService: UserService, private tokenRepository: TokenRepository, private dbService: DbService) {
        this.userSubjet = new Subject<ResponseUser>
        this.userObserver = this.userSubjet.asObservable()
        this.tokenAcces = tokenRepository.getAccessToken()
    }

    
    fetchUser() {
        console.log(this.tokenAcces?.access_token)
        this.userService.getUserInfo(this.userService.getUserInfo(this.tokenAcces?.access_token)).then((response) => {
            
            console.log(response?.first_name)
        })
    }

    getAllUsers(){
        this.userService.getAllUsers().subscribe({
                next: (data) =>{
                    //this.userList = data;
                    console.log(data)
                },
                error: (error) => {console.log(error)} 
        })
    }

    getUser(id: number){
        this.userService.getUserById(id).subscribe({
            next: (user)=>{
                console.log(user)
            },
            error: (error)=> {console.log(error)}
        })
    }

    deleteUser(id: number){
        this.userService.deleteUser(id).subscribe({
            next: () =>{
                console.log("El usuario fue eliminado")
            },
            error: (error) =>{console.log(error)}
        })
    }

    addUser(){
        const user: User = {
            //reemplazar null por datos reales
            id: null,
            nickname: null,
            first_name: null,
            last_name: null,
            address: null,
        }
        this.userService.postUser(user).subscribe({
            next: (data) => {console.log(data)},
            error: (error) => {console.log(error)}
        })
    }

}