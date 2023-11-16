import { Component, OnInit } from '@angular/core';
import { Meli } from 'src/app/core/models/Meli';
import { User } from 'src/app/core/models/User';
import { ResponseUser } from 'src/app/core/models/UserDAO';
import { WishList } from 'src/app/core/models/WishList';
import { UserService } from 'src/app/core/services/user/userService.service';
import { WishListService } from 'src/app/core/services/wishList/WishlistService.service';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';
import { UserRepository } from 'src/app/repository/user/userRepository';
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
  userMeli: Meli|null;
  userId : number = 0;

  

  constructor(private wishList: WishListService, private userService : UserService, private tokenRepository: TokenRepository){
    this.userMeli = tokenRepository.getAccessToken();
    if(this.userMeli !== null){
      this.userId = this.userMeli.user_id
    }
  }
  ngOnInit(): void {
    console.log(this.userMeli?.user_id);    
    this.wishList.getAllWishList(414173926).subscribe((prod)=>{
      this.whislists = prod;
      console.log(this.whislists[0].idUser);  
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
