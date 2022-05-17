import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/modelos/usuario/cliente';
import { Usuario } from 'src/app/modelos/usuario/usuario';
import { environment } from 'src/environments/environment';
import { AutenticacaoService } from '../oauth/autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class ListarClientesDoUsuarioService {

  constructor(private httpClient:HttpClient,
    private autenticacaoService:AutenticacaoService) { }

  listarClientes(){

    return Promise.all([this.apicall(this.autenticacaoService.usuario())]).then((listaAPI)=>{return listaAPI[0]});

  }

  private async apicall(usuario:Usuario){
    const headers = { 'Access-Control-Allow-Origin': '*'};
    const data = await this.httpClient.post(environment.api as string + 'api/ListarClientesDoUsuario',usuario, {'headers':headers}).toPromise();
    return data;
  }
}
