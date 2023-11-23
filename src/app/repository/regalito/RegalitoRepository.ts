import { Regalito } from 'src/app/core/models/Regalito';
import { Meli } from '../../core/models/Meli';
import { TokenRepository } from '../token/tokenRepository';
import { RegalitoService } from 'src/app/core/services/regalitos/regalito.service';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/core/models/Product';

@Injectable({
    providedIn: 'root'
  })
export class RegalitoRepository {

    meli: Meli | null;

    constructor(private tokenRepository: TokenRepository, private regalitoService: RegalitoService) {
        this.meli = tokenRepository.getAccessToken()
    }

    //idUserRecived es el id del usuario que va a recibir la solicitud de regalo
    createRegalito(product: Product, idUserRecived: number) {
        const regalito = new Regalito(this.meli?.user_id!, idUserRecived++, "pending", product)
        this.regalitoService.createRegalito(regalito).subscribe({
            next: (data) => { console.log("se guardo el regalo" + data.status) },
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

    getRegalitosSent(id: number) {
        this.regalitoService.regalitosSent(id).subscribe({
            next: resp => { console.log(resp) },
            error: error => { console.log(error) }
        })
    }

    getRegalitosReceived(id: number) {
        this.regalitoService.regalitosReceived(id).subscribe({
            next: resp => { console.log(resp) },
            error: error => { console.log(error) }
        })
    }
}