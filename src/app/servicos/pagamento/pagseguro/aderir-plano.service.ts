import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdesaoPlano } from 'src/app/modelos/pagseguro/adesaoplano';
import { Plano } from 'src/app/modelos/pagseguro/plano';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AderirPlanoService {

  constructor(private httpClient: HttpClient) { }

  AderirPlano(adesaoPlano:AdesaoPlano){
    return Promise.all([this.apiCall(adesaoPlano)]).then((listaAPI)=>{
      return listaAPI[0];
    });
  }

  private async apiCall(adesaoPlano:AdesaoPlano){
    

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1'
     });
    let options = { headers: headers };
    
    const data = await this.httpClient.post('http://localhost:4200/apipag/pre-approvals?email='+ environment.pagSeguroSandbox.email +'&token='+ environment.pagSeguroSandbox.token,
    adesaoPlano,
    options).toPromise();

    // let parser = new DOMParser();
    // let xmlDoc = parser.parseFromString(data as string, "text/xml")
    return data;
  }
}
