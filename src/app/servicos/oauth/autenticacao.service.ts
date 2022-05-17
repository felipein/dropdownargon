import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  OAuthErrorEvent,
  OAuthEvent,
  OAuthService,
  NullValidationHandler,
} from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from 'src/app/modelos/usuario/usuario';
import { authCodeFlowConfig, DiscoveryDocumentConfig } from './auth.config';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private _usuario = new BehaviorSubject<Usuario>(new Usuario());

  setUsuario(usuario:Usuario):void{
    this._usuario.next(usuario);
    localStorage.setItem('usuario', JSON.stringify(this.usuario()));
  }

  getUsuario():Observable<Usuario>{
    return this._usuario.asObservable();
  }

  usuario(){
    return this._usuario.value;
  }

  
  constructor(readonly oauthService: OAuthService, private router: Router) {
    this.configure();
    this.oauthService.tryLoginCodeFlow();
    this.oauthService.setupAutomaticSilentRefresh();
    
    this.oauthService.events.subscribe(({ type } : OAuthEvent) => {
      switch (type) {
        case 'token_received':
          const idToken = this.oauthService.getIdToken();
          const accessToken = this.oauthService.getAccessToken();
          if (accessToken && idToken) {
            // console.log(idToken);
          }
          break;
        case 'code_error':
          console.log('usuario nao existe');
          break;
      }
    });
  }
  private configure() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.strictDiscoveryDocumentValidation = false;
    this.oauthService.loadDiscoveryDocument(DiscoveryDocumentConfig.url);
  }

  // private userHasEnteredPasswordResetFlow(): boolean {
  //   return window.location.search.indexOf('PASSWORD_RESET') > -1;
  // }

  // private userHasRequestedPasswordReset(err: OAuthErrorEvent): boolean {
  //   return (err.params['error_description'] as string).startsWith(
  //     'AADB2C90118'
  //   );
  // }

  // loginE(){
  //   const url =
  //     authCodeFlowConfig.issuer +
  //     '.well-known/openid-configuration?p=B2C_1_signup_signin';

  //   // The convenience method mentioned in the docs (loadDiscoveryDocumentAndLogin) won't work
  //   // since we need a way to modify the token endpoint
  //   this.oauthService
  //     .loadDiscoveryDocument(url)
  //     .then((_) => {
  //       if (this.userHasEnteredPasswordResetFlow()) {
  //         // We need to change to token endpoint to match the reset-password flow
  //         this.oauthService.tokenEndpoint.replace(
  //           'B2C_1_signup_signin',
  //           'b2c_1_passwordreset'
  //         );
  //       }

  //       return this.oauthService.tryLoginCodeFlow();
  //     })
  //     .then((_) => {
  //       if (!this.oauthService.hasValidAccessToken()) {
  //         this.oauthService.initCodeFlow();
  //       }
  //     })
  //     .catch((err) => {
  //       if (this.userHasRequestedPasswordReset(err)) {
  //         // In this case we need to enter a different flow on the Azure AD B2C side.
  //         // This is still a valid Code + PKCE flow, but uses a different form to support self service password reset
  //         this.oauthService.loginUrl = this.oauthService.loginUrl.replace(
  //           'B2C_1_signup_signin',
  //           'b2c_1_passwordreset'
  //         );
  //         // Add this to the state as we need it on our way back
  //         this.oauthService.initCodeFlow('PASSWORD_RESET');
  //       } else {
  //         // Another error has occurred, e.g. the user cancelled the reset-password flow.
  //         // In that case, simply retry the login.
  //         this.oauthService.initCodeFlow();
  //       }
  //     });
  // }

  refresh() {
    this.oauthService.refreshToken();
  }
  login(){
    this.oauthService.initCodeFlow();
  }

  logout() {
    // localStorage.clear();
    // localStorage.removeItem('inicializadorSnapshot');
    this.oauthService.logOut();
  }
}
