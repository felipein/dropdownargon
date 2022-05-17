import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { NovaAssinaturaConcluidaComponent } from './nova-assinatura-concluida/nova-assinatura-concluida.component';
import { NovaAssinaturaComponent } from './nova-assinatura/nova-assinatura.component';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { PlanosComponent } from './planos/planos.component';
import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
  {
    path:'',
    component:UsuarioComponent,
    children:[
      {
        path:'',
        redirectTo:'minhaconta',
        pathMatch:'full'
      },
      {
        path:'minhaconta',
        component:MinhaContaComponent,
      },
      {
        path:'configuracoes',
        component:ConfiguracoesComponent,
      },
      {
        path:'novocliente',
        component:NovoClienteComponent,
      },
      {
        path:'clientes',
        component:ClientesComponent,
      },
      {
        path:'planos',
        component:PlanosComponent
      },
      {
        path:'novaassinatura',
        component:NovaAssinaturaComponent
      },{
        path:'novaassinaturaconcluida',
        component:NovaAssinaturaConcluidaComponent
      }

    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
