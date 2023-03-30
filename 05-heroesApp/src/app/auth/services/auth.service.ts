import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth : Auth | undefined;

  get auth(): Auth{
    return { ...this._auth! }//Recibe el objeto decestructurado
  }

  verificaAutenticacion(): Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
              .pipe(
                map( auth => {
                  this._auth = auth;
                  return true;
                })
              )
  }

  constructor( private http: HttpClient) { }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth ),
        tap( auth => localStorage.setItem('token', auth.id))
      );
  }
}
