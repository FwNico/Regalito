import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Meli } from 'src/app/core/models/Meli';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})



export class HomePageComponent implements OnInit {
  
  myAccessToken:string ="";
  
  private apiService: ApiService
  code: any
  constructor(apiService: ApiService, private route: ActivatedRoute) {
    this.apiService = apiService
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code']
      if (code != null) {
        console.log("codigo obtenido= " + code)
        this.getToken(code);
      } else {
        console.log("fallo la recuperada de codigo")
      }
    })
  }

  public getToken(code: any) {
    this.apiService.fetchAccessToken(code)
      .then((response) => {
        this.myAccessToken = response.access_token;
        
        console.log("access_token obtenido= " + this.myAccessToken);
        this.seeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*
  public getToken(code: any) {
  this.apiService.fetchAccessToken(code).then((response) => { console.log(JSON.stringify(response, null, 3)) })
  }
  */
 
  public seeUser(){
    console.log(this.apiService.getUserInfo(this.myAccessToken));
  }
}
