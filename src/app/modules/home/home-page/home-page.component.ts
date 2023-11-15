import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Meli } from 'src/app/core/models/Meli';
import { ResponseUser } from 'src/app/core/models/UserDAO';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user/userService.service';
import { HomeRepository } from 'src/app/repository/home/homeRepository';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';
import { User } from 'src/app/core/models/User';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { ProductRepository } from 'src/app/repository/products/ProductsRepository';
import { ProductService } from 'src/app/core/services/products/products.service';
// register Swiper custom elements
register();


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  myAccessToken: Meli | null
  code: any
  user: ResponseUser | undefined = undefined
  constructor(private userService: UserService, private homeRepository: HomeRepository, 
    private tokenRepository: TokenRepository, private route: ActivatedRoute, private productService: ProductService) {
    this.myAccessToken = tokenRepository.getAccessToken()

  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code']
      this.getToken(code);
      if (code != null) {
        console.log("codigo obtenido= " + code)
        this.code = code
        if (this.tokenRepository.getAccessToken() == null) {
          this.getToken(code);
        } else {
          console.log("el token se encuentra guardado")
        }
      } else {
        console.log("fallo la recuperada de codigo")
      }
    })
  }

  public getToken(code: any) {
    this.homeRepository.getToken(code)
  }

  fetchUser() {
    console.log(this.myAccessToken?.access_token)
    this.userService.getUserInfo(this.myAccessToken?.access_token).subscribe({
      next: (data) => {
        console.log(data)
        this.user = data
        this.addUser()
      },
      error: (error) => { console.log(error) }

    })
  }

  addUser() {
    if (this.user != undefined) {
      const newUser: User = {
        id: this.user.id,
        nickname: this.user.nickname,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        address: this.user.address,
      }

      this.userService.postUser(newUser).subscribe({
        next: (data) => { console.log(data) },
        error: (error) => { console.log(error) }
      })
    }
  }

 
  /*
  public getToken(code: any) {
  this.apiService.fetchAccessToken(code).then((response) => { console.log(JSON.stringify(response, null, 3)) })
  }
  */

  
}
