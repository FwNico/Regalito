import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Meli } from 'src/app/core/models/Meli';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user/userService.service';
import { UserRepository } from 'src/app/repository/user/userRepository';
import { HomeRepository } from 'src/app/repository/home/homeRepository';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';
import { ProductRepository } from 'src/app/repository/products/ProductsRepository';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})



export class HomePageComponent implements OnInit {

  myAccessToken: string = "";
  code: any
  constructor(private productsRepository: ProductRepository, private userRepository: UserRepository, private homeRepository: HomeRepository, private tokenRepository: TokenRepository, private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code']
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

  /*
  public getToken(code: any) {
  this.apiService.fetchAccessToken(code).then((response) => { console.log(JSON.stringify(response, null, 3)) })
  }
  */

  public seeUser() {
    this.userRepository.fetchUser()

    this.userRepository.userObserver.subscribe((user) => {
      console.log('user' + user)
    })
  }

  public favoritesList() {
    this.productsRepository.getListFavorites()
  }
}
