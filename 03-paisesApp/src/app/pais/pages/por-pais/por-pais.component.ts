import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
  li{
    cursor: pointer;
  }
  `
  ]
})
export class PorPaisComponent {

  termino : string = '';
  hayError: boolean = false;
  paises  : Country[] = [];//Almacenamos los paises
  paisesSugeridos: Country[]=[];

  mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService) { }

  buscar(termino: string){
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;
  
    this.paisService.buscarPais( this.termino )
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.paises = resp;
        },
        error: (err) => {
          this.hayError = true;
          this.paises   = [];
        }
      });
  }

  sugerencia( termino: string ){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias=true;
    // TODO: crear sugerencias
    this.paisService.buscarPais(termino)
      .subscribe({
        next: (paises) => {
          this.paisesSugeridos = paises.splice(0,5);
        },
        error: (err) => {
          this.paisesSugeridos = [];
        }
      });
  }

  buscarSugerido( termino: string ){
    this.buscar( termino );    
  } 
}
