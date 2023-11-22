import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user/userService.service';
import { WishListService } from 'src/app/core/services/wishList/WishlistService.service';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.css']
})

export class ViewUserComponent implements OnInit {

    friendId: number | null = null
    constructor(private userService: UserService, private route: ActivatedRoute, private wishListService:WishListService) { }
    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.friendId = params["userId"]
        })
        this.getWishList(this.friendId!)
    }


    getWishList(idUser: number) {
        this.wishListService.getAllWishList(idUser).subscribe({
            next:(data)=> {console.log("las wishlist: " + data[0].products[0].nombre)}
        })
    }


    getAllUsers() {
        this.userService.getAllUsers().subscribe({
            next: (data) => {
                //this.userList = data;
                console.log(data)
            },
            error: (error) => { console.log(error) }
        })
    }

    getUser(id: number) {
        this.userService.getUserById(id).subscribe({
            next: (user) => {
                console.log(user)
            },
            error: (error) => { console.log(error) }
        })
    }

    deleteUser(id: number) {
        this.userService.deleteUser(id).subscribe({
            next: () => {
                console.log("El usuario fue eliminado")
            },
            error: (error) => { console.log(error) }
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
