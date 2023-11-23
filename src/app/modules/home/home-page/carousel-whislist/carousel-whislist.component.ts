import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
// register Swiper custom elements
register();


@Component({
  selector: 'app-carousel-whislist',
  templateUrl: './carousel-whislist.component.html',
  styleUrls: ['./carousel-whislist.component.css']
})

export class CarouselWhislistComponent implements OnInit {
  @Input() isUserView: boolean = false
  @Input() idFriend: number = 0
  @Output() regalito: EventEmitter<Product> = new EventEmitter<Product>();
  whislists: WishList[] = [];
  whislistItem?: WishList;
  view: boolean = true;
  newProductsForm: Product[] = [];
  userMeli: Meli | null;
  userId: number = 0;
  swiper: Swiper | undefined;
  form: boolean = false;
  nameForm = new FormControl('', [Validators.maxLength(20), Validators.required, Validators.minLength(2)]);
  idWishlist: number = -1;

  constructor(private wishListRepository: WishListRepository, private wishList: WishListService,
    private userService: UserService, private tokenRepository: TokenRepository,
    private wishlistRepository: WishListRepository) {
    this.userMeli = tokenRepository.getAccessToken();
    if (this.userMeli !== null) {
      this.userId = this.userMeli.user_id
    }
  }

  ngOnInit(): void {
    const swiperInstance = this.initializeSwiper();
    this.swiper = swiperInstance;
    this.getWishList();

  }

  getWishList() {
    if (this.isUserView) {
      this.wishList.getAllWishList(this.idFriend).subscribe({
        next: (prod) => {
          this.whislists = prod;
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      this.wishList.getAllWishList(this.userId).subscribe({
        next: (prod) => {
          this.whislists = prod;
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  formSubmit(): WishList {
    let list: WishList = new WishList("invalida", this.newProductsForm, 0);
    if (this.nameForm.valid === true) {
      list = new WishList(this.nameForm.value!, this.newProductsForm, this.userId);
    }
    return list;
  }

  newWishlist() {
    if (this.formSubmit !== null) {
      this.wishList.saveWishList(this.formSubmit()).subscribe({
        next: (wishlist) => {
          this.whislists.push(wishlist)
        },
        error: (error) => {
          console.log(error);

        }
      });
      this.getWishList()
    }
  }

  getItemsWishlist(wishList: WishList) {
    this.getWishList();
    this.whislistItem = wishList;
    this.idWishlist = wishList.id!;
  }
  seeWishList() {
    this.view = false;
  }

  change() {
    this.view = true;
  }

  deleteWishList(id: number) {
    let whislist: WishList[] = this.whislists;
    this.whislists = whislist.filter(data => data.id !== id);
    this.wishListRepository.deleteWishList(id!);
  }


  deleteProductWishList(item: Product) {
    let list: Product[]
    if (this.idWishlist != null) {
      try {
        this.wishListRepository.getWishListForId(this.idWishlist).then((response) => {
          list = response?.products!
          if (list !== undefined) {
            list = list.filter((element) => element.id !== item.id)
            this.whislistItem!.products = list;
            this.wishList.editWishList(list, this.idWishlist).subscribe({
              next: (data) => { this.getWishList(); },
              error: (error) => { console.log("Error al borrar el producto de la wishlist" + error) }
            })
          }
        })
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  getWishListbyId(id: number): WishList | undefined {
    return this.whislists.find(wishlist => wishlist.id === id)
  }


  searchProduct(lista: WishList, item: Product): boolean {
    // Utiliza el método find para buscar el producto en la lista
    const foundProduct = lista.products.find(data => data === item);
    // Si foundProduct es undefined, el producto no se encontró; de lo contrario, se encontró
    return foundProduct !== undefined;
  }

  private initializeSwiper(): Swiper {
    return new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      autoplay: true
    });
  }
  private updateSwiper(): void {
    // Verifica si la instancia del carrusel está definida antes de llamar al método update
    if (this.swiper) {
      this.swiper.update();
    }
  }



  emitRegalito(product: Product) {
    console.log("click para enviar este dato " + product)
    this.regalito.emit(product)
  }
}




