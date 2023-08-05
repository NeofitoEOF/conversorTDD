import { BadGatewayException, Injectable } from '@nestjs/common';
import { ExchangeInputType } from './types/exchange-input.type';

export class CurrenciesService {
  async getCurrency(currency: string): Promise<any> {}
}

@Injectable()
export class ExchangeService {
  constructor(private currienciesService: CurrenciesService) {}

  async convertAmount({ from, to, amount }: ExchangeInputType): Promise<any> {
    if (!from || !to || !amount) {
      throw new BadGatewayException();
    }
    try {
      const currencyFrom = await this.currienciesService.getCurrency(from);
      const currencyTo = await this.currienciesService.getCurrency(to);
      return { amount: (currencyFrom.value / currencyTo.value) * amount };
    } catch (error) {
      throw new Error(error);
    }
  }
}
