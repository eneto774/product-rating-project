import { Module } from '@nestjs/common';
import ProductService from './product.service';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import ReviewService from './review.service';

@Module({
  imports: [RepositoriesModule],
  providers: [ProductService, ReviewService],
  exports: [ProductService, ReviewService],
})
export class ServicesModule {}
