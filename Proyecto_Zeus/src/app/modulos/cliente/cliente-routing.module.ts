import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { EliminarComponent } from './eliminar/eliminar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';

const routes: Routes = [
  {
    path:"crear-cliente",
    component: CrearComponent
  },
  {
    path:"",
    component: CrearComponent
  },
  {
    path:"editar-cliente",
    component: EditarComponent
  },
  {
    path:"eliminar-cliente",
    component: EliminarComponent
  },
  {
    path:"visualizar-cliente",
    component: VisualizarComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
