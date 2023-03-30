import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'vuela', //Nombre del pipe que le quiero dar
})
export class VuelaPipe implements PipeTransform {
    transform(vuela: boolean): string {
        return (vuela) 
                ? 'vuela' 
                : 'no vuela';
    }   
}