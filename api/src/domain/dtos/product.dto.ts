import { IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  price: number;

  @IsNotEmpty()
  category: string;
}

export class UpdateProductDto {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
}
