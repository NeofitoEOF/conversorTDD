import { Module } from '@nestjs/common';
import { ExchangeModule } from './exchange/exchange.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ExchangeModule,
    CurrenciesModule,
  ],
})
export class AppModule {}
