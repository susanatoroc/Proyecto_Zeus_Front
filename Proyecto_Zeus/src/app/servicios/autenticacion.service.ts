import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AutenticateModel } from '../modelos/autenticate.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private endPoint = 'http://localhost:3000';

  datosUsuarioEnSesion = new BehaviorSubject<AutenticateModel>(new AutenticateModel());

  constructor(private http: HttpClient) { 
    this.verificarSesionActual();
  }

  /**
   * 
   * @param user 
   * @param password 
   * @returns 
   */

  login(user: string,password: string):Observable<AutenticateModel>{

    return this.http.post<AutenticateModel>(this.endPoint + '/clientes/identificarCliente',
    
    {
      "usuario": user,
      "clave": password
    }, {
      headers:new HttpHeaders({})
    });
  }

  almacenarInformacionSesion(datos:AutenticateModel){
    datos.estaIdentificado = true;
    let jsonData = JSON.stringify(datos);
    localStorage.setItem("Session",jsonData);
    this.refrescarDatosEnSesion(datos);
  }

  obtenerInformacionSesion(){
    let datos = localStorage.getItem("Session");

    if(datos)
      return JSON.parse(datos);
    else
      return null
  }

  eliminarInformacionSesion(){
    localStorage.removeItem("Session");
    this.refrescarDatosEnSesion(new AutenticateModel);
  }

  seHaIniciadoSesion(){
    return localStorage.getItem("Session");
  }

  verificarSesionActual(){

    let datos = this.obtenerInformacionSesion();
    if(datos){
      this.refrescarDatosEnSesion(datos);
    }
  }

  refrescarDatosEnSesion(datos: AutenticateModel){
    this.datosUsuarioEnSesion.next(datos);
  }

  obtenerDatosUsuarioEnSesion(){
    return this.datosUsuarioEnSesion.asObservable();
  }
}
