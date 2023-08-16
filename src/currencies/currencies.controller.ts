import {
  Body,
  Controller,
  Get,
  Param,
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
}
