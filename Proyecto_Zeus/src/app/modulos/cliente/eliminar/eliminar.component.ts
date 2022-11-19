import { DatePipe } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {


  nombreCliente: string = "";
  fechaNacimiento: any= "";
  telefono:string = "";
  username:string = "";

  constructor(private fb: FormBuilder, 
    public servicioCliente: ClientesService,
    public servicioAutenticacion: AutenticacionService,
    private router: Router){

      this.visualizarCliente();
    }

    ngOnInit(): void {
    }


  visualizarCliente(){
    console.log("Ingresa a eliminar cliente");
    let datosSessionCliente = this.servicioCliente.obtenerInformacionSesion();
    let pipe = new DatePipe('en-US');
    this.nombreCliente = datosSessionCliente['body']['Nombre'];
    this.fechaNacimiento = pipe.transform(datosSessionCliente['body']['Fecha_nacimiento'], 'yyyy-MM-dd');
    this.telefono = datosSessionCliente['body']['telefono']; 
    this.username = datosSessionCliente['body']['username']; 

    // let respuesta = this.servicioAutenticacion.login(user,password);
    // console.log(respuesta);
  }

eliminarCliente(){

    console.log("Entro a crear cliente");
    let datosSession = this.servicioAutenticacion.obtenerInformacionSesion();
    let idSession = datosSession['datos']['id'];

    this.servicioCliente.eliminarCliente(idSession).subscribe((datos:any)=>{
      console.log("Eliminó el cliente");
      this.servicioCliente.eliminarInformacionSesion();
      this.servicioAutenticacion.eliminarInformacionSesion();

      this.router.navigate(['login']);
   },(error:any)=> {
      console.log("Error en el envio de informacion");
   });

  }

}
