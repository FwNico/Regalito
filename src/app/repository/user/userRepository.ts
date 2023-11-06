import { ApiService } from "src/app/core/services/api.service"
import { TokenRepository } from "../token/tokenRepository";
import { UserService } from "src/app/core/services/user/userService.service";
import { Observable, Subject } from 'rxjs';
import { ResponseUser } from '../../core/models/User';
import { Meli } from "src/app/core/models/Meli";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserRepository {
    //este es el observalbe que los componentes van a escuchar, como valor inicial tendra null
    userObserver: Observable<ResponseUser | null>

    //esta variable se utiliza para que se pueda actualizar el valor del observable
    userSubjet: Subject<ResponseUser>

    //token para hacer peticiones
    tokenAcces: Meli | null

    constructor(private userService: UserService, private tokenRepository: TokenRepository) {
        this.userSubjet = new Subject<ResponseUser>
        this.userObserver = this.userSubjet.asObservable()
        this.tokenAcces = tokenRepository.getAccessToken()
    }

    fetchUser() {
        console.log(this.tokenAcces?.access_token)
        this.userService.getUserInfo(this.userService.getUserInfo(this.tokenAcces?.access_token)).then((response) => {
            
            //hacer tratamiento de usuario
            console.log(response?.first_name)
        })
    }


}