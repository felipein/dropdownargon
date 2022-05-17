import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Assinatura } from 'src/app/modelos/pagseguro/assinatura';
import { Usuario } from 'src/app/modelos/usuario/usuario';
import { AutenticacaoService } from 'src/app/servicos/oauth/autenticacao.service';
import { AssinaturasService } from 'src/app/servicos/pagamento/pagseguro/assinaturas.service';
import PagSeguro from 'src/assets/pagseguro/pagseguro.min.js';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit {

  usuario:Usuario = new Usuario();
  assinante:boolean;
  assinatura:Assinatura = new Assinatura();

  formModal: BsModalRef;
  form = {
    keyboard: true,
    class: "modal-dialog-centered modal-sm"
  };

  constructor(private autenticacaoService:AutenticacaoService,
    private modalService: BsModalService,
    private assinaturasService:AssinaturasService) { }

  ngOnInit(): void {
    
    this.autenticacaoService.getUsuario()
    .subscribe(usuario=>{
      this.usuario = usuario;
      this.assinaturasService.assinatura(usuario.assinatura)
      .then(assinatura=>{
        this.assinatura = assinatura as Assinatura;
        console.log('assinatura :');
        console.log(assinatura);
        console.log('localstorage: ' + JSON.parse(localStorage.getItem('usuario')).assinatura)
        if(this.assinatura.name.length > 0)this.assinante=true;
      });
    });
    
  }

  openFormModal(modalForm: TemplateRef<any>) {
    this.formModal = this.modalService.show(modalForm, this.form);
  }

  salvarNovoCartao(){
    // var card = PagSeguro.encryptCard({
    //   publicKey: "MINHA_CHAVE_PUBLICA",
    //   holder: "Nome Sobrenome",
    //   number: "4242424242424242",
    //   expMonth: "12",
    //   expYear: "2030",
    //   securityCode: "123"
    // });
    
    // var encrypted = card.encryptedCard;

    this.formModal.hide();
  }


}
