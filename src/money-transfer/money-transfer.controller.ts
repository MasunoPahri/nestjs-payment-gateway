import { Controller, Get, Post } from '@nestjs/common';
import { MoneyTransferService } from './money-transfer.service';

@Controller('api/v1/money-transfer')
export class MoneyTransferController {
    constructor (private moneyTransferService: MoneyTransferService) {}

    @Post('create-new')
    createNew(): any {
        const response = this.moneyTransferService.createDisburse();
        return response;
    }

    @Get('list')
    fetchList(): any {
        const response = this.moneyTransferService.fetchDisburse();
        return response;
    }
}
