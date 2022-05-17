import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { AplicacaoComponent } from './aplicacao.component';

const routes: Routes = [
  {
    path: '',
    component:AdminLayoutComponent,
    children:[
      {
        path:'',
        redirectTo:'calculos',
        pathMatch:'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'usuario',
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
      },
      {
        path: 'calculos',
        loadChildren: () => import('./calculos/calculos.module').then(m => m.CalculosModule)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AplicacaoRoutingModule { }
