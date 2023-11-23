import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/products/products.service';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';
import { Meli } from 'src/app/core/models/Meli';
import { Product } from 'src/app/core/models/Product';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import { WishList } from 'src/app/core/models/WishList';
import { WishListRepository } from 'src/app/repository/wishList/wishListRepository';
import { WishListService } from 'src/app/core/services/wishList/WishlistService.service';
// register Swiper custom elements
register();



@Component({
  selector: 'app-carousel-fav',
  templateUrl: './carousel-fav.component.html',
  styleUrls: ['./carousel-fav.component.css'],
})
export class CarouselFavComponent implements OnInit {
  products: Product[] = [];
  myAccessToken: Meli | null;
  selectElement: HTMLSelectElement | null = null;
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  swiper: Swiper | undefined;
  view : boolean = true;
  whislists: WishList[] = [];
  userId: number = 0;
  wishlistSelect: HTMLSelectElement | null = null;
  idWhislist ?: number;
  selectedWishlist: number[] = [];


  constructor(private favs: ProductService, private tokenRepository: TokenRepository,
    private wishListRepository: WishListRepository, private wishList: WishListService) {
    this.myAccessToken = tokenRepository.getAccessToken();
  }

  ngOnInit(): void {
    this.selectElement = document.getElementById('categoria') as HTMLSelectElement;

    this.getFavs();
    this.userId = this.myAccessToken?.user_id!
    this.getWishList();
  }

  ngAfterViewInit(): void {
    // Inicializa el carrusel y almacena la instancia
    const swiperInstance = this.initializeSwiper();
    // Guarda la instancia del carrusel en una propiedad
    this.swiper = swiperInstance;
}

  addProductToWishlist(prod: Product, index: number) {
    if (this.selectedWishlist[index] !== undefined) {
      const prods: Product[] = [prod];
      this.idWhislist = this.selectedWishlist[index];
      this.wishListRepository.editWishList(prods, this.idWhislist!);
    }
    this.getWishList();
  }

 getFavs(){
  this.favs.productsList(this.myAccessToken!.access_token, this.myAccessToken!.user_id).subscribe((products) => {
    this.products = products;
    this.filteredProducts = [...products];
  });
 }

 getWishList(){
  this.wishList.getAllWishList(this.userId).subscribe({
    next:(prod)=>{
    this.whislists = prod;
    },
    error: (error)=>{
      console.log(error);
    } 
})
}
  private initializeSwiper(): Swiper {
      return new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        autoplay : true,
        //loop : true
      });
  }

  
  private updateSwiper(): void {
    // Verifica si la instancia del carrusel está definida antes de llamar al método update
    if (this.swiper) {
      this.swiper.update();
    }
  }

  filtrarCategorias(): void {
    if (this.selectElement && this.selectElement.value !== 'Todas' && this.selectElement.value !== null) {
      this.filteredProducts = this.products.filter((prod) => prod.categoria === this.selectElement!.value);
    } else {
      this.filteredProducts = [...this.products];
    }
    this.updateSwiper();
  }

  verproduct(): void {
    console.log(this.products);
  }

  change1(){
    this.view = false;
  }

  change2(){
    this.view = true;
  }

  // Método para buscar productos según el término de búsqueda
  buscarProductos(): void {
    if (this.searchTerm.trim() !== '') {
      this.filteredProducts = this.products.filter(
        (prod) => prod.nombre!.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.products];
    }
    this.updateSwiper();
  }
}