



import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { ContaContrato } from 'src/app/modelos/faturas/contacontrato';
import { Fatura } from 'src/app/modelos/faturas/fatura';
import { ImportacaoFatura } from 'src/app/modelos/faturas/importacaofatura';
import { LocalStorageEquatorial } from 'src/app/modelos/faturas/localstorageequatorial';
import { ProgressoImportacao } from 'src/app/modelos/faturas/progressoImportacao';
import { SegundaViaRequest } from 'src/app/modelos/faturas/segundaviarequest';
import { RelatorioRemocaoTUSDBaseCalculoICMS } from 'src/app/modelos/relatorios/relatorioremocaotusdbasecalculoicms';
import { Cliente } from 'src/app/modelos/usuario/cliente';
import { AzureBlobService } from 'src/app/servicos/azure/azure-blob.service';
import { CalculoTusdIcmsService } from 'src/app/servicos/calculo/tributario/calculo-tusd-icms.service';
import { ImportarFaturasPortalService } from 'src/app/servicos/calculo/tributario/importar-faturas-portal.service';
import { ImportarFaturasService } from 'src/app/servicos/calculo/tributario/importar-faturas.service';
import { AutenticacaoService } from 'src/app/servicos/oauth/autenticacao.service';
import { ListarClientesDoUsuarioService } from 'src/app/servicos/usuario/listar-clientes-do-usuario.service';

import { v4 as uuidv4 } from 'uuid';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { CalculoPisCofinsIcmsService } from 'src/app/servicos/calculo/tributario/calculo-pis-cofins-icms-energia.service';
import { RelatorioRemocaoPISCOFINS } from 'src/app/modelos/relatorios/relatorioremocaopiscofins';


@Component({
  selector: 'app-pis-cofins-icms-energia',
  templateUrl: './pis-cofins-icms-energia.component.html',
  styleUrls: ['./pis-cofins-icms-energia.component.scss']
})
export class PisCofinsIcmsEnergiaComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef<HTMLInputElement>;
  importacaoFatura:ImportacaoFatura;
  windowHandle:Window;
  paginaEquatorial = "https://ma.equatorialenergia.com.br";
  clienteEquatorialStorage:LocalStorageEquatorial = new LocalStorageEquatorial();
  relatorio:RelatorioRemocaoPISCOFINS = new RelatorioRemocaoPISCOFINS();
  
  faturas:Fatura[];

  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [];
  SelectionType = SelectionType;


  aguardeVisivel:boolean=false;
  passo1Visivel:boolean=true;
  passo2Visivel:boolean=false;
  passo3Visivel:boolean=false;
  relatorioVisivel:boolean=false;

  

  constructor(private autenticacaoService:AutenticacaoService,
    private azureBlobService:AzureBlobService,
    private importarFaturasPortalService:ImportarFaturasPortalService,
    private listarClientesDoUsuarioService:ListarClientesDoUsuarioService,
    private importarFaturasService:ImportarFaturasService,
    private calculoPisCofinsIcmsEnergia:CalculoPisCofinsIcmsService){}

  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  onActivate(event) {
    this.activeRow = event.row;
  }


  portalEquatorial(){


    function acc(popup: Window){
      let varPopUp = popup;
      return varPopUp;
    }

    var accInfo:Window;

    this.windowHandle = window.open(this.paginaEquatorial, "_blank", "width=800, height=800") as Window;
    
    this.windowHandle.addEventListener('load', (event) =>{
      
      if(this.windowHandle.localStorage != null && this.windowHandle.localStorage.length > 20){
        let parent : Window = this.windowHandle.opener;
        accInfo = acc(this.windowHandle);
        let mensagemStorage:LocalStorageEquatorial = new LocalStorageEquatorial(this.windowHandle.localStorage.getItem('conta_ativa') || '',
        this.windowHandle.localStorage.getItem('jwt') || '',
        this.windowHandle.localStorage.getItem('nome') || '');
        mensagemStorage.contasContrato = JSON.parse(this.windowHandle.localStorage.getItem('contasContrato') || '');

        for (let i = 0; i < localStorage.length; i++) {
          let chave:string = localStorage.key(i)|| '';
          let valor:string = localStorage.getItem(chave) || '';
          console.log('chave: ' + chave + ' valor:' + valor);
        }
        parent.postMessage(mensagemStorage, parent.location.href);
      }
    });

    this.windowHandle.addEventListener('submit', () => {
      let parent : Window = window.opener;
      
      addEventListener('beforeunload', () => {
        
        if(accInfo == null){
          let parent : Window = window.opener;
          let mensagemStorage:LocalStorageEquatorial = new LocalStorageEquatorial(localStorage.getItem('conta_ativa') || '',
          localStorage.getItem('jwt') || '',
          localStorage.getItem('nome') || '',
          JSON.parse(localStorage.getItem('contasContrato') || ''));

          mensagemStorage.contaAtiva = mensagemStorage.contasContrato[0].Numero;
          
          parent.postMessage(mensagemStorage, parent.location.href);

          for (let i = 0; i < localStorage.length; i++) {
            let chave:string = localStorage.key(i) || '';
            let valor:string = localStorage.getItem(chave) || '';
            console.log('chave: ' + chave + ' valor:' + valor);
          }
        }
        accInfo = acc(window);
        
      });

    });
    
    window.addEventListener('message', (event)=>{
      if(typeof event.data === typeof (new LocalStorageEquatorial())){
        let mensagemStorage: LocalStorageEquatorial = event.data;
        localStorage.setItem('mensagemStorage', JSON.stringify(mensagemStorage));
        this.clienteEquatorialStorage = new LocalStorageEquatorial(mensagemStorage.contaAtiva, mensagemStorage.token, mensagemStorage.cliente, mensagemStorage.contasContrato as ContaContrato[]);

        
        if(accInfo != null){
          let popup : Window = accInfo;
          popup.close();
        }
        
        console.log(this.clienteEquatorialStorage);
        this.aguardeVisivel=true;
        this.passo1Visivel=false;

        let request = new SegundaViaRequest();
        request.contrato = this.clienteEquatorialStorage.contasContrato[0].NumeroInstalacao;
        request.token = this.clienteEquatorialStorage.token;
        request.usuario = this.autenticacaoService.usuario();

        this.importarFaturasPortalService.importarFaturasPortal(request)
        .then(importacaoFatura=>{

          this.importarFaturasService.importarFaturas(importacaoFatura as ImportacaoFatura)
          .then(faturas=>{

            this.faturas = faturas as Fatura[];
            this.carregarFaturas(this.faturas);
            this.passo2Visivel=true;
            this.aguardeVisivel =false;

          });

        });
        
      }

    });
    
    
  }

  selecionarArquivo(event: Event): void {

    this.aguardeVisivel =true;
    this.passo1Visivel = false;
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    this.fileInput.nativeElement.value === '';

    this.importacaoFatura = new ImportacaoFatura();
    this.importacaoFatura.rowKey = uuidv4(); 
    this.importacaoFatura.partitionKey = this.autenticacaoService.usuario().rowKey;
    this.importacaoFatura.arquivos = [];

    this.azureBlobService.upLoadImportacaoFaturaMany(files, this.importacaoFatura)
    .subscribe(progresso=>{
      if((progresso as ProgressoImportacao).faturas != null){
          this.faturas = (progresso as ProgressoImportacao).faturas;
          this.carregarFaturas(this.faturas);
          this.passo2Visivel=true;
          this.aguardeVisivel =false;
      }
      let size = 0;
      for (let i = 0; i < files.length; i++) {
        const element = files[i];
        size+=element.size;
      }
      const porcentagem = parseInt(((progresso.progresso / size) * 100).toString(), 10)
    });
  }
  showFileDialog(): void {
    this.fileInput.nativeElement.click();
  }

  carregarFaturas(faturas:Fatura[]){
    this.rows = faturas;
    this.temp = this.rows.map((prop, key)=>{
      return{
        ...prop,
        id:key
      }

    }); 
  }

  gerarRelatorio(){

    


    this.aguardeVisivel=true;
    this.passo2Visivel = false;
    this.calculoPisCofinsIcmsEnergia.calculoPisCofinsIcmsEnergia(this.faturas)
    .then(result=>{

      this.relatorio = result as RelatorioRemocaoPISCOFINS;

      
      setTimeout(()=>{
        this.gerarPDF();
        this.aguardeVisivel=false;
        this.passo3Visivel=true;
        this.relatorioVisivel=true;
      },1000);


    });

  }

  gerarPDF(){

    let DATA: any = document.getElementById('quadrorelatorio');


    html2canvas(DATA, { useCORS: true, allowTaint: true, scrollY: 0 }).then((canvas) => {
      const image = { type: 'jpeg', quality: 1 };
      const margin = [0.5, 0.5];
      const filename = 'myfile.pdf';

      var imgWidth = 8.5;
      var pageHeight = 11;

      var innerPageWidth = imgWidth - margin[0] * 2;
      var innerPageHeight = pageHeight - margin[1] * 2;

      // Calculate the number of pages.
      var pxFullHeight = canvas.height;
      var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
      var nPages = Math.ceil(pxFullHeight / pxPageHeight);

      // Define pageHeight separately so it can be trimmed on the final page.
      var pageHeight = innerPageHeight;

      // Create a one-page canvas to split up the full image.
      var pageCanvas = document.createElement('canvas');
      var pageCtx = pageCanvas.getContext('2d');
      pageCanvas.width = canvas.width;
      pageCanvas.height = pxPageHeight;

      // Initialize the PDF.
      var pdf = new jsPDF('p', 'in', 'a4');

      for (var page = 0; page < nPages; page++) {
        // Trim the final page to reduce file size.
        if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
          pageCanvas.height = pxFullHeight % pxPageHeight;
          pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
        }

        // Display the page.
        var w = pageCanvas.width;
        var h = pageCanvas.height;
        pageCtx.fillStyle = 'white';
        pageCtx.fillRect(0, 0, w, h);
        pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

        // Add the page to the PDF.
        if (page > 0) pdf.addPage();
        debugger;
        var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
        pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, pageHeight);
      }

      pdf.save();

        // html2canvas(DATA).then((canvas) => {
        //   var imgData = canvas.toDataURL('image/jpeg');
        //   var imgWidth = 210; 
        //   var pageHeight = 295;  
        //   var imgHeight = canvas.height * imgWidth / canvas.width;
        //   var heightLeft = imgHeight;
        //   var doc = new jsPDF('p', 'mm');
        //   var position = 0;

        //   doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, 'SLOW');
        //   heightLeft -= pageHeight;

        //   while (heightLeft >= 0) {
        //     position = heightLeft - imgHeight;
        //     doc.addPage();
        //     doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, 'SLOW');
        //     heightLeft -= pageHeight;
        //   }
        //   doc.save(  this.clienteEquatorialStorage.cliente + '_energia.in-remocao-TUSD-base-ICMS.pdf');

      });
        

  }


  ngOnInit() {
    // this.passo3Visivel = true;
    // this.relatorioVisivel=true;
    // this.relatorio = JSON.parse(this.relatorioJson) as RelatorioRemocaoTUSDBaseCalculoICMS;
  }

  relatorioJson:string= '{"remocoes":[{"competencia":"2020-05-01T00:00:00","baseCalculoICMS":0,"aliquotaICMS":20,"valorTUSD":713.7,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":-713.7,"icmsCobrancaIndevida":142.74,"indiceCorrecaoMonetariaAcumulado":18.08,"valorCorrecaoMonetaria":25.80739200000002,"icmsCobrancaIndevidaCorrigida":168.54739200000003,"apiSidra":null},{"competencia":"2020-06-01T00:00:00","baseCalculoICMS":7.53,"aliquotaICMS":20,"valorTUSD":5.73,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":1.7999999999999998,"icmsCobrancaIndevida":1.1460000000000001,"indiceCorrecaoMonetariaAcumulado":18.46,"valorCorrecaoMonetaria":0.21155160000000017,"icmsCobrancaIndevidaCorrigida":1.3575516000000003,"apiSidra":null},{"competencia":"2020-07-01T00:00:00","baseCalculoICMS":98.88,"aliquotaICMS":20,"valorTUSD":67.31,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":31.569999999999993,"icmsCobrancaIndevida":13.462000000000002,"indiceCorrecaoMonetariaAcumulado":18.199999999999996,"valorCorrecaoMonetaria":2.4500839999999986,"icmsCobrancaIndevidaCorrigida":15.912084,"apiSidra":null},{"competencia":"2020-08-01T00:00:00","baseCalculoICMS":476.93,"aliquotaICMS":20,"valorTUSD":280.04,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":196.89,"icmsCobrancaIndevida":56.00800000000001,"indiceCorrecaoMonetariaAcumulado":17.839999999999996,"valorCorrecaoMonetaria":9.991827199999989,"icmsCobrancaIndevidaCorrigida":65.9998272,"apiSidra":null},{"competencia":"2020-09-01T00:00:00","baseCalculoICMS":1270.92,"aliquotaICMS":20,"valorTUSD":714.54,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":556.3800000000001,"icmsCobrancaIndevida":142.908,"indiceCorrecaoMonetariaAcumulado":17.599999999999998,"valorCorrecaoMonetaria":25.15180799999999,"icmsCobrancaIndevidaCorrigida":168.05980799999998,"apiSidra":null},{"competencia":"2020-10-01T00:00:00","baseCalculoICMS":1437.33,"aliquotaICMS":20,"valorTUSD":767.65,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":669.68,"icmsCobrancaIndevida":153.53,"indiceCorrecaoMonetariaAcumulado":16.959999999999997,"valorCorrecaoMonetaria":26.038688000000008,"icmsCobrancaIndevidaCorrigida":179.568688,"apiSidra":null},{"competencia":"2020-11-01T00:00:00","baseCalculoICMS":2538.73,"aliquotaICMS":20,"valorTUSD":1434.93,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":1103.8,"icmsCobrancaIndevida":286.98600000000005,"indiceCorrecaoMonetariaAcumulado":16.099999999999998,"valorCorrecaoMonetaria":46.204746,"icmsCobrancaIndevidaCorrigida":333.19074600000005,"apiSidra":null},{"competencia":"2020-12-01T00:00:00","baseCalculoICMS":7751,"aliquotaICMS":20,"valorTUSD":4294.45,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":3456.55,"icmsCobrancaIndevida":858.89,"indiceCorrecaoMonetariaAcumulado":15.209999999999999,"valorCorrecaoMonetaria":130.63716899999986,"icmsCobrancaIndevidaCorrigida":989.5271689999998,"apiSidra":null},{"competencia":"2021-01-01T00:00:00","baseCalculoICMS":26663.62,"aliquotaICMS":20,"valorTUSD":10603.36,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":16060.259999999998,"icmsCobrancaIndevida":2120.672,"indiceCorrecaoMonetariaAcumulado":13.859999999999998,"valorCorrecaoMonetaria":293.9251392000001,"icmsCobrancaIndevidaCorrigida":2414.5971392,"apiSidra":null},{"competencia":"2021-02-01T00:00:00","baseCalculoICMS":19905.04,"aliquotaICMS":20,"valorTUSD":8909.88,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":10995.160000000002,"icmsCobrancaIndevida":1781.9759999999999,"indiceCorrecaoMonetariaAcumulado":13.609999999999998,"valorCorrecaoMonetaria":242.5269335999999,"icmsCobrancaIndevidaCorrigida":2024.5029335999998,"apiSidra":null},{"competencia":"2021-03-01T00:00:00","baseCalculoICMS":19364.05,"aliquotaICMS":20,"valorTUSD":8927.52,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":10436.529999999999,"icmsCobrancaIndevida":1785.5040000000001,"indiceCorrecaoMonetariaAcumulado":12.75,"valorCorrecaoMonetaria":227.65175999999997,"icmsCobrancaIndevidaCorrigida":2013.15576,"apiSidra":null},{"competencia":"2021-04-01T00:00:00","baseCalculoICMS":16392.86,"aliquotaICMS":20,"valorTUSD":6417.43,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":9975.43,"icmsCobrancaIndevida":1283.486,"indiceCorrecaoMonetariaAcumulado":11.82,"valorCorrecaoMonetaria":151.70804520000002,"icmsCobrancaIndevidaCorrigida":1435.1940452000001,"apiSidra":null},{"competencia":"2021-05-01T00:00:00","baseCalculoICMS":19060.18,"aliquotaICMS":20,"valorTUSD":7473.86,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":11586.32,"icmsCobrancaIndevida":1494.7720000000002,"indiceCorrecaoMonetariaAcumulado":11.51,"valorCorrecaoMonetaria":172.04825720000008,"icmsCobrancaIndevidaCorrigida":1666.8202572000002,"apiSidra":null},{"competencia":"2021-06-01T00:00:00","baseCalculoICMS":19154.19,"aliquotaICMS":20,"valorTUSD":7569.54,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":11584.649999999998,"icmsCobrancaIndevida":1513.9080000000004,"indiceCorrecaoMonetariaAcumulado":10.68,"valorCorrecaoMonetaria":161.6853744,"icmsCobrancaIndevidaCorrigida":1675.5933744000004,"apiSidra":null},{"competencia":"2021-07-01T00:00:00","baseCalculoICMS":21498.39,"aliquotaICMS":20,"valorTUSD":7561.82,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":13936.57,"icmsCobrancaIndevida":1512.364,"indiceCorrecaoMonetariaAcumulado":10.15,"valorCorrecaoMonetaria":153.5049459999998,"icmsCobrancaIndevidaCorrigida":1665.8689459999998,"apiSidra":null},{"competencia":"2021-08-01T00:00:00","baseCalculoICMS":20559.93,"aliquotaICMS":20,"valorTUSD":7600,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":12959.93,"icmsCobrancaIndevida":1520,"indiceCorrecaoMonetariaAcumulado":9.19,"valorCorrecaoMonetaria":139.6880000000001,"icmsCobrancaIndevidaCorrigida":1659.688,"apiSidra":null},{"competencia":"2021-09-01T00:00:00","baseCalculoICMS":22244.13,"aliquotaICMS":20,"valorTUSD":3534.46,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":18709.670000000002,"icmsCobrancaIndevida":706.8919999999998,"indiceCorrecaoMonetariaAcumulado":8.32,"valorCorrecaoMonetaria":58.81341439999994,"icmsCobrancaIndevidaCorrigida":765.7054143999998,"apiSidra":null},{"competencia":"2021-10-01T00:00:00","baseCalculoICMS":26589.13,"aliquotaICMS":20,"valorTUSD":3868.56,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":22720.57,"icmsCobrancaIndevida":773.7120000000003,"indiceCorrecaoMonetariaAcumulado":7.16,"valorCorrecaoMonetaria":55.39777920000006,"icmsCobrancaIndevidaCorrigida":829.1097792000004,"apiSidra":null},{"competencia":"2021-11-01T00:00:00","baseCalculoICMS":22976.69,"aliquotaICMS":20,"valorTUSD":3791.46,"valorTUST":0,"baseCalculoICMSSemTUSDTUST":19185.23,"icmsCobrancaIndevida":758.2919999999999,"indiceCorrecaoMonetariaAcumulado":5.91,"valorCorrecaoMonetaria":44.815057199999956,"icmsCobrancaIndevidaCorrigida":803.1070571999999,"apiSidra":null}],"cnpj":"","cliente":"","resultado":18875.505972199997,"data":"2022-05-12T13:49:19.07059-03:00","inicioPeriodo":"2020-05-01T00:00:00","fimPeriodo":"2021-11-01T00:00:00","totalFaturas":19,"indiceCorrecaoMonetaria":"IPCA"}';
  

}

