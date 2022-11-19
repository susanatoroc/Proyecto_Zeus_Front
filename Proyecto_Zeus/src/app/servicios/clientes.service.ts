import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClienteModel } from '../modelos/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private endPoint = 'http://localhost:3000';

  datosUsuarioEnSesion = new BehaviorSubject<ClienteModel>(new ClienteModel());

  constructor(private http: HttpClient) { 
    this.verificarSesionActual();
  }

  /**
   * 
   * @param id
   * @returns 
   */

  getDatosCliente(id: string):Observable<HttpResponse<ClienteModel>>{

    return this.http.get<ClienteModel>(    
    this.endPoint + '/clientes/'+ id,
    { observe: 'response'});
  }

  putDatosCliente(id: string, clienteModel: ClienteModel):Observable<HttpResponse<ClienteModel>>{
    
    return this.http.put<ClienteModel>(  
    this.endPoint + '/clientes/'+ id,  
    {
      "Nombre":clienteModel.nombre,
      "Fecha_nacimiento":clienteModel.fechaNacimiento,
      "telefono":clienteModel.telefono,
      "username":clienteModel.username
    }, 
    { observe: 'response'});
  }

  crearCliente(clienteModel: ClienteModel):Observable<HttpResponse<ClienteModel>>{
    console.log(clienteModel.fechaNacimiento);
    
    return this.http.post<ClienteModel>(  
    this.endPoint + '/clientes/',  
    {
      "Nombre":clienteModel.nombre,
      "Fecha_nacimiento":clienteModel.fechaNacimiento,
      "telefono":clienteModel.telefono,
      "username":clienteModel.username
    }, 
    { observe: 'response'});
  }

  eliminarCliente(id: string):Observable<HttpResponse<ClienteModel>>{
    
    return this.http.delete<ClienteModel>(  
    this.endPoint + '/clientes/' + id, 
    { observe: 'response'});
  }

  almacenarInformacionCliente(datos:ClienteModel){
 //   datos.estaIdentificado = true;
    let jsonData = JSON.stringify(datos);
    localStorage.setItem("SessionCliente",jsonData);
 //   this.refrescarDatosEnSesion(datos);
  }

  obtenerInformacionSesion(){
    let datos = localStorage.getItem("SessionCliente");

    if(datos)
      return JSON.parse(datos);
    else
      return null
  }

  eliminarInformacionSesion(){
    localStorage.removeItem("SessionCliente");
    //this.refrescarDatosEnSesion(new AutenticateModel);
  }

  seHaIniciadoSesion(){
    return localStorage.getItem("SessionCliente");
  }

  verificarSesionActual(){

    let datos = this.obtenerInformacionSesion();
    if(datos){
      this.refrescarDatosEnSesion(datos);
    }
  }

  refrescarDatosEnSesion(datos: ClienteModel){
    this.datosUsuarioEnSesion.next(datos);
  }

  obtenerDatosUsuarioEnSesion(){
    return this.datosUsuarioEnSesion.asObservable();
  }
}
