import { BadGatewayException, Injectable } from '@nestjs/common';

export class CurrenciesService {
  async getCurrency(currency: string): Promise<any> {}
}

@Injectable()
export class ExchangeService {
  constructor(private currencyService: CurrenciesService) {}

  async convertAmount({ from, to, amount }): Promise<any> {
    if (!from || !to || !amount) {
      throw new BadGatewayException();
    }

    const currencyFrom = this.currencyService.getCurrency(from);
    const currencyTo = this.currencyService.getCurrency(to);
  }
}
