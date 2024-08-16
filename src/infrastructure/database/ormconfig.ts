import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

import dotenvConfig from '../environments/index';

const configService = new ConfigService(dotenvConfig());

export const ormConfig: DataSourceOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: configService.get('database.connection') as any,
  host: configService.get('database.host'),
  port: configService.get('database.port'),
  username: configService.get('database.username'),
  password: configService.get('database.password') as string,
  database: configService.get('database.name') as string,
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],

  synchronize: false,
  logging: true,
  logger: 'file',

  migrationsRun: configService.get('node_env') === 'test',
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],

  subscribers: [__dirname + '/subscribers/*.subscriber.{.ts,.js}'],
};

export const dataSource = new DataSource(ormConfig);
