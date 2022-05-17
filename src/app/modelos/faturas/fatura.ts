import { Base } from "../base";


export class Fatura extends Base{
    dataEmissao:Date;
    contaReferenteMes:Date;
    totalPagar:number;
    numeroInstalacao:string;
}