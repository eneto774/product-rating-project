import { ApiModule } from './api/api.module';
import { Module } from '@nestjs/common';
import { LoggerModule } from './utils/modules/logger.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    ApiModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
