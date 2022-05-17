import { Address } from "./address";
import { Documents } from "./documents";
import { Phone } from "./phone";

export class Holder{
    name:string;
    birthDate:string;
    documents:Documents[];
    phone:Phone;
    billingAddress:Address;
}