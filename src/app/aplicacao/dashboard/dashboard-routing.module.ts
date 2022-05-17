import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculosDashboardComponent } from './calculos-dashboard/calculos-dashboard.component';
import { ClientesDashboardComponent } from './clientes-dashboard/clientes-dashboard.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    children:[
      {
        path:'',
        redirectTo:'calculos',
        pathMatch:'full'
      },
      {
        path:'calculos',
        component:CalculosDashboardComponent,
      },
      {
        path:'clientes',
        component:ClientesDashboardComponent,
      },
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
