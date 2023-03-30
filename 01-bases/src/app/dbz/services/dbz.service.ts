import { Personaje } from '../interfaces/dbz.interface';
import { Injectable } from "@angular/core";

@Injectable()
export class DbzService{
  
  private _personajes: Personaje[] = [
    {
      nombre: 'Goku',
      poder: 15000
    },{
      nombre: 'Vegeta',
      poder: 7500
    }
  ];

  //Metodo que retorne el objeto privado
  get personajes(): Personaje[]{
    return [...this._personajes];
  }

  //Para evitar la manipulacion desde afuera se desestructura, separa cada uno de los elementos independientes que tiene y lo vuelve un arreglo.

  constructor(){}

  //metodos para añadir personajes
  agregarPersonaje( personaje: Personaje ){
    this._personajes.push( personaje );
  }


}