import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { Currencies } from './currencies.entity';
import { CurrenciesDtos } from './dtos/currencies-input.type';

@Controller('currencies')
export class CurrenciesController {
  constructor(private currenciesService: CurrenciesService) {}
  @Get('/:currency')
  async getCurrency(@Param('currency') currency: string): Promise<Currencies> {
    return await this.currenciesService.getCurrency(currency);
  }
  @Post()
  @UsePipes(ValidationPipe)
  async createCurrency(
    @Body() currenciesDtos: CurrenciesDtos,
  ): Promise<Currencies> {
    return await this.currenciesService.createCurrency(currenciesDtos);
  }

  @Delete('/:currency')
  async deleteCurrency(@Param('currency') currency: string): Promise<void> {
    return await this.currenciesService.deleteCurrency(currency);
  }

  @Patch('/:currency/value')
  async updateCurrency(
    @Param('currency') currency: string,
    @Body('value') value: number,
  ) {
    return await this.currenciesService.updateCurrency({ currency, value });
  }
}
