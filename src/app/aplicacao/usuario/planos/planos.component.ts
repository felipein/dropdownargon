import { Component, OnInit } from '@angular/core';
import { Expiration } from 'src/app/modelos/pagseguro/expiration';
import { Plano } from 'src/app/modelos/pagseguro/plano';
import { PreApproval } from 'src/app/modelos/pagseguro/preapproval';
import { Oferta } from 'src/app/modelos/usuario/oferta';
import { AutenticacaoService } from 'src/app/servicos/oauth/autenticacao.service';
import { CriarPlanoService } from 'src/app/servicos/pagamento/pagseguro/criar-plano.service';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.scss']
})
export class PlanosComponent implements OnInit {

  //  [routerLink]="['/aplicacao/usuario/novaassinatura']" [queryParams]="{'plano':'Alfa'}" 
  oferta:Oferta = new Oferta();
  plano:Plano = new Plano();
  assinatura:PreApproval= new PreApproval();
  cartaoToken:string;

  constructor(private criarPlanoService:CriarPlanoService,
    private autenticacaoService:AutenticacaoService) { }

  ngOnInit(): void {
  }

  criarPlano(){

    this.plano.reference = this.autenticacaoService.usuario().email;

    this.assinatura.name = 'Alfa';
    this.assinatura.charge = 'AUTO';
    this.assinatura.period = 'MONTHLY',
    this.assinatura.amountPerPayment = '49.00';
    this.assinatura.membershipFee = '0.00';
    this.assinatura.trialPeriodDuration = 31;
    this.assinatura.expiration = new Expiration();
    this.assinatura.expiration.unit = 'YEARS';
    this.assinatura.expiration.value = 5;
    this.assinatura.details = 'Plano premium';
    

    this.plano.preApproval = this.assinatura;


    
   
    this.criarPlanoService.criarPlano(this.plano)
    .then(resultado=>{
      console.log('resultado adesao plano');
      
    });

  }
}
