import { Component, OnInit } from '@angular/core';
import { WishList } from 'src/app/core/models/WishList';
import { WishListService } from 'src/app/core/services/wishList/WishlistService.service';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

@Component({
  selector: 'app-carousel-whislist',
  templateUrl: './carousel-whislist.component.html',
  styleUrls: ['./carousel-whislist.component.css']
})
export class CarouselWhislistComponent implements OnInit {
  whislists: WishList[]=[];
  whislistItem?: WishList;
  view : boolean = true;

  constructor(private wishList: WishListService){
  }
  ngOnInit(): void {
    this.wishList.getAllWishList(437402821).subscribe((prod)=>{
      this.whislists = prod;    
    })
  }

  seeWishList(wishList: WishList){
    this.whislistItem=wishList;
    this.view=false;
    
  }

  change(){
    this.view=true;
  }

  
}
