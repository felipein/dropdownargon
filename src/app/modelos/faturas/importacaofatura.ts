
import { Base } from "../base";
import { Arquivo } from "./arquivo";

export class ImportacaoFatura extends Base{
    arquivos:Arquivo[];
    arquivosKeys:string[];
}