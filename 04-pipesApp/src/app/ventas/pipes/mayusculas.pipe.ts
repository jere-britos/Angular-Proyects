import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'mayusculas', //Nombre del pipe que le quiero dar
})
export class MayusculasPipe implements PipeTransform {
    transform(valor: string, enMayusculas: boolean = true): string {
        return (enMayusculas) 
                ? valor.toUpperCase() 
                : valor.toLocaleLowerCase();
    }   
}