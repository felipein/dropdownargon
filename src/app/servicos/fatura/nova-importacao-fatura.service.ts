import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ImportacaoFatura } from 'src/app/modelos/faturas/importacaofatura';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NovaImportacaoFaturaService {

  private readonly mensagemImportacaoSource = new BehaviorSubject<string>('');
  readonly mensagemImportacao = this.mensagemImportacaoSource.asObservable();

  getMensagemImportacao():string{return this.mensagemImportacaoSource.getValue();}
  setMensagemImportacao(mensagem:string){this.mensagemImportacaoSource.next(mensagem);}

  constructor(private httpClient: HttpClient) { }

  novaImportacaoFatura(importacaoFatura:ImportacaoFatura){
    return Promise.all([this.apiCall(importacaoFatura)]).then((listaAPI)=>{
      return listaAPI[0];
    });
  }

  private async apiCall(importacaoFatura:ImportacaoFatura){
    const headers = { 'Access-Control-Allow-Origin': '*'};
    const data = await this.httpClient.post(environment.api as string + 'api/NovaImportacaoFatura',importacaoFatura, {'headers':headers}).toPromise();
    return data;
  }
}
