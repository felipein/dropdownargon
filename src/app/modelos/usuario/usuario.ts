import { Base } from "../base";
import { Assinatura } from "../pagseguro/assinatura";
import { Permissoes } from "./permissoes";

export class Usuario extends Base{
    
    nome:string;
    email:string;
    telefone:string;
    sobrenome:string;
    oid:string;
    endereco:string;
    cidade:string;
    uf:string;
    documentoFiscal:string;
    permissao:Permissoes;
    assinatura:string;
    

}