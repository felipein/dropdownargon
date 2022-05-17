import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CalculosDashboardComponent } from './calculos-dashboard/calculos-dashboard.component';
import { DashboardComponent } from './dashboard.component';
import { ClientesDashboardComponent } from './clientes-dashboard/clientes-dashboard.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    CalculosDashboardComponent,
    DashboardComponent,
    ClientesDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxDatatableModule
  ]
})
export class DashboardModule { }
