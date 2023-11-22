import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishList } from 'src/app/core/models/WishList';
import { UserService } from 'src/app/core/services/user/userService.service';
import { WishListService } from 'src/app/core/services/wishList/WishlistService.service';
import { RegalitoRepository } from 'src/app/repository/regalito/RegalitoRepository';
import { CarouselWhislistComponent } from '../../home/home-page/carousel-whislist/carousel-whislist.component';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.css']
})

export class ViewUserComponent implements OnInit {

    friendId: number | null = null
    wishList: WishList[]
    dataRegalito: string = ""
    constructor(private userService: UserService, private route: ActivatedRoute, private wishListService: WishListService, private regalitoRepository: RegalitoRepository) {
        this.wishList = []
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.friendId = params["userId"]
        })
        this.getWishList(this.friendId!)
    }

    obtainData(idProduct: string) {
        this.dataRegalito = idProduct
        console.log(idProduct)
    }


    getWishList(idUser: number) {
        this.wishListService.getAllWishList(idUser).subscribe({
            next: (data) => { this.wishList = data }
        })
    }


    sendRegalito() {
        this.regalitoRepository.createRegalito(this.dataRegalito, this.friendId!)
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
