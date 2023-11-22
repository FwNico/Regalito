import { Component, OnInit } from '@angular/core';
import { Meli } from '../../../../core/models/Meli';
import { TokenRepository } from '../../../../repository/token/tokenRepository';
import { RegalitoRepository } from '../../../../repository/regalito/RegalitoRepository';
import { RegalitoService } from 'src/app/core/services/regalitos/regalito.service';
import { Regalito } from 'src/app/core/models/Regalito';

@Component({
  selector: 'app-regalito-page',
  templateUrl: './regalito-page.component.html',
  styleUrls: ['./regalito-page.component.css']
})
export class RegalitoPageComponent implements OnInit {
  meli: Meli | null;
  listRegalitosRecived: Regalito[]
  listRegalitosSend: Regalito[]

  constructor(private TokenRepository: TokenRepository, private regalitoRepository: RegalitoRepository, private regalitoService: RegalitoService) {
    this.meli = this.TokenRepository.getAccessToken()
    this.listRegalitosRecived = []
    this.listRegalitosSend = []
  }
  ngOnInit(): void {

  }

  sendRegalito(idProduct: string, idUser: number) {
    this.regalitoRepository.createRegalito("MLA432109876_DD", 2025934981)
  }

}
