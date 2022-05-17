import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TransferProgressEvent } from '@azure/core-http';
import { BlobServiceClient, BlobUploadCommonResponse, BlockBlobClient, ContainerClient } from '@azure/storage-blob';
import { Observable, Subscriber } from 'rxjs';
import { Sas } from 'src/app/modelos/azure/sastoken';
import { Arquivo } from 'src/app/modelos/faturas/arquivo';
import { Fatura } from 'src/app/modelos/faturas/fatura';
import { ImportacaoFatura } from 'src/app/modelos/faturas/importacaofatura';
import { ProgressoImportacao } from 'src/app/modelos/faturas/progressoImportacao';
import { environment } from 'src/environments/environment';

import { v4 as uuidv4 } from 'uuid';
import { ImportarFaturasService } from '../calculo/tributario/importar-faturas.service';
import { NovaImportacaoFaturaService } from '../fatura/nova-importacao-fatura.service';



@Injectable({
  providedIn: 'root'
})
export class AzureBlobService {

  faturasImportacaoCompleta:Fatura[];

  constructor(private httpClient: HttpClient,
    private importarFaturasService:ImportarFaturasService,
    private router:Router) { }

  
  upLoad(container:string, file:File, fun:(response: Promise<BlobUploadCommonResponse>, blockBlobClient: BlockBlobClient)=>void){
    return this.upLoadData(file, container, fun);
  }

  upLoadImportacaoFaturaMany(files:FileList, importacaoFatura:ImportacaoFatura){
    return new Observable<ProgressoImportacao>(observer =>{
      this.novoSas().then(sas=>{

        const sastoken = (sas as Sas).sastoken;
        const account = "calculeiapp";
        const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sastoken}`);
        const containerClient:ContainerClient = blobServiceClient.getContainerClient('arquivo');
        containerClient.createIfNotExists();

        let promises:Promise<any>[] = [];
        
        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          const promise = new Promise((resolve, reject)=>{

            let arquivo:Arquivo = new Arquivo();
            arquivo.referenciaLocal = file.name;
            arquivo.partitionKey = importacaoFatura.rowKey;
            arquivo.rowKey = uuidv4();

            const referenciaBlockBlob = arquivo.partitionKey.toString() + '/' + file.name;
            const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(referenciaBlockBlob.toLowerCase());

            blockBlobClient.uploadData(file, {onProgress:this.progress(observer), maxSingleShotSize: 4 * 1024 * 1024})
            .then(result=>{
              arquivo.referenciaCloud = blockBlobClient.name;
              return resolve(arquivo);
            });
            
          });

          promises.push(promise);
          
        }

        Promise.all(promises).then(values=>{
          
          console.log('Importação Arquivo' + 'upload de arquivo finalizado com sucesso');
          console.log('arquivos values');
          console.log(values);
          importacaoFatura.arquivos = values;

          
          this.importarFaturasService.importarFaturas(importacaoFatura)
          .then(faturas=>{

            this.faturasImportacaoCompleta = faturas as Fatura[];

            let novoProgressoImportacao = new ProgressoImportacao();
            novoProgressoImportacao.progresso = 0
            novoProgressoImportacao.faturas = faturas as Fatura[];
            observer.next(novoProgressoImportacao);
          });
        });

      });

    });
    
  }

  upLoadImportacaoFatura(self:any, arquivo:Arquivo, file:File, importacaoFatura:ImportacaoFatura, fun:(response: Promise<Arquivo>, blockBlobClient: BlockBlobClient, importacaoFatura:ImportacaoFatura, self:any)=>void){
    return this.upLoadDataImportacaoFatura(self, file, arquivo, importacaoFatura, fun);
  }

  private upLoadDataImportacaoFatura(self:any, file:File, arquivo:Arquivo, importacaoFatura:ImportacaoFatura, fun:(response: Promise<Arquivo>, blockBlobClient: BlockBlobClient, importacaoFatura:ImportacaoFatura, self:any)=>void){
    return new Observable<ProgressoImportacao>(observer =>{
      this.novoSas().then(sas=>{
        const sastoken = (sas as Sas).sastoken;
        const account = "energiain";
        const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sastoken}`);
        const containerClient:ContainerClient = blobServiceClient.getContainerClient('importacaofatura');
        containerClient.createIfNotExists();
        const referenciaBlockBlob = arquivo.partitionKey.toString() + '/' + file.name;
        const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(referenciaBlockBlob.toLowerCase());

        fun(blockBlobClient.uploadData(file, {onProgress:this.progress(observer), maxSingleShotSize: 4 * 1024 * 1024})
        .then(result =>{
          console.log(blockBlobClient);
          arquivo.referenciaCloud = blockBlobClient.name;
          self.importacaoFatura.arquivos.push(arquivo);
          return arquivo;
        }), blockBlobClient, importacaoFatura, self);
      });
    });
  }

  
  private upLoadData(file:File, container:string, fun:(response: Promise<BlobUploadCommonResponse>, blockBlobClient: BlockBlobClient)=>void){
    return new Observable<ProgressoImportacao>(observer =>{
      this.novoSas().then(sas=>{
        console.log(file);
        const sastoken = (sas as Sas).sastoken;
        const account = "energiain";
        const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sastoken}`);
  
        const containerClient:ContainerClient = blobServiceClient.getContainerClient(container);
        containerClient.createIfNotExists();
        
        const referencia = new Date().getTime() + "_" + file.name;
        const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(referencia);

        fun(blockBlobClient.uploadData(file, {onProgress:this.progress(observer), maxSingleShotSize: 4 * 1024 * 1024})
        .then(result =>{
          console.log('');
          let arquivo:Arquivo = new Arquivo();

          arquivo.data = result.date || new Date();
          arquivo.referenciaCloud = referencia;
          arquivo.referenciaLocal = file.name;
          // this.arquivo= new ArquivoNotaFiscalConsumo();
          // this.arquivo.municipio = assinante.municipiosRepresentados[0];
          // this.arquivo.referenciaCloud = blockBlobClient.url;
          // this.arquivo.referenciaLocal = blockBlobClient.name;
          // console.log('arquivo upload finalizado');
          // console.log(JSON.stringify(this.arquivo));
          // this.importarArquivoNotaFiscalConsumo.importarArquivoNotaFiscalConsumo(this.arquivo)
          // .then(relatorio =>{
          //   console.log(relatorio);
          //   console.log('relatorio');
          //   this.notificacaoService.toastSucesso('Relatório de Importação', `${file.name} novo relatório disponível`);
          // });
          
          // this.notificacaoService.toastSucesso('Importação de Arquivo', `${file.name} importado com sucesso`);
          // console.log(result);
          return result;
        }), blockBlobClient);
      });
    });
  }

  private progress(observer: Subscriber<ProgressoImportacao>){
    return (progress: TransferProgressEvent) =>{
      let novoProgressoImportacao = new ProgressoImportacao();
      novoProgressoImportacao.progresso = progress.loadedBytes;
      novoProgressoImportacao.faturas = this.faturasImportacaoCompleta;
      observer.next(novoProgressoImportacao);
    }
      
  }

  
  async novoSas():Promise<Sas>{
    const headers = { 'Access-Control-Allow-Origin': '*'};
    const data = await this.httpClient.post(environment.api + 'api/sas', {}, {'headers': headers}).toPromise();
    
    return data as Sas;
  }
  
}
