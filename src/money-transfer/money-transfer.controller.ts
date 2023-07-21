import { Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
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
    fetchList(@Query() queryParam): any {
        const response = this.moneyTransferService.fetchDisburse(queryParam);
        return response;
    }

    @Get('')
    fetch(@Query() queryParam): any {
        const res = this.moneyTransferService.fetch(queryParam);
        return res;
    }
}
