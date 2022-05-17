import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plano } from 'src/app/modelos/pagseguro/plano';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CriarPlanoService {

  constructor(private httpClient: HttpClient) { }

  criarPlano(plano:Plano){
    return Promise.all([this.apiCall(plano)]).then((listaAPI)=>{
      return listaAPI[0];
    });
  }

  private async apiCall(plano:Plano){
    const headers = { 
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/vnd.pagseguro.com.br.v3+xml;charset=ISO-8859-1'
    };
    
    const data = await this.httpClient.post('http://localhost:4200/apipag/pre-approvals/request/?email='+ environment.pagSeguroSandbox.email +'&token='+ environment.pagSeguroSandbox.token,
    plano,
    {'headers': headers}).toPromise();

    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(data as string, "text/xml")
    let id = xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue;
    return id;
  }
}
