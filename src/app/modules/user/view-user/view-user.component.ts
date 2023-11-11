import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user/userService.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})

export class ViewUserComponent {
  constructor(private userService: UserService) {}


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

/* addUser(){
    if(this.userMeli != null){
        const user: User = {
            //reemplazar null por datos reales
            id: this.userMeli.id,
            nickname: this.userMeli.nickname,
            first_name: this.userMeli.first_name,
            last_name: this.userMeli.last_name,
            address: this.userMeli.address,
        }
    
        this.userService.postUser(user).subscribe({
            next: (data) => {console.log(data)},
            error: (error) => {console.log(error)}
        })
    }
} */

}
