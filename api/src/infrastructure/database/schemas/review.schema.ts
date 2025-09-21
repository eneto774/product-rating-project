import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<ReviewEntitySchema>;

@Schema({ collection: 'reviews' })
export class ReviewEntitySchema {
  @Prop({ required: true, index: true, ref: 'ProductEntitySchema' })
  productId: string;

  @Prop()
  author: string;

  @Prop()
  rating: number;

  @Prop()
  comment: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewEntitySchema);
