import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Currencies } from 'src/currencies/currencies.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://1.0.0.3/conversorTDD',
  entities: [Currencies],
  synchronize: true,
  autoLoadEntities: true,
  useUnifiedTopology: true,
};
