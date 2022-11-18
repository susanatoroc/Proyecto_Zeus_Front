import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent implements OnInit {

  nombreCliente: string = "";
  fechaNacimiento:Date = new Date(0);
  telefono:string = "";
  username:string = "";

  constructor(
    public servicioCliente: ClientesService,
    public servicioAutenticacion: AutenticacionService){

      this.visualizarCliente();
    }

  ngOnInit(): void {
  }

  visualizarCliente(){
    console.log("Ingresa a visualizar cliente");
    let datosSession = this.servicioAutenticacion.obtenerInformacionSesion();
    let id = datosSession['datos']['id'];

    this.servicioCliente.getDatosCliente(id).subscribe((datos:any)=>{
      console.log("La respuesta es satisfactoria");
      this.servicioCliente.almacenarInformacionCliente(datos);
      this.nombreCliente = datos['body']['Nombre'];
      this.fechaNacimiento = datos['body']['Fecha_nacimiento']; 
      this.telefono = datos['body']['telefono']; 
      this.username = datos['body']['username']; 

   },(error:any)=> {
      console.log("Error en el envio de informacion");
   });

    // let respuesta = this.servicioAutenticacion.login(user,password);
    // console.log(respuesta);
  }

}
