import { Component } from '@angular/core';

@Component({
    selector: 'app-heroe',
    templateUrl: 'heroe.component.html'
})
export class HeroesComponent{
    nombre: string = 'Ironman';
    edad  : number = 45
    //El get es una funcion para acceder a datos, desde afuera
    get nombreCapitalizado(): string{
        return this.nombre.toUpperCase();
    }

    obtenerNombre(): string{
        return `${this.nombre} - ${this.edad}`
    }

    cambiarNombre():void{
        this.nombre = 'Spiderman'
    }
    cambiarEdad():void{
        this.edad = 35
    }
}