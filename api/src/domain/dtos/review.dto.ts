import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReviewDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  comment: string;
}

export class UpdateReviewDto {
  _id: Types.ObjectId;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  comment: string;
}
