import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { TokenRepository } from '../token/tokenRepository';
@Injectable({
    providedIn: 'root'
  })
export class HomeRepository {
    constructor(private apiService: ApiService, private TokenRepository: TokenRepository) { }

    getToken(code: any) {
        this.apiService.fetchAccessToken(code).subscribe({
            next: (response) => {(response !== undefined) ?
                this.TokenRepository.saveAccessToken(response) : console.log("error de guardado de token, respuesta undefined")},
            error: (error) => { console.log("El token ya fue canjeado", error)}
    })
    }
}