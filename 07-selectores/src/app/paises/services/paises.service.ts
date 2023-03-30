import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private _regiones: string[] = ['Africa','Americas','Asia','Europe','Oceania'];
  private baseUrl: string = 'https://restcountries.com/v2';

  get regiones(): string[]{
    return [ ...this._regiones ];
  }
  constructor(private http: HttpClient) { }

  getPaisesPorRegion(region: string): Observable<PaisSmall[]>{
    const url: string = `${this.baseUrl}/region/${ region }?field=alpha3Code,name`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo( codigo: string ): Observable<Pais | null>{
    if(!codigo){
      return of(null)
    }
    const url = `${ this.baseUrl }/alpha/${ codigo }`;
    return this.http.get<Pais>(url);
  }


}
