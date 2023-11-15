import { Component, OnInit} from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { Product } from 'src/app/core/models/Product';
import { ProductService } from 'src/app/core/services/products/products.service';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';
import { Meli } from 'src/app/core/models/Meli';
// register Swiper custom elements
register();

@Component({
  selector: 'app-carousel-fav',
  templateUrl: './carousel-fav.component.html',
  styleUrls: ['./carousel-fav.component.css']
})

export class CarouselFavComponent implements OnInit { 
    products: Product[]=[]; 
    myAccessToken: Meli | null

    constructor(private favs : ProductService, private tokenRepository: TokenRepository){
      this.myAccessToken=tokenRepository.getAccessToken()
    }

  ngOnInit(): void {
    this.favs.productsList(this.myAccessToken!.access_token, this.myAccessToken!.user_id).subscribe((products) =>{
      this.products = products;
    })
  }
    
    verproduct(){
      console.log(this.products);
    }
  }
