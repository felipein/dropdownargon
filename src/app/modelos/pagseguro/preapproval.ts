import { Expiration } from "./expiration";

export class PreApproval{
    name:string;
    charge:string;
    period:string;
    amountPerPayment:string;
    membershipFee:string;
    trialPeriodDuration:number;
    expiration:Expiration;
    details:string;
    maxAmountPerPeriod:number;
    initialDate:Date;
    finalDate:Date;
    dayOfYear:string;
    dayOfMonth:string;
    dayOfWeek:string;
    cancelUrl:string;
    
}