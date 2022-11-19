import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  setPasswordEnviada: boolean = false;

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
    public servicioCliente: ClientesService){
    }

  ngOnInit(): void {
  }

  crearCliente(){

    console.log("Entro a crear cliente");

    let fecha = new Date(this.validaciones.controls['fechaNacimiento'].value);
    let modeloCliente: ClienteModel = {
      nombre : this.validaciones.controls['nombre'].value,
      fechaNacimiento : fecha,
      telefono  : this.validaciones.controls['telefono'].value,
      username : this.validaciones.controls['username'].value
    };
    console.log(modeloCliente);
    
    this.servicioCliente.crearCliente(modeloCliente).subscribe((datos:any)=>{
      console.log("Creo el cliente");
      this.setPasswordEnviada=true;
   },(error:any)=> {
      console.log("Error en el envio de informacion");
   });

  }


}
