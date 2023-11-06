import { Component, OnInit } from '@angular/core';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';

@Component({
  selector: 'app-landing-page',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

    ngOnInit(): void {
        const repo= new TokenRepository()
         const token = repo.getAccessToken()


         token?.access_token
    }
}
