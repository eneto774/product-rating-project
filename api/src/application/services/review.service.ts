import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { IReviewRepository } from 'src/domain/abstractions/review.repository';
import { CreateReviewDto, UpdateReviewDto } from 'src/domain/dtos/review.dto';

import Review from 'src/domain/entities/Review';

@Injectable()
export default class ReviewService {
  constructor(
    @Inject('IReviewRepository')
    private readonly _ReviewRepository: IReviewRepository,
    private readonly _logger: Logger,
  ) {}

  async create(review: CreateReviewDto): Promise<Review> {
    return this._ReviewRepository.create({
      ...review,
      createdAt: new Date(),
    });
  }

  async update(id: string, review: UpdateReviewDto): Promise<Review> {
    if (id != review._id?.toString()) {
      throw new HttpException('Id mismatch', HttpStatus.BAD_REQUEST);
    }

    const existingReview = await this._ReviewRepository.findById(id);
    if (!existingReview) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }

    const updatedReview = { ...existingReview, ...review };

    return await this._ReviewRepository.update(updatedReview);
  }

  async delete(id: string): Promise<void> {
    return this._ReviewRepository.delete(id);
  }

  async findById(id: string): Promise<Review | null> {
    return await this._ReviewRepository.findById(id);
  }

  async findByProductId(id: string): Promise<Review[]> {
    return await this._ReviewRepository.findByProductId(id);
  }

  async getAverageRatingByProductId(productId: string): Promise<string> {
    return await this._ReviewRepository.getAverageRatingByProductId(productId);
  }
}
