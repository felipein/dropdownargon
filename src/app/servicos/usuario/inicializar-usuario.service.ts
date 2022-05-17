import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/modelos/usuario/cliente';
import { Usuario } from 'src/app/modelos/usuario/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InicializarUsuarioService {

  constructor(private httpClient:HttpClient) { }

  inicializarUsuario(usuario:Usuario){

    return Promise.all([this.apicall(usuario)]).then((listaAPI)=>{return listaAPI[0]});

  }

  private async apicall(usuario:Usuario){
    const headers = { 'Access-Control-Allow-Origin': '*'};
    const data = await this.httpClient.post(environment.api as string + 'api/InicializarUsuario',usuario, {'headers':headers}).toPromise();
    return data;
  }
}
