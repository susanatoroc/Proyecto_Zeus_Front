import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutenticateModel } from 'src/app/modelos/autenticate.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

  setInicioSesion: boolean = false;

  constructor(private autenticacionService: AutenticacionService) { }

  subs: Subscription = new Subscription();

  ngOnInit(): void {
    this.subs = this.autenticacionService.obtenerDatosUsuarioEnSesion().subscribe((datos:AutenticateModel) => {
      this.setInicioSesion = datos.estaIdentificado;
    });
  }

}
