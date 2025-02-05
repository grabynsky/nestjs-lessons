import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import configuration from './configs/configuration';
import { LoggerModule } from './modules/logger/logger.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RedisModule } from './modules/redis/redis.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),

    LoggerModule,
    PostgresModule,
    RedisModule,

    UsersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
