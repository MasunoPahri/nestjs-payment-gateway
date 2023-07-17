import { Test, TestingModule } from '@nestjs/testing';
import { MoneyTransferController } from './money-transfer.controller';

describe('MoneyTransferController', () => {
  let controller: MoneyTransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneyTransferController],
    }).compile();

    controller = module.get<MoneyTransferController>(MoneyTransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
