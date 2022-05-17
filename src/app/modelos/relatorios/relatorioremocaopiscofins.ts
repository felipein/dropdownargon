import { RemocaoPISCOFINS } from "./remocaopiscofins";

export class RelatorioRemocaoPISCOFINS{
    cnpj:string;
    cliente:string;
    resultado:number;
    data:Date;
    inicioPeriodo:Date;
    fimPeriodo:Date;
    totalFaturas:number;
    indiceCorrecaoMonetaria:string;
    remocoes:RemocaoPISCOFINS[];
    
}