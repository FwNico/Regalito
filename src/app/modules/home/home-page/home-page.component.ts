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
  constructor(private userService: UserService, private homeRepository: HomeRepository, private tokenRepository: TokenRepository, private route: ActivatedRoute) { 
    this.myAccessToken = tokenRepository.getAccessToken()
    
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code']
      //this.getToken(code);
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

  fetchUser(){
    console.log(this.myAccessToken?.access_token)
    this.userService.getUserInfo(this.myAccessToken?.access_token).subscribe({
      next: (data) => { 
        this.user = data
        console.log(data);
        this.checkUserExistence();
      },
      error: (error) => {console.log(error)}

    })    
  }

  addUser(){
    if(this.user != undefined){
        const newUser: User = {
            id: this.user.id,
            nickname: this.user.nickname,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            address: this.user.address,
        }
    
        this.userService.postUser(newUser).subscribe({
            next: (data) => {console.log(data)},
            error: (error) => {console.log(error)}
        })
    }
  }

  checkUserExistence() {
    if(this.user != undefined){
      this.userService.userExists(this.user.id).subscribe(
        (exists) => {
          if(!exists){
            this.addUser()
          }
        },
        (error) => { console.log(error)}
      )
  }
  }
  

  /*
  public getToken(code: any) {
  this.apiService.fetchAccessToken(code).then((response) => { console.log(JSON.stringify(response, null, 3)) })
  }
  */

  fotos = [
    {
    url: 'https://www.cucinare.tv/wp-content/uploads/2020/08/Bananas1.jpg',
    nombre:'Banana',
    precio: '300',
    cantidad: '1'
    },
    {
      url: 'https://www.bupasalud.com/sites/default/files/inline-images/fuji-red.jpg',
      nombre:'Manzana',
      precio: '250',
      cantidad: '1'
    },
    {
      url: 'https://www.sabervivirtv.com/medio/2023/07/14/sandia-sin-pepitas_1f1e2965_230714105148_1280x720.jpg',
      nombre:'Sandia',
      precio: '190',
      cantidad: '1'
    },
    {
      url: 'https://naranjasribera.com/wp-content/uploads/2020/12/naranjas-y-mandarinas-diferencias.jpg',
      nombre:'Mandarina',
      precio: '175',
      cantidad: '1'
    },
    {
      url: 'https://www.cucinare.tv/wp-content/uploads/2020/08/Bananas1.jpg',
      nombre:'Banana',
      precio: '300',
      cantidad: '1'
      },
      {
        url: 'https://www.bupasalud.com/sites/default/files/inline-images/fuji-red.jpg',
        nombre:'Manzana',
        precio: '250',
        cantidad: '1'
      },
      {
        url: 'https://www.sabervivirtv.com/medio/2023/07/14/sandia-sin-pepitas_1f1e2965_230714105148_1280x720.jpg',
        nombre:'Sandia',
        precio: '190',
        cantidad: '1'
      },
      {
        url: 'https://naranjasribera.com/wp-content/uploads/2020/12/naranjas-y-mandarinas-diferencias.jpg',
        nombre:'Mandarina',
        precio: '175',
        cantidad: '1'
      }
  ];


}
