import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
  styles: [
  ]
})
export class NoComunesComponent {
  constructor() { }

  // i18nSelect
  nombre: string = 'Samanta';
  genero: string = 'femenino';

  invitacionMapa = {
    masculino: 'invitado',
    femenino: 'invitada'
  }
  cambiarCliente(){
    this.nombre = 'Fernando';
    this.genero = 'masculino'
  }

  //i18nPlural
  clientes: string[] = ['Maria','Pedro','Hernando','Fernando'];
  clientesMapa = {
    '=0': 'no tenemos ningún cliente esperando.',
    '=1': 'tenemos un cliente esperando.',
    '=2': 'tenemos 2 clientes esperando.',
    'other': 'tenemos # clientes esperando.',
  }

  borrarCliente(){
    this.clientes.pop();
  }
  // KeyValue Pipe
  persona = {
	  nombre: 'Fernando',
	  edad: 35,
	  direccion: 'Ottawa, Canadá'
  } 

  //Objetos de javascript
  heroes = [
    {
      nombre: 'Superman',
      vuela: true
    },
    {
      nombre: 'Robin',
      vuela: false
    },
    {
      nombre: 'Aquaman',
      vuela: false
    }
  ];

  // Async Pipe
  miObservable = interval(2000);

  valorPromesa = new Promise( (resolve, reject) =>{
    setTimeout(()=>{
      resolve('Tenemos data de promesa');
    }, 3500);
  });
}
