import { Module } from '@nestjs/common';
import ProductRepository from './product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductEntitySchema,
  ProductSchema,
} from '../database/schemas/product.schema';
import {
  ReviewEntitySchema,
  ReviewSchema,
} from '../database/schemas/review.schema';
import ReviewRepository from './review.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductEntitySchema.name, schema: ProductSchema },
    ]),
    MongooseModule.forFeature([
      { name: ReviewEntitySchema.name, schema: ReviewSchema },
    ]),
  ],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: 'IReviewRepository',
      useClass: ReviewRepository,
    },
  ],
  exports: ['IProductRepository', 'IReviewRepository'],
})
export class RepositoriesModule {}
