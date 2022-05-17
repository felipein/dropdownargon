import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/modelos/usuario/cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NovoClienteService {

  constructor(private httpClient:HttpClient) { }

  novoclient(cliente:Cliente){

    return Promise.all([this.apicall(cliente)]).then((listaAPI)=>{return listaAPI[0]});

  }

  private async apicall(cliente:Cliente){
    const headers = { 'Access-Control-Allow-Origin': '*'};
    const data = await this.httpClient.post(environment.api as string + 'api/NovoCliente',cliente, {'headers':headers}).toPromise();
    return data;
  }
}
