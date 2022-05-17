import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostRequestURL } from 'src/app/modelos/pagseguro/postrequesturl';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GerarSessaoService {

  constructor(private httpClient: HttpClient) { }

  gerarSessao(){
    return Promise.all([this.apiCall()]).then((listaAPI)=>{
      return listaAPI[0];
    });
  }

  private async apiCall(){
    
    const headers = { 'Access-Control-Allow-Origin': '*'};
    let postRequestURL = new PostRequestURL();
    postRequestURL.url = environment.pagSeguroSandbox.url as string + 'v2/sessions?email='+ environment.pagSeguroSandbox.email +'&token='+ environment.pagSeguroSandbox.token;
    const data = await this.httpClient.post(environment.api + 'api/GerarSessao',
    postRequestURL,
    {'headers':headers}).toPromise();
    return data;
  }
}
