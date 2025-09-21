import { Types } from 'mongoose';

export default class Review {
  _id?: Types.ObjectId;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
