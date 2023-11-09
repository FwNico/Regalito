import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Meli } from 'src/app/core/models/Meli';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user/userService.service';
import { UserRepository } from 'src/app/repository/user/userRepository';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';
import { HomeRepository } from 'src/app/repository/home/homeRepository';
import { ResponseUser } from 'src/app/core/models/User';
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

  code: any;
  user?: ResponseUser;
  constructor(private userRepository: UserRepository, private homeRepository: HomeRepository, private tokenRepository: TokenRepository, private route: ActivatedRoute) { }


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
    this.userRepository.userObserver.subscribe((user) => {
      console.log('user' + user)
    })
  }
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
