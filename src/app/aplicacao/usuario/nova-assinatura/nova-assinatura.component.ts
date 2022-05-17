import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plano } from 'src/app/modelos/pagseguro/plano';
import { Oferta } from 'src/app/modelos/usuario/oferta';
import { AutenticacaoService } from 'src/app/servicos/oauth/autenticacao.service';
import { CriarPlanoService } from 'src/app/servicos/pagamento/pagseguro/criar-plano.service';
import { GerarSessaoService } from 'src/app/servicos/pagamento/pagseguro/gerar-sessao.service';
import { PreApproval} from 'src/app/modelos/pagseguro/preapproval'
import { Expiration} from 'src/app/modelos/pagseguro/expiration'
import { AderirPlanoService } from 'src/app/servicos/pagamento/pagseguro/aderir-plano.service';
import { AdesaoPlano } from 'src/app/modelos/pagseguro/adesaoplano';
import { PaymentMethod } from 'src/app/modelos/pagseguro/paymentmethod';
import { Sender } from 'src/app/modelos/pagseguro/sender';
import { Address } from 'src/app/modelos/pagseguro/address';
import { Documents } from 'src/app/modelos/pagseguro/documents';
import { Phone } from 'src/app/modelos/pagseguro/phone';
import { CreditCard } from 'src/app/modelos/pagseguro/creditcard';
import { Holder } from 'src/app/modelos/pagseguro/holder';
import { FormBuilder, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { AtualizarUsuarioService } from 'src/app/servicos/usuario/atualizar-usuario.service';
import { Usuario } from 'src/app/modelos/usuario/usuario';
import { PostRequestResult } from 'src/app/modelos/pagseguro/postrequestresult';

declare var PagSeguroDirectPayment:any;




@Component({
  selector: 'app-nova-assinatura',
  templateUrl: './nova-assinatura.component.html',
  styleUrls: ['./nova-assinatura.component.scss']
})
export class NovaAssinaturaComponent implements OnInit {


  adesaoForm = this.fb.group({
    nome:['', Validators.required],
    cpf:['', Validators.required],
    nascimento:[''],
    cep:[''],
    rua:[''],
    numero:[''],
    complemento:[''],
    bairro:[''],
    cidade:[''],
    estado:[''],
    ddd:[''],
    telefone:[''],
  });
  
  cartaoForm = this.fb.group({
    nome:[''],
    numero:[''],
    validade:[''],
    codigoSeguranca:[''],
  });


  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;

  oferta:Oferta = new Oferta();
  plano:Plano = new Plano();
  assinatura:PreApproval= new PreApproval();
  cartaoToken:string;

  constructor(private gerarSessaoService:GerarSessaoService,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private criarPlanoService:CriarPlanoService,
    private autenticacaoService:AutenticacaoService,
    private aderirPlanoService:AderirPlanoService,
    private atualizarUsuarioService:AtualizarUsuarioService,
    private _ngZone:NgZone) {

    this.carregaJavascriptPagseguro();

    this.gerarSessaoService.gerarSessao()
    .then(sessao=>{
      let postRquestResult:PostRequestResult = sessao as PostRequestResult;
      PagSeguroDirectPayment.setSessionId(postRquestResult.result);
    });

  }

  

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params=>{
      this.oferta.nome = params.plano;
      this.oferta.referenciaPlano = params.referencia;
    });
  }

  assinar(){
    console.log('assinar');
    
    this.adesaoForm.get('nome').setValue('felipe bezerra dos reis');
    this.adesaoForm.get('cpf').setValue('01342408390');
    this.adesaoForm.get('nascimento').setValue('06/03/1987');
    this.adesaoForm.get('cep').setValue('65760000');
    this.adesaoForm.get('rua').setValue('av tancredo neves');
    this.adesaoForm.get('numero').setValue('1697');
    this.adesaoForm.get('complemento').setValue('sem complemento');
    this.adesaoForm.get('bairro').setValue('vila militar');
    this.adesaoForm.get('cidade').setValue('presidente dutra');
    this.adesaoForm.get('estado').setValue('MA');
    this.adesaoForm.get('ddd').setValue('98');
    this.adesaoForm.get('telefone').setValue('992210321');


    this.cartaoForm.get('nome').setValue('felipe bezerra dos reis');
    this.cartaoForm.get('numero').setValue('4984319047127922');
    this.cartaoForm.get('validade').setValue('04/2028');
    this.cartaoForm.get('codigoSeguranca').setValue('168');
    
    
    this.gerarTokenCartaoAderirPlano();
    
    
  }

  aderirPlano(){
    let adesao = new AdesaoPlano();
    adesao.paymentMethod = new PaymentMethod();
    adesao.paymentMethod.creditCard = new CreditCard();
    adesao.paymentMethod.creditCard.holder = new Holder();
    adesao.paymentMethod.creditCard.holder.billingAddress = new Address();
    adesao.paymentMethod.creditCard.holder.billingAddress.city = this.adesaoForm.get('cidade').value;
    adesao.paymentMethod.creditCard.holder.billingAddress.complement = this.adesaoForm.get('complemento').value;
    adesao.paymentMethod.creditCard.holder.billingAddress.country = 'BRA';
    adesao.paymentMethod.creditCard.holder.billingAddress.district = this.adesaoForm.get('bairro').value;;
    adesao.paymentMethod.creditCard.holder.billingAddress.number = this.adesaoForm.get('numero').value;
    adesao.paymentMethod.creditCard.holder.billingAddress.postalCode = this.adesaoForm.get('cep').value;;
    adesao.paymentMethod.creditCard.holder.billingAddress.state = this.adesaoForm.get('estado').value;;
    adesao.paymentMethod.creditCard.holder.billingAddress.street = this.adesaoForm.get('rua').value;
    adesao.paymentMethod.creditCard.holder.birthDate = this.adesaoForm.get('nascimento').value;
    adesao.paymentMethod.creditCard.holder.documents = [];
    adesao.paymentMethod.creditCard.holder.documents.push(new Documents());
    adesao.paymentMethod.creditCard.holder.documents[0].type = 'CPF';
    adesao.paymentMethod.creditCard.holder.documents[0].value = this.adesaoForm.get('cpf').value;
    adesao.paymentMethod.creditCard.holder.name = this.adesaoForm.get('nome').value;
    adesao.paymentMethod.creditCard.holder.phone = new Phone();
    adesao.paymentMethod.creditCard.holder.phone.areaCode = this.adesaoForm.get('ddd').value;
    adesao.paymentMethod.creditCard.holder.phone.number = this.adesaoForm.get('telefone').value;
    adesao.paymentMethod.creditCard.token = this.cartaoToken;

    adesao.paymentMethod.type = 'CREDITCARD';


    adesao.plan = this.oferta.referenciaPlano;
    adesao.reference = this.oferta.nome;


    adesao.sender = new Sender();

    adesao.sender.address = new Address();
    adesao.sender.address.city = adesao.paymentMethod.creditCard.holder.billingAddress.city;
    adesao.sender.address.complement = adesao.paymentMethod.creditCard.holder.billingAddress.complement;
    adesao.sender.address.country = adesao.paymentMethod.creditCard.holder.billingAddress.country;
    adesao.sender.address.district = adesao.paymentMethod.creditCard.holder.billingAddress.district;
    adesao.sender.address.number = adesao.paymentMethod.creditCard.holder.billingAddress.number;
    adesao.sender.address.postalCode = adesao.paymentMethod.creditCard.holder.billingAddress.postalCode;
    adesao.sender.address.state = adesao.paymentMethod.creditCard.holder.billingAddress.state;
    adesao.sender.address.street = adesao.paymentMethod.creditCard.holder.billingAddress.street;

    adesao.sender.documents = [];
    adesao.sender.documents.push(new Documents());
    adesao.sender.documents[0].type = 'CPF';
    adesao.sender.documents[0].value = this.adesaoForm.get('cpf').value;

    adesao.sender.email = this.autenticacaoService.usuario().email;

    adesao.sender.hash = PagSeguroDirectPayment.getSenderHash();

    adesao.sender.phone = new Phone();
    adesao.sender.phone.areaCode = this.adesaoForm.get('ddd').value;
    adesao.sender.phone.number = this.adesaoForm.get('telefone').value;

    adesao.sender.name = this.adesaoForm.get('nome').value;

   
    this.aderirPlanoService.AderirPlano(adesao)
    .then(resultado=>{

      let usuario:Usuario = this.autenticacaoService.usuario();
      usuario.assinatura = resultado['code'];

      console.log('plano aderido: ' + usuario.assinatura);

      this.atualizarUsuarioService.atualizarUsuario(usuario)
      .then(usuario=>{
        this.autenticacaoService.setUsuario(usuario['result'] as Usuario);
        console.log('usuario atualizado:');
        console.log(usuario['result']);
        this._ngZone.run(()=>{
          this.router.navigateByUrl('/aplicacao/usuario/novaassinaturaconcluida');
        });
      });
    });
  }


  carregaJavascriptPagseguro(){
    new Promise<void>((resolve) => {
      let script: HTMLScriptElement = document.createElement('script');
      script.addEventListener('load', r => resolve());
      script.src = 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js';
      document.head.appendChild(script);      
    });
  }



  
  gerarTokenCartaoAderirPlano(){

    PagSeguroDirectPayment.getBrand({
      cardBin: (this.cartaoForm.get('numero').value as string),
      success: function(response) {
        //bandeira encontrada
        
      },
      error: function(response) {
        //tratamento do erro
      },
      complete: response => {

        PagSeguroDirectPayment.createCardToken({
          cardNumber: this.cartaoForm.get('numero').value, // Número do cartão de crédito
          brand: response.brand.name, // Bandeira do cartão
          cvv: this.cartaoForm.get('codigoSeguranca').value, // CVV do cartão
          expirationMonth: (this.cartaoForm.get('validade').value as string).split('/')[0], // Mês da expiração do cartão
          expirationYear: (this.cartaoForm.get('validade').value as string).split('/')[1], // Ano da expiração do cartão, é necessário os 4 dígitos.
          success: response => {
               // Retorna o cartão tokenizado.
               this.cartaoToken = response.card.token;
               console.log(this.cartaoToken);
               
          },
          error: function(response) {
                   // Callback para chamadas que falharam.
                  
          },
          complete: response => {
               // Callback para todas chamadas.
               this.cartaoToken = response.card.token;
               console.log('token completo: ' + response.card.token);
               this.aderirPlano();
               
          }
        });
      }
    });

    
  }

}
