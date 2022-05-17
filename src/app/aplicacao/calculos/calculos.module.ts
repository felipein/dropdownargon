import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculosRoutingModule } from './calculos-routing.module';
import { TributarioModule } from './tributario/tributario.module';
import { CalculosComponent } from './calculos.component';
import { NovoCalculoComponent } from './novo-calculo/novo-calculo.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';


@NgModule({
  declarations: [
    CalculosComponent,
    NovoCalculoComponent
  ],
  imports: [
    CommonModule,
    CalculosRoutingModule,
    TributarioModule,
    ProgressbarModule
  ]
})
export class CalculosModule { }
