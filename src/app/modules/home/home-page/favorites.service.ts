import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

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
  
  getFavs(){
    return this.fotos;
  }
}
