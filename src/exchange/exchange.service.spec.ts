import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from './exchange.service';
import { BadGatewayException } from '@nestjs/common';

describe('ExchangeService', () => {
  let service: ExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeService],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convertAmount()', () => {
    it('should be throw if called with invalid params', async () => {
      await expect(
        service.convertAmount({ from: '', to: '', amount: 0 }),
      ).rejects.toThrow(new BadGatewayException());
    });
    it('should be not throw if called with valid params', async () => {
      await expect(
        service.convertAmount({ from: 'USD', to: 'BRL', amount: 1 }),
      ).resolves.not.toThrow();
    });
  });
});
