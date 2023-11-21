import { Regalito } from 'src/app/core/models/Regalito';
import { Meli } from '../../core/models/Meli';
import { TokenRepository } from '../token/tokenRepository';
import { RegalitoService } from 'src/app/core/services/regalitos/RegalitoService.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class RegalitoRepository {

    meli: Meli | null;

    constructor(private tokenRepository: TokenRepository, private regalitoService: RegalitoService) {
        this.meli = tokenRepository.getAccessToken()
    }

    //idUserRecived es el id del usuario que va a recibir la solicitud de regalo
    createRegalito(idProduct: string, idUserRecived: number) {
        const regalito = new Regalito(this.meli?.user_id!, idUserRecived, "PENDING", idProduct)
        this.regalitoService.createRegalito(regalito).subscribe({
            next: (data) => { console.log("se guardo el regalo" + data) },
            error: (error) => { console.log("error al guardar regalito " + error) }
        })
    }

    deleteRegalito(idUserRecived: number) {

        this.regalitoService.deleteRegalito(idUserRecived).subscribe({
            next: (data) => { console.log("regalito borrado correctamente" + data) },
            error: (error) => { console.log("el regalo no se borro correctamente" + error) }
        }
        )
    }

    getRegalitosSend(idList: number) {
        this.regalitoService.regalitosSend(idList).subscribe({
            next: resp => { console.log(resp) },
            error: error => { console.log(error) }
        })
    }

    getRegalitosRecived(idList: number) {
        this.regalitoService.regalitoRecived(idList).subscribe({
            next: resp => { console.log(resp) },
            error: error => { console.log(error) }
        })
    }
}