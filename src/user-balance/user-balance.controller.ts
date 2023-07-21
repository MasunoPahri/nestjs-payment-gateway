import { Controller, Get } from '@nestjs/common';
import { UserBalanceService } from './user-balance.service';

@Controller('api/v1/user-balance')
export class UserBalanceController {
    constructor(private userBalanceService: UserBalanceService) {}

    @Get('get-balance')
    getBalance(): any {
      const response = this.userBalanceService.getBalance();
      return response;
    }
}
