import { Types } from 'mongoose';

export default class Product {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt?: Date;
  __v?: number;
}
