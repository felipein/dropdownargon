import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssinaturasService {

  constructor(private httpClient: HttpClient) { }

  assinatura(assinatura){
    return Promise.all([this.apiCall(assinatura)]).then((listaAPI)=>{
      return listaAPI[0];
    });
  }

  private async apiCall(assinatura){
    
    const headers = { 
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/vnd.pagseguro.com.br.v3+json;charset=ISO-8859-1',
      'Content-Type': 'application/json'
    };
    // const data = await this.httpClient.get(environment.pagSeguroSandbox.url as string + 'pre-approvals/'+ assinatura +'?email='+ environment.pagSeguroSandbox.email +'&token='+ environment.pagSeguroSandbox.token,
    // {'headers':headers, 'responseType':'json'}).toPromise();

    const data = await this.httpClient.get('http://localhost:4200/apipag/pre-approvals/'+ assinatura +'?email='+ environment.pagSeguroSandbox.email +'&token='+ environment.pagSeguroSandbox.token,
    {'headers':headers, 'responseType':'json'}).toPromise();
    // let parser = new DOMParser();
    // let xmlDoc = parser.parseFromString(data as string, "text/xml")
    // let id = xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue;
    console.log(data);
    return data;
  }
}
