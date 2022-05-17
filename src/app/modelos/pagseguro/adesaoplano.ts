import { PaymentMethod } from "./paymentmethod";
import { Sender } from "./sender";

export class AdesaoPlano{
    plan:string;
    reference:string;
    sender:Sender;
    paymentMethod:PaymentMethod;
}