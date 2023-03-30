import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario(){
    return { ...this._usuario };
  }

  constructor( private http: HttpClient ) { }

  registro(name: string, email: string, password: string){
    const url = `${this.baseUrl}/auth/new`;
    const body = { name, email, password };
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {
          if(resp.ok){
            localStorage.setItem('token', resp.token!);
          }
        }),
        map( resp => resp.ok),
        catchError(err => of(err.error.msg))
      );

  }

  login( email: string, password: string ){
    const url = `${this.baseUrl}/auth`;
    const body = { email, password }
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {
          if( resp.ok ){
            localStorage.setItem('token', resp.token! );
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  }

  validarToken(): Observable<boolean> {
    const url = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
       .set('x-token', localStorage.getItem('token') || '')
    return this.http.get<AuthResponse>( url, {headers} )
      .pipe(
        map( resp => {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            name:  resp.name!,
            uid:   resp.uid!,
            email: resp.email!
          }
          return resp.ok;
        }),
        catchError( err => of(false))
     );
    //Vamos a recibir un error porque no le enviamos un token
  }

  logout() {
    localStorage.clear();
  }
  

}
