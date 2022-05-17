import { ContaContrato } from "./contacontrato";


export class LocalStorageEquatorial{
    contaAtiva:string;
    token:string;
    cliente:string;
    contasContrato:ContaContrato[];

    constructor(_contaAtiva="", _token="",_cliente="", _contasContrato=[] as ContaContrato[]){
        this.contaAtiva =_contaAtiva;
        this.token =_token;
        this.cliente =_cliente;
        this.contasContrato=_contasContrato as ContaContrato[];
    }
    
}