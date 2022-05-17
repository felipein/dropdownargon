import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/modelos/usuario/cliente';
import { AutenticacaoService } from 'src/app/servicos/oauth/autenticacao.service';
import { NovoClienteService } from 'src/app/servicos/usuario/novo-cliente.service';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.scss']
})
export class NovoClienteComponent implements OnInit {

  cadastroForm = this.fb.group({
    nome:['', Validators.required],
    sobrenome:[''],
    telefone:[''],
    email:[''],
    endereco:[''],
    cidade:[''],
    uf:[''],
    documentoFiscal:['']
  });

  

  constructor(private novoClienteService:NovoClienteService,
    private fb:FormBuilder,
    private autenticacaoService:AutenticacaoService) { }

  ngOnInit(): void {
  }

  salvar(){
    console.log('salvar cliente');
    let cliente = new Cliente();

    cliente.nome = this.cadastroForm.get('nome').value;
    cliente.sobrenome = this.cadastroForm.get('sobrenome').value;
    cliente.email = this.cadastroForm.get('email').value;
    cliente.telefone = this.cadastroForm.get('telefone').value;
    cliente.endereco = this.cadastroForm.get('endereco').value;
    cliente.cidade = this.cadastroForm.get('cidade').value;
    cliente.documentoFiscal = this.cadastroForm.get('documentoFiscal').value;
    cliente.uf = this.cadastroForm.get('uf').value;
    cliente.partitionKey = this.autenticacaoService.usuario().rowKey;

    console.log(cliente);

    this.novoClienteService.novoclient(cliente);
  }
}
