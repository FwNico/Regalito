import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Meli } from 'src/app/core/models/Meli';
import { User } from 'src/app/core/models/User';
import { ResponseUser } from 'src/app/core/models/UserDAO';
import { WishList } from 'src/app/core/models/WishList';
import { UserService } from 'src/app/core/services/user/userService.service';
import { WishListService } from 'src/app/core/services/wishList/WishlistService.service';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';
import { UserRepository } from 'src/app/repository/user/userRepository';
import { WishListRepository } from 'src/app/repository/wishList/wishListRepository';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import { Product } from 'src/app/core/models/Product';
import { ParseFlags } from '@angular/compiler';
// register Swiper custom elements
register();


@Component({
  selector: 'app-carousel-whislist',
  templateUrl: './carousel-whislist.component.html',
  styleUrls: ['./carousel-whislist.component.css']
})

export class CarouselWhislistComponent implements OnInit {

  @Output() regalito: EventEmitter<string> = new EventEmitter<string>();
  whislists: WishList[] = [];
  whislistItem?: WishList;
  view: boolean = true;
  userMeli: Meli | null;
  userId: number = 0;
  swiper: Swiper | undefined;
  

  constructor(private wishListRepository: WishListRepository, private wishList: WishListService,
    private userService: UserService, private tokenRepository: TokenRepository, private wishlistRepository: WishListRepository) {
    this.userMeli = tokenRepository.getAccessToken();
    if (this.userMeli !== null) {
      this.userId = this.userMeli.user_id
    }
  }

  ngOnInit(): void {
    console.log(this.userMeli?.user_id);
    const swiperInstance = this.initializeSwiper();
    this.swiper = swiperInstance;
    this.wishList.getAllWishList(this.userId).subscribe((prod) => {
      this.whislists = prod;
      console.log(this.whislists[0].idUser);
    })

  }

  seeWishList(wishList: WishList) {
    this.whislistItem = wishList;
    this.view = false;
  }

  change() {
    this.view = true;
  }

  deleteWishList(id: number) {
    this.wishListRepository.deleteWishList(id);
    this.uptadateWishlist();
    this.initializeSwiper();
  }

  deleteProductWishList(item: Product) {
    const idWishlist = this.getIdWishlist(item);
    if (idWishlist !== null) {
      this.wishListRepository.deleteProductWishList(idWishlist, item.id!);

      // Verificar si la lista de deseos queda vacía
      const wishlist = this.whislists.find(w => w.id === idWishlist);
      if (wishlist && wishlist.products.length === 1) { // 1 porque acabamos de eliminar un producto
        this.deleteWishList(idWishlist);
      } else {
        this.updateSwiper();
        this.initializeSwiper();
      }
    }

  }

  uptadateWishlist() {
    this.wishList.getAllWishList(this.userId).subscribe((prod) => {
      this.whislists = prod;
    })
  }

  getIdWishlist(item: Product): number | null {
    let idWishlist: number | null = null;
    for (let i = 0; i < this.whislists.length; i++) {
      if (this.whislists[i].products.includes(item)) {
        idWishlist = this.whislists[i].id
      }
    }
    return idWishlist;
  }
  private initializeSwiper(): Swiper {
    return new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      autoplay: true,
      loop: true
    });
  }

  private updateSwiper(): void {
    // Verifica si la instancia del carrusel está definida antes de llamar al método update
    if (this.swiper) {
      this.swiper.update();
    }
  }

  emitRegalito(idProduct: string) {
    console.log("click para enviar este dato " + idProduct)
    this.regalito.emit(idProduct)
  }

}
