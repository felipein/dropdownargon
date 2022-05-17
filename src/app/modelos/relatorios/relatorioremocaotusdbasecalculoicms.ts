import { RemocaoTUSDBaseCalculoICMS } from "./remocaotusdbasecalculoicms";

export class RelatorioRemocaoTUSDBaseCalculoICMS{
    cnpj:string;
    cliente:string;
    resultado:number;
    data:Date;
    inicioPeriodo:Date;
    fimPeriodo:Date;
    totalFaturas:number;
    indiceCorrecaoMonetaria:string;
    remocoes:RemocaoTUSDBaseCalculoICMS[];
    
}