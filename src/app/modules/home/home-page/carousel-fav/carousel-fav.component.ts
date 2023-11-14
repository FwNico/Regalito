import { Component } from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { FavoritesService } from '../favorites.service';
// register Swiper custom elements
register();

@Component({
  selector: 'app-carousel-fav',
  templateUrl: './carousel-fav.component.html',
  styleUrls: ['./carousel-fav.component.css']
})

export class CarouselFavComponent { 
    fotos?: any[]; 
    constructor(favs : FavoritesService){
      this.fotos = favs.getFavs();
    }
    
}
