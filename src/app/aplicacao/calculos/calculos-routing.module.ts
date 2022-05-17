import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculosComponent } from './calculos.component';
import { NovoCalculoComponent } from './novo-calculo/novo-calculo.component';

const routes: Routes = [

  {
    path: '',
    component:CalculosComponent,
    children:[
      {
        path:'',
        redirectTo:'tributario',
        pathMatch:'full'
      },
      {
        path:'novocalculo',
        component:NovoCalculoComponent

      },
      {
        path: 'tributario',
        loadChildren: () => import('./tributario/tributario.module').then(m => m.TributarioModule)
      },
      
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculosRoutingModule { }
