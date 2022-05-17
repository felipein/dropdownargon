import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Fatura } from 'src/app/modelos/faturas/fatura';
import { ImportacaoFatura } from 'src/app/modelos/faturas/importacaofatura';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalculoPisCofinsIcmsService {

  private readonly mensagemImportacaoSource = new BehaviorSubject<string>('');
  readonly mensagemImportacao = this.mensagemImportacaoSource.asObservable();

  getMensagemImportacao():string{return this.mensagemImportacaoSource.getValue();}
  setMensagemImportacao(mensagem:string){this.mensagemImportacaoSource.next(mensagem);}

  constructor(private httpClient: HttpClient) { }

  calculoPisCofinsIcmsEnergia(faturas:Fatura[]){
    return Promise.all([this.apiCall(faturas)]).then((listaAPI)=>{
      return listaAPI[0];
    });
  }

  private async apiCall(faturas:Fatura[]){
    const headers = { 'Access-Control-Allow-Origin': '*'};
    const data = await this.httpClient.post(environment.api as string + 'api/CalculoPISCOFINSICMSEnergia',faturas, {'headers':headers}).toPromise();
    return data;
  }
}
