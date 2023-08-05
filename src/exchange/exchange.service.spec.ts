import { Test, TestingModule } from '@nestjs/testing';
import { BadGatewayException } from '@nestjs/common';
import { ExchangeInputType } from './types/exchange-input.type';
import { CurrenciesService } from '../currencies/currencies.service';
import { ExchangeService } from './exchange.service';

const mockData = {
  from: 'USD',
  to: 'BRL',
  amount: 1,
};

describe('ExchangeService', () => {
  let service: ExchangeService;
  let currenciesService: CurrenciesService;

  beforeEach(async () => {
    const currenciesServiceMock = {
      getCurrency: jest.fn().mockReturnValue({ value: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        { provide: CurrenciesService, useFactory: () => currenciesServiceMock },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    currenciesService = module.get<CurrenciesService>(CurrenciesService);
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
        service.convertAmount(mockData as ExchangeInputType),
      ).resolves.not.toThrow();
    });

    it('should be called getCurrency twice', async () => {
      await service.convertAmount(mockData as ExchangeInputType);
      await expect(currenciesService.getCurrency).toBeCalledTimes(2);
    });
    it('should be called getCurrency with correct params', async () => {
      await service.convertAmount(mockData as ExchangeInputType);
      await expect(currenciesService.getCurrency).toBeCalledWith('USD');
      await expect(currenciesService.getCurrency).toBeCalledWith('BRL');
    });
    it('should be throw when getCurrency throw', async () => {
      (currenciesService.getCurrency as jest.Mock).mockRejectedValue(
        new Error(),
      );
      await expect(
        service.convertAmount(mockData as ExchangeInputType),
      ).rejects.toThrow();
    });
    it('should be return conversion value', async () => {
      (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
        value: 1,
      });
      (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
        value: 0.205,
      });
      expect(
        await service.convertAmount(mockData as ExchangeInputType),
      ).toEqual({ amount: 4.878048780487805 });

      (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
        value: 0.205,
      });
      (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
        value: 1,
      });
      expect(
        await service.convertAmount(mockData as ExchangeInputType),
      ).toEqual({ amount: 0.205 });
    });
  });
});
