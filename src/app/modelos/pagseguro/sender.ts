import { Address } from "./address";
import { Documents } from "./documents";
import { PaymentMethod } from "./paymentmethod";
import { Phone } from "./phone";

export class Sender{
    name:string;
    email:string;
    ip:string;
    hash:string;
    phone:Phone;
    address:Address;
    documents:Documents[];
}