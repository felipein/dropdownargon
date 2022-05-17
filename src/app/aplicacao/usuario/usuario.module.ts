import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { ClientesComponent } from './clientes/clientes.component';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { DxNavBarModule, DxTabsComponent, DxTabsModule, DxVectorMapComponent, DxVectorMapModule } from 'devextreme-angular';
import { DxoTabPanelOptionsModule } from 'devextreme-angular/ui/nested';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PlanosComponent } from './planos/planos.component';
import { NovaAssinaturaComponent } from './nova-assinatura/nova-assinatura.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NovaAssinaturaConcluidaComponent } from './nova-assinatura-concluida/nova-assinatura-concluida.component';


@NgModule({
  declarations: [
    UsuarioComponent,
    MinhaContaComponent,
    ConfiguracoesComponent,
    ClientesComponent,
    NovoClienteComponent,
    PlanosComponent,
    NovaAssinaturaComponent,
    NovaAssinaturaConcluidaComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    ProgressbarModule,
    
    
    
  ],
  providers:[BsModalService]
})
export class UsuarioModule { }
