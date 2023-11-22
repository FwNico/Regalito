import { Component, OnInit } from '@angular/core';
import { Meli } from '../../../../core/models/Meli';
import { TokenRepository } from '../../../../repository/token/tokenRepository';
import { RegalitoRepository } from '../../../../repository/regalito/RegalitoRepository';
import { RegalitoService } from 'src/app/core/services/regalitos/RegalitoService.service';
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
    this.regalitoService.regalitoRecived(this.meli?.user_id!).subscribe({
      next: (data) => { this.listRegalitosRecived = data },
      error: (resp) => { console.log("error al traer datos de regalo" + resp) }
    })
    this.regalitoService.regalitosSend(this.meli?.user_id!).subscribe({
      next: (data) => { this.listRegalitosSend = data },
      error: (resp) => { console.log("error al obtener regalos enviados", resp) }
    })
  }


  deleteRegalito() {

  }

  acceptRegalito() {
    // this.regalitoService.
  }



}
