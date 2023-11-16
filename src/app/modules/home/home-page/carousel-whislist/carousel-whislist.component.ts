import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { ResponseUser } from 'src/app/core/models/UserDAO';
import { WishList } from 'src/app/core/models/WishList';
import { UserService } from 'src/app/core/services/user/userService.service';
import { WishListService } from 'src/app/core/services/wishList/WishlistService.service';
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
  user?: User;
  userId: number | undefined;
  

  constructor(private wishList: WishListService, private userService : UserService, private userRepository: UserRepository){
    this.userId = this.userRepository.user?.id;
  }
  ngOnInit(): void {
    this.wishList.getAllWishList(202593497).subscribe((prod)=>{
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
