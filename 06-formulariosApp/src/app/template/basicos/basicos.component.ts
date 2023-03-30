import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm = {
    producto: 'RTX 480ti',
    precio: 10,
    existencias: 10
  }
  
  constructor() { }

  ngOnInit(): void {
  }
  
  nombreValido() :boolean{
    return this.miFormulario?.controls['producto']?.invalid &&
           this.miFormulario?.controls['producto']?.touched
  }

  precioInvalido(): boolean{
    return this.miFormulario?.controls['precio']?.touched &&
           (this.miFormulario?.value?.precio < 0)
  }  

  guardar(){
    this.miFormulario.resetForm({
      producto:'algo',
      precio: 0,
      existencias: 0
    })
  }

}
