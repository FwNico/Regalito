import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/products/products.service';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';
import { Meli } from 'src/app/core/models/Meli';
import { Product } from 'src/app/core/models/Product';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
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

  constructor(private favs: ProductService, private tokenRepository: TokenRepository) {
    this.myAccessToken = tokenRepository.getAccessToken();
  }

  ngOnInit(): void {
    this.selectElement = document.getElementById('categoria') as HTMLSelectElement;

    this.favs.productsList(this.myAccessToken!.access_token, this.myAccessToken!.user_id).subscribe((products) => {
      this.products = products;
      this.filteredProducts = [...products];
    });
  }
  ngAfterViewInit(): void {
    // Inicializa el carrusel y almacena la instancia
    const swiperInstance = this.initializeSwiper();
    // Guarda la instancia del carrusel en una propiedad
    this.swiper = swiperInstance;
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