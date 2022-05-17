import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService implements CanActivate {

  constructor(private autenticacaoService: AutenticacaoService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.autenticacaoService.oauthService.hasValidAccessToken()) {
      return true;
    }
    //this.router.navigate(['/']);
    this.autenticacaoService.login();
    return false;
  }
}