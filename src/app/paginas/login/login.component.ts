import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthEvent } from 'angular-oauth2-oidc';
import { Usuario } from 'src/app/modelos/usuario/usuario';
import { AutenticacaoService } from 'src/app/servicos/oauth/autenticacao.service';
import { InicializarUsuarioService } from 'src/app/servicos/usuario/inicializar-usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private autenticacaoService:AutenticacaoService,
    private router:Router,
    private inicializarUsuarioService:InicializarUsuarioService) { 

    this.autenticacaoService.oauthService.events.subscribe(({ type } : OAuthEvent) => {
      switch (type) {
        case 'token_received':
          const idToken = this.autenticacaoService.oauthService.getIdToken();
          const accessToken = this.autenticacaoService.oauthService.getAccessToken();
          if (accessToken && idToken) {
            let claims = this.autenticacaoService.oauthService.getIdentityClaims();
            let usuarioRequest = new Usuario();
            usuarioRequest.email = claims['emails'][0];
            this.inicializarUsuarioService.inicializarUsuario(usuarioRequest)
            .then((usuario)=>{
              this.autenticacaoService.setUsuario(usuario as Usuario);
              console.log(usuario);
              this.router.navigateByUrl('aplicacao');
            });
            
          }
      }
    });
  }

  ngOnInit(): void {
  }

}
