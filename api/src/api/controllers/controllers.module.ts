import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ServicesModule } from 'src/application/services/services.module';
import { ReviewController } from './review.controller';

@Module({
  imports: [ServicesModule],
  controllers: [ProductController, ReviewController],
})
export class ControllersModule {}
