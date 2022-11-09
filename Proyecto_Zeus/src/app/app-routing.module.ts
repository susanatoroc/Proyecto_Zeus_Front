import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './plantilla/error/error.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';


const routes: Routes = [

  {
    path:"inicio",
    component: InicioComponent
  },
  {
    path:"",
    pathMatch: 'full',
    redirectTo: '/inicio'
  },
  {
    path: "login",
    loadChildren:() => import("./modulos/login/login.module").then(x => x.LoginModule)
  },
  {
    path: "cliente",
    loadChildren:() => import("./modulos/cliente/cliente.module").then(x => x.ClienteModule)
  },
  {
    path: "**",
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
