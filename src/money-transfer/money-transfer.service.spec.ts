import { Test, TestingModule } from '@nestjs/testing';
import { MoneyTransferService } from './money-transfer.service';

describe('MoneyTransferService', () => {
  let service: MoneyTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneyTransferService],
    }).compile();

    service = module.get<MoneyTransferService>(MoneyTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
