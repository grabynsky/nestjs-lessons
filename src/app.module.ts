import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './configs/configuration';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UsersModule,
  ],
  providers: [],
})
export class AppModule {}
