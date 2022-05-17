import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AplicacaoRoutingModule } from './aplicacao-routing.module';
import { AplicacaoComponent } from './aplicacao.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CalculosModule } from './calculos/calculos.module';


@NgModule({
  declarations: [
    AplicacaoComponent
  ],
  imports: [
    CommonModule,
    AplicacaoRoutingModule,
    DashboardModule,
    UsuarioModule,
    CalculosModule
  ]
})
export class AplicacaoModule { }
