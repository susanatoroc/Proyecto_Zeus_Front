import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { DatePipe } from '@angular/common';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  setDatosIncorrectos: boolean = false;

  validaciones: FormGroup = this.fb.group({
    'nombre': ['',[Validators.required]],
    'fechaNacimiento': ['',[Validators.required]],
    'telefono': ['',[Validators.required]],
    'username': ['',[Validators.required]]

  })

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
    console.log("Ingresa a editar cliente");
    let datosSessionCliente = this.servicioCliente.obtenerInformacionSesion();
    let pipe = new DatePipe('en-US');
    this.nombreCliente = datosSessionCliente['body']['Nombre'];
    this.fechaNacimiento = pipe.transform(datosSessionCliente['body']['Fecha_nacimiento'], 'yyyy-MM-dd');
    this.telefono = datosSessionCliente['body']['telefono']; 
    this.username = datosSessionCliente['body']['username']; 

    // let respuesta = this.servicioAutenticacion.login(user,password);
    // console.log(respuesta);
  }

  enviarCambiosCliente(){

    console.log("Entro a enviar cambios cliente");
    let datosSession = this.servicioAutenticacion.obtenerInformacionSesion();
    let datosSessionCliente = this.servicioCliente.obtenerInformacionSesion();
    let idSession = datosSession['datos']['id'];

    let fecha = new Date(this.validaciones.controls['fechaNacimiento'].value);
    let modeloCliente: ClienteModel = {
      nombre : this.validaciones.controls['nombre'].value,
      fechaNacimiento : fecha,
      telefono  : this.validaciones.controls['telefono'].value,
      username : this.validaciones.controls['username'].value
    };
    console.log(modeloCliente);
    
    this.servicioCliente.putDatosCliente(idSession, modeloCliente).subscribe((datos:any)=>{
      console.log("Realizo el put!");
      this.servicioCliente.refrescarDatosEnSesion(modeloCliente);
      this.router.navigate(['cliente/visualizar-cliente']);
   },(error:any)=> {
      console.log("Error en el envio de informacion");
   });

  }

}
