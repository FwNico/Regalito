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
import { ProductService } from 'src/app/core/services/products/products.service';
import { WishListRepository } from 'src/app/repository/wishList/wishListRepository';
import { WishList } from 'src/app/core/models/WishList';
import { Product } from 'src/app/core/models/Product';
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
  constructor(private wishListRepo: WishListRepository, private userService: UserService, private homeRepository: HomeRepository,
    private tokenRepository: TokenRepository, private route: ActivatedRoute, private productService: ProductService) {
    this.myAccessToken = tokenRepository.getAccessToken()

  }


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
      }/*  else {
        console.log("fallo la recuperada de codigo")
      } */
    })
  }

  public getToken(code: any) {
    this.homeRepository.getToken(code)
    this.fetchUser()
  }

  fetchUser() {
    console.log(this.myAccessToken?.access_token)
    this.userService.getUserInfo(this.myAccessToken?.access_token).subscribe({
      next: (data) => {
        this.user = data
        this.checkUserExistence();
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

  checkUserExistence() {
    if (this.user != undefined) {
      this.userService.userExists(this.user.id).subscribe({
        next: (bool) => {
          if (bool == false) {
            this.addUser();
          }
        },
        error: (error) => { console.log(error) }
      })
    }
  }



  /*
  public getToken(code: any) {
  this.apiService.fetchAccessToken(code).then((response) => { console.log(JSON.stringify(response, null, 3)) })
  }
  */

  saveWhislist() {

    let product: Product[] = []

    const aux = new Product("MLA878620076_B", "pelota", "2awsdasd", 12000, "algun producto", "alguna categoria")
    product.push(aux)

    const lista = new WishList("coquita", product, this.myAccessToken!.user_id)

    const resp = this.wishListRepo.saveWishlist(lista)
    console.log(resp)
  }

  // editWhislist() {
  //   let product: Product[] = []
  //   const aux = new Product("MLA987654321_SS", "Pprueba 2", "url_imagen_2", 200, "Descripción del Producto 2")
  //   product.push(aux)

  //   this.wishListRepo.editWishList(product, 12124)
  // }

  getWishList() {
    this.wishListRepo.getWishListForId(1)
  }

  getAllWishListForUser() {
    return this.wishListRepo.getAllWishList(437402821)
  }

  editWishlist() {
    let product: Product[] = []
    const aux = new Product("MLA987654321-11", "Pprueba 1", "url_imagen_1", 200, "Descripción del Producto 1", "categoriaNueva")
    const aux2 = new Product("MLA987654321-33", "Pprueba 3", "url_imagen_3", 300, "Descripción del Producto 3", "categoriaNueva")
    product.push(aux)
    product.push(aux2)

    this.wishListRepo.editWishList(product, 1)
  }

}
