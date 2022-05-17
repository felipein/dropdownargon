import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OauthModule } from './oauth/oauth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AzureModule } from './azure/azure.module';
import { FaturaModule } from './fatura/fatura.module';
import { CalculoModule } from './calculo/calculo.module';
import { PagamentoModule } from './pagamento/pagamento.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OauthModule,
    UsuarioModule,
    AzureModule,
    FaturaModule,
    CalculoModule,
    PagamentoModule
  ]
})
export class ServicosModule { }
