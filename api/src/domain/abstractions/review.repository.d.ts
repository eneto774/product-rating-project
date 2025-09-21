import Review from '../entities/Review';

export interface IReviewRepository {
  create(review: Review): Promise<Review>;
  update(review: Review): Promise<Review>;
  delete(id: string): Promise<void>;
  findByProductId(productId: string): Promise<Review[]>;
  findById(id: string): Promise<Review | null>;
  getAverageRatingByProductId(productId: string): Promise<string>;
}
