import { PreApproval } from "./preapproval";
import { Receiver } from "./receiver";

export class Plano{
    redirectURL:string;
    reference:string;
    preApproval:PreApproval;
    reviewUrl:string;
    maxUses:number;
    receiver:Receiver;
}