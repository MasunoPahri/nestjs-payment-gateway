import { Controller, Post } from '@nestjs/common';
import { MoneyTransferService } from './money-transfer.service';

@Controller('api/v1/money-transfer')
export class MoneyTransferController {
    constructor (private moneyTransferService: MoneyTransferService) {}

    @Post('create-new')
    createNew(): any {
        const response = this.moneyTransferService.transfer();

        return response;
    }
}
