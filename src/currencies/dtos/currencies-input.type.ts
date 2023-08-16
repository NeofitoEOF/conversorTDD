import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CurrenciesDtos {
  @IsNotEmpty()
  @Length(3, 3)
  currency: string;
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
