import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { BadRequestException } from '@nestjs/common';
import { Currencies } from './currencies.entity';

describe('CurrenciesController', () => {
  let controller: CurrenciesController;
  let service: CurrenciesService;
  let mockData;

  beforeEach(async () => {
    const mockService = {
      getCurrency: jest.fn(),
      createCurrency: jest.fn(),
      deleteCurrency: jest.fn(),
      updateCurrency: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrenciesController],
      providers: [
        {
          provide: CurrenciesService,
          useFactory: () => mockService,
        },
      ],
    }).compile();

    controller = module.get<CurrenciesController>(CurrenciesController);
    service = module.get<CurrenciesService>(CurrenciesService);
    mockData = { currency: 'USD', value: 1 } as Currencies;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getCurrency()', () => {
    it('should be throw when service throw', async () => {
      (service.getCurrency as jest.Mock).mockRejectedValue(
        new BadRequestException(),
      );
      expect(controller.getCurrency('INVALID')).rejects.toThrow(
        new BadRequestException(),
      );
    });
    it('should be called service with corrects params', async () => {
      controller.getCurrency('USD');
      expect(service.getCurrency).toBeCalledWith('USD');
    });
    it('should be returns when service returns', async () => {
      (service.getCurrency as jest.Mock).mockReturnValue(mockData);
      expect(await controller.getCurrency('USD')).toEqual(mockData);
    });
  });
  describe('createCurrency()', () => {
    it('should be throw when service throw', async () => {
      (service.createCurrency as jest.Mock).mockRejectedValue(
        new BadRequestException(),
      );
      expect(controller.createCurrency(mockData)).rejects.toThrow(
        new BadRequestException(),
      );
    });
    it('should be called service with corrects params', async () => {
      controller.createCurrency(mockData);
      expect(service.createCurrency).toBeCalledWith(mockData);
    });

    it('should be returns when service returns', async () => {
      (service.createCurrency as jest.Mock).mockReturnValue(mockData);
      expect(await controller.createCurrency(mockData)).toEqual(mockData);
    });
    describe('deleteCurrency()', () => {
      it('should be throw when service throw', async () => {
        (service.deleteCurrency as jest.Mock).mockRejectedValue(
          new BadRequestException(),
        );
        await expect(controller.deleteCurrency('INVALID')).rejects.toThrow(
          new BadRequestException(),
        );
      });
      it('should be called service with corrects params', async () => {
        await controller.deleteCurrency('USD');
        expect(service.deleteCurrency).toBeCalledWith('USD');
      });
    });
    describe('deleteCurrency()', () => {
      it('should be throw when service throw', async () => {
        (service.updateCurrency as jest.Mock).mockRejectedValue(
          new BadRequestException(),
        );
        await expect(
          controller.updateCurrency(mockData.currency, mockData.value),
        ).rejects.toThrow(new BadRequestException());
      });
      it('should be called service with corrects params', async () => {
        await controller.updateCurrency(mockData.currency, mockData.value);
        expect(service.updateCurrency).toBeCalledWith(mockData);
      });
      it('should be returns when service returns', async () => {
        (service.updateCurrency as jest.Mock).mockReturnValue(mockData);
        expect(
          await controller.updateCurrency(mockData.currency, mockData.value),
        ).toEqual(mockData);
      });
    });
  });
});
