import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';


@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino   : string = '';
  hayError  : boolean = false;
  paises : Country[] = [];//Almacenamos las capitales
  
  constructor( private paisService: PaisService ) {}

  buscar(termino: string){
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital( this.termino )
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.paises = resp;
        },
        error: (err) => {
          this.hayError = true;
          this.paises = [];
        }
      });
  }

  sugerencia( termino: string ){
    this.hayError = false;
    this.buscar(termino);
  }
}
