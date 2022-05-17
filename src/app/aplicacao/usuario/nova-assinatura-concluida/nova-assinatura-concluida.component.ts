import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario/usuario';
import { AutenticacaoService } from 'src/app/servicos/oauth/autenticacao.service';
import { InicializarUsuarioService } from 'src/app/servicos/usuario/inicializar-usuario.service';

@Component({
  selector: 'app-nova-assinatura-concluida',
  templateUrl: './nova-assinatura-concluida.component.html',
  styleUrls: ['./nova-assinatura-concluida.component.scss']
})
export class NovaAssinaturaConcluidaComponent implements OnInit {

  constructor(private incializarUsuarioService:InicializarUsuarioService,
    private autenticacaoService:AutenticacaoService) { }

  ngOnInit(): void {
    
  }

}
