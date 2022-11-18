import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticateModel } from 'src/app/modelos/autenticate.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
var CryptoJS = require("crypto-js");

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  setDatosIncorrectos: boolean = false;
  validaciones: FormGroup = this.fb.group({
      'user': ['',[Validators.required]],
      'password': ['',[Validators.required]] 
  })

  constructor(private fb: FormBuilder, 
    public servicioAutenticacion: AutenticacionService){}

  ngOnInit(): void {
  }

  login(){
    console.log("Hola a todos");
    let user = this.validaciones.controls['user'].value;
    let password  = this.validaciones.controls['password'].value;
    let cypherPass = CryptoJS.MD5(password).toString();
    // let respuesta = this.servicioAutenticacion.login(user,password);
    // console.log(respuesta);
   this.servicioAutenticacion.login(user,cypherPass).subscribe((datos:any)=>{
      console.log("La respuesta es satisfactoria");
      this.servicioAutenticacion.almacenarInformacionSesion(datos);
      this.setDatosIncorrectos = false;

   },(error:any)=> {
      console.log("Error en el envio de informacion");
      this.setDatosIncorrectos = true;
   });
  }

}
