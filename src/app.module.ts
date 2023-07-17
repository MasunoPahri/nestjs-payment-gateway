import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserBalanceController } from './user-balance/user-balance.controller';
import { UserBalanceService } from './user-balance/user-balance.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, UserBalanceController],
  providers: [AppService, UserBalanceService],
})
export class AppModule {}
