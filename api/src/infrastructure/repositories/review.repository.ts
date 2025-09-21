import { InjectModel } from '@nestjs/mongoose';
import Review from 'src/domain/entities/Review';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { IReviewRepository } from 'src/domain/abstractions/review.repository';
import { ReviewEntitySchema } from '../database/schemas/review.schema';

@Injectable()
export default class ReviewRepository implements IReviewRepository {
  constructor(
    @InjectModel(ReviewEntitySchema.name)
    private readonly _reviewModel: Model<ReviewEntitySchema>,
    private readonly _logger: Logger,
  ) {}

  async create(Review: Review): Promise<Review> {
    try {
      this._logger.log('[ReviewRepository:create] - Creating Review');

      const createdReview = new this._reviewModel(Review);

      const result = (await createdReview.save()) as unknown as Review;

      // this._logger.log(
      //   `[ReviewRepository:create] - Review ${result.name} with id: ${result?._id} created successfully.`,
      // );
      return result;
    } catch (error) {
      this._logger.error(
        error,
        '[ReviewRepository:create] - Failed to create Review',
      );
      throw new Error(error?.message);
    }
  }

  async update(review: Review): Promise<Review> {
    try {
      this._logger.log('[ReviewRepository:update] - Updating Review');

      const updatedData = {
        rating: review.rating,
        comment: review.comment,
      };

      const updatedReview = (await this._reviewModel
        .findByIdAndUpdate(review._id, updatedData, { new: true })
        .exec()) as unknown as Review;
      this._logger.log(
        `[ReviewRepository:update] - Review ${review.author} with id: ${review?.productId} updated successfully.`,
      );

      return updatedReview;
    } catch (error) {
      this._logger.error(
        error,
        '[ReviewRepository:update] - Failed to update Review',
      );
      throw new Error(error?.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      this._logger.log('[ReviewRepository:delete] - Deleting Review');

      await this._reviewModel.findByIdAndDelete(id).exec();

      this._logger.log('[ReviewRepository:delete] - Review deleted');
    } catch (error) {
      this._logger.error(
        error,
        '[ReviewRepository:create] - Failed to create Review',
      );
      throw new Error(error.message || 'Failed to delete Review');
    }
  }

  findAll(): Promise<Review[]> {
    try {
      this._logger.log('[ReviewRepository:findAll] - Retrieving all Reviews');

      const Reviews = this._reviewModel.find().exec();

      this._logger.log('[ReviewRepository:findAll] - Reviews retrieved');
      return Reviews;
    } catch (error) {
      this._logger.error(
        error,
        '[ReviewRepository:findAll] - Failed to retrieve Reviews',
      );
      throw new Error(error.message || 'Failed to create Review');
    }
  }

  findByProductId(id: string): Promise<Review[]> {
    this._logger.log(
      '[ReviewRepository:findAll] - Retrieving Review with id: ' + id,
    );

    const Review = this._reviewModel.find({ productId: id }).exec();

    this._logger.log('[ReviewRepository:findAll] - Review retrieved');
    return Review;
  }

  findById(id: string): Promise<Review | null> {
    this._logger.log(
      '[ReviewRepository:findAll] - Retrieving Review with id: ' + id,
    );

    const review = this._reviewModel.findById(id).exec();

    this._logger.log('[ReviewRepository:findAll] - Review retrieved');
    return review;
  }

  async getAverageRatingByProductId(productId: string): Promise<string> {
    try {
      this._logger.log(
        '[ReviewRepository:getAverageRatingByProductId] - Retrieving average rating for product with id: ' +
          productId,
      );

      const averageRating = (await this._reviewModel.aggregate([
        { $match: { productId: productId } },
        { $group: { _id: null, averageRating: { $avg: '$rating' } } },
      ])) as [{ _id: null; averageRating: number }];

      this._logger.log(
        '[ReviewRepository:getAverageRatingByProductId] - Average rating retrieved',
      );
      return averageRating.length > 0
        ? averageRating[0]?.averageRating.toFixed(2) || '0'
        : '0';
    } catch (error) {
      this._logger.error(
        error,
        '[ReviewRepository:getAverageRatingByProductId] - Failed to retrieve average rating',
      );
      throw new Error(error.message || 'Failed to retrieve average rating');
    }
  }
}
