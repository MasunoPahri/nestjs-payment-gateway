import { IsNotEmpty } from "class-validator";

export class MoneyTransferDto {
    @IsNotEmpty()
    'account_number': string;

    @IsNotEmpty()
    'bank_code': string;

    @IsNotEmpty()
    'amount': string;

    @IsNotEmpty()
    'remark': string;

    @IsNotEmpty()
    'recipient_city': string;

    @IsNotEmpty()
    'beneficiary_email': string;    
}