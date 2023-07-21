import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserBalanceController } from './user-balance/user-balance.controller';
import { UserBalanceService } from './user-balance/user-balance.service';
import { MoneyTransferController } from './money-transfer/money-transfer.controller';
import { MoneyTransferService } from './money-transfer/money-transfer.service';
import { commonFunctions } from './common/function';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, UserBalanceController, MoneyTransferController],
  providers: [AppService, UserBalanceService, MoneyTransferService, commonFunctions],
})
export class AppModule {}
