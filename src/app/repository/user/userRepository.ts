
import { TokenRepository } from "../token/tokenRepository";
import { UserService } from "src/app/core/services/user/userService.service";
import { Observable, Subject } from 'rxjs';
import { ResponseUser } from '../../core/models/UserDAO';
import { Meli } from "src/app/core/models/Meli";
import { Injectable } from "@angular/core";
import { User } from "src/app/core/models/User";


@Injectable({
    providedIn: 'root'
})
export class UserRepository {

    myAccessToken: Meli | null
    user: ResponseUser | undefined = undefined
    
    constructor(private userService: UserService, private tokenRepository: TokenRepository) {
        this.myAccessToken= tokenRepository.getAccessToken()

    }

    fetchUser(){
        console.log(this.myAccessToken?.access_token)
        this.userService.getUserInfo(this.myAccessToken?.access_token).subscribe({
          next: (data) => { 
            this.user = data
            console.log(data);
            this.checkUserExistence();
          },
          error: (error) => {console.log(error)}
    
        })    
    }
    
    addUser(){
        if(this.user != undefined){
            const newUser: User = {
                id: this.user.id,
                nickname: this.user.nickname,
                first_name: this.user.first_name,
                last_name: this.user.last_name,
                address: this.user.address,
            }
        
            this.userService.postUser(newUser).subscribe({
                next: (data) => {console.log(data)},
                error: (error) => {console.log(error)}
            })
        }
    }
    
    checkUserExistence() {
        if(this.user != undefined){
          this.userService.userExists(this.user.id).subscribe({
            next: (bool) => {
              if(bool == false){
                this.addUser();
              }
            },
            error: (error) => { console.log(error)}
          })
        }
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

}