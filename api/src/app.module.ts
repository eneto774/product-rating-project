import { ApiModule } from './api/api.module';
import { Module } from '@nestjs/common';
import { LoggerModule } from './utils/modules/logger.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [ApiModule, LoggerModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
