import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/Product';
import { Regalito } from 'src/app/core/models/Regalito';
import { ProductService } from 'src/app/core/services/products/products.service';
import { RegalitoService } from 'src/app/core/services/regalitos/regalito.service';
import { RegalitoRepository } from 'src/app/repository/regalito/RegalitoRepository';
import { TokenRepository } from 'src/app/repository/token/tokenRepository';

@Component({
  selector: 'app-list-regalitos',
  templateUrl: './list-regalitos.component.html',
  styleUrls: ['./list-regalitos.component.css']
})
export class ListRegalitosComponent implements OnInit{

  userId: number | undefined
  sentList: Regalito[] = [];
  receivedList: Regalito[] = [];
  
  constructor(private regalitoService: RegalitoService, private tokenRepository: TokenRepository){
    this.userId = this.tokenRepository.getAccessToken()?.user_id;
  }
    
  
  
  ngOnInit(): void {
    this.getRegalitosSent(this.userId!);
    this.getRegalitosReceived(this.userId!);
  }

  getRegalitosSent(id: number) {
    this.regalitoService.regalitosSent(id).subscribe({
        next: (data) => { this.sentList = data },
        error: (error) => { console.log("No se pudo traer la lista de regalos enviados",error) }
    })
  }

  getRegalitosReceived(id: number) {
    this.regalitoService.regalitosReceived(id).subscribe({
        next: (data) => { this.receivedList = data },
        error: (error) => { console.log("No se pudo traer la lista de regalos recibidos",error) }
    })
  }

  deleteRegalito(id: number){
    this.regalitoService.deleteRegalito(id).subscribe({
      next: (bool)=> {console.log("Regalito eliminado", bool)},
      error: (error)=> {console.log("Error al eliminar el regalito", error)}
    });

    this.getRegalitosSent(this.userId!);
  }

  acceptRegalito(regalito: Regalito){
    regalito.status = "accepted"
    this.regalitoService.updateRegalito(regalito).subscribe({
      next: (data)=> {console.log("Se cambió el status a accepted", data)},
      error: (error)=> {console.log("Ocurrió un error al cambiar el estado", error)}
    });

    this.getRegalitosReceived(this.userId!);
  }

  rejectRegalito(regalito: Regalito){
    regalito.status = "rejected"
    this.regalitoService.updateRegalito(regalito).subscribe({
      next: (data)=> {console.log("Se cambió el status a accepted", data)},
      error: (error)=> {console.log("Ocurrió un error al cambiar el estado", error)}
    });

    this.getRegalitosReceived(this.userId!);
  }

}
