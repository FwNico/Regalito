import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishList } from 'src/app/core/models/WishList';
import { UserService } from 'src/app/core/services/user/userService.service';
import { WishListService } from 'src/app/core/services/wishList/WishlistService.service';
import { RegalitoRepository } from 'src/app/repository/regalito/RegalitoRepository';
import { CarouselWhislistComponent } from '../../home/home-page/carousel-whislist/carousel-whislist.component';
import { Product } from 'src/app/core/models/Product';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.css']
})

export class ViewUserComponent implements OnInit {
    friendId: number | null = null
    wishList: WishList[]
    dataRegalito: Product = new Product("","","",0,"","")
    isUserView: boolean = true
    constructor(private cdr: ChangeDetectorRef,private route: ActivatedRoute, private wishListService: WishListService, private regalitoRepository: RegalitoRepository) {
        this.wishList = []
    }

    ngOnInit(): void {
        this.obtainUserId();
    }

    obtainUserId(){
        this.route.params.subscribe(params => {
            this.friendId = params["userId"]
            this.cdr.detectChanges()
        })
    }

    obtainData(product: Product) {
        this.dataRegalito = product
        this.sendRegalito()
    }


    getWishList(idUser: number) {
        this.wishListService.getAllWishList(idUser).subscribe({
            next: (data) => { this.wishList = data },
            error: (error)=> {console.log("No se pudo traer la wishlist", error)}
        })
    }


    sendRegalito() {
        this.regalitoRepository.createRegalito(this.dataRegalito, this.friendId! as number)
    }


}
